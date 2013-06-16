<?php

class enigma
{
	private $rotor = array();
	private $rotor_inv = array();
	private $rotor_letter = array();
	private $switches = array();
	private $crypt_table = array();
	
	private $input = array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
	private $rotor_conf = array(
		array("E","K","M","F","L","G","D","Q","V","Z","N","T","O","W","Y","H","X","U","S","P","A","I","B","R","C","J"),
		array("A","J","D","K","S","I","R","U","X","B","L","H","W","T","M","C","Q","G","Z","N","P","Y","F","V","O","E"),
		array("B","D","F","H","J","L","C","P","R","T","X","V","Z","N","Y","E","I","W","G","A","K","M","U","S","Q","O"),
		array("E","S","O","V","P","Z","J","A","Y","Q","U","I","R","H","X","L","N","F","T","G","K","D","C","M","W","B"),
		array("V","Z","B","R","G","I","T","Y","U","P","S","D","N","H","L","X","A","W","M","J","Q","O","F","E","C","K")	
	);
	private $rotor_conf_inv = array(
		array("U","W","Y","G","A","D","F","P","V","Z","B","E","C","K","M","T","H","X","S","L","R","I","N","Q","O","J"),
		array("A","J","P","C","Z","W","R","L","F","B","D","K","O","T","Y","U","Q","G","E","N","H","X","M","I","V","S"),
		array("T","A","G","B","P","C","S","D","Q","E","U","F","V","N","Z","H","Y","I","X","J","W","L","R","K","O","M"),
		array("H","Z","W","V","A","R","T","N","L","G","U","P","X","Q","C","E","J","M","B","S","K","D","Y","O","I","F"),
		array("Q","C","Y","L","X","W","E","N","F","T","Z","O","S","M","V","J","U","D","K","G","I","A","R","P","H","B")
	);
	
	private $reflector = array("Y","R","U","H","Q","S","L","D","P","X","N","G","O","K","M","I","E","B","F","Z","C","W","V","J","A","T" );

		public function enigma()
		{
			for ($i = 0; $i < 3; $i++)
			{
				$this->rotor[$i] = $this->rotor_conf[$i];
				$this->rotor_inv[$i] = $this->rotor_conf_inv[$i];
				$this->rotor_letter[$i] = 0;
			}

			for ($i = 0; $i < 26; $i++)
			{
				$this->switches[$i] = $i;
			}
		}
		
		public function set_rotor($place, $rotor)
		{
			$index = $rotor - 1;
			$this->rotor[$place] = $this->rotor_conf[$index];
			$this->rotor_inv[$place] = $this->rotor_conf_inv[$index];
		}

		public function set_rotor_letter($rotor, $letter)
		{
			$this->rotor_letter[$rotor] = $letter;
		}

		public function set_plug($key_source, $key_dest)
		{
			$this->switches[$key_source] = $key_dest;
		}

		public function get_encrypted_key($key)
		{
			$index = ord($key) - 65; 
			return $this->crypt_table[$index];
		}

		public function encrypt($key)
		{
			//$index = $this->switches[$key];
			$index = ord($key) - 65;
			$step_char;
			$step = 0;
			
			for ($i = 0; $i < 3; $i++)
			{
				$index = ($index + $this->rotor_letter[$i]) % 26;
				$step_char = $this->rotor[$i][$index];
				$index = ord($step_char) - 65;
			}
			
			$step_char = $this->reflector[$index];
			$index = ord($step_char) - 65;
			
			for ($i = 2; $i >= 0; $i--)
			{
				$step = $this->rotor_letter[$i];
				$step_char = $this->rotor_inv[$i][$index];
				$index = ((ord($step_char) - 65) - $step);
				$index = ($index < 0) ? (26 + $index) : $index;
			}
			$step_char = $this->input[$index];
						
			return $step_char;
		}

		public function precalculate_keys()
		{
			for ($i = 0; $i < 26; $i++)
			{
				$key = $this->input[$i];
				$this->crypt_table[$i] = $this->encrypt($key);
			}
		}
}

$machine = new enigma();

function setup_machine()
{
	$database_name = "enigma";
	$conn = mysql_connect("localhost","root","") or die(mysql_error());
	mysql_select_db($database_name) or die(mysql_error());
	$day = date('d');
	$data = mysql_query("SELECT * FROM configuration WHERE ID='$day'");
	$info = mysql_fetch_array($data);
	mysql_close($conn);
	
	global $machine;		
	
	for ($i = 0; $i < 3; $i++)
	{
		$machine->set_rotor($i, intval($info['walzenlage_' . ($i+1)]));	
		$machine->set_rotor_letter($i, intval($info['ringstellung_' . ($i+1)]));	
	}
		
	/*
	for ($i = 0; $i < 10; $i++)
	{
		$machine->set_plug($key_source, $key_dest);
	}*/
	
	$machine->precalculate_keys();	
}

function decrypt_text($text)
{
	global $machine;
	$buffer = "";

	for ($i = 0; $i < strlen($text); $i++)
	{
		if ($text[$i] == " ")
		{
			$buffer = $buffer . " ";
		} 
		else 
		{
			$buffer = $buffer . $machine->get_encrypted_key($text[$i]);	
		}
	}
	
	return $buffer;
}

?>