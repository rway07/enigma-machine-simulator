<?php
	/*
	 * 		phase.php
	 * 		Gestisce il recupero dei dati riguardanti la configurazione della macchina enigma
	 */
	$p=$_GET["p"];
	$phase = intval($p);
	
	if (($phase < 1) || ($phase > 3)){
		die("Errore!!");
	}
		
	$database_name = "enigma";
	$conn = mysql_connect("localhost", "root","") or die(mysql_error());
	mysql_select_db($database_name) or die(mysql_error());
	
	$day = date('d');
	
	switch ($phase)
	{
		case 1:
			$data = mysql_query("SELECT walzenlage_1, walzenlage_2, walzenlage_3 FROM configuration WHERE ID='$day'") or die(mysql_error());	
			while($info = mysql_fetch_array($data)) 
 			{
 				for ($i = 1; $i < 3; $i++)
				{
					echo $info['walzenlage_' . $i] . " ";
				}	
				echo $info['walzenlage_3'];
			}
			break;
		case 2:
			$data = mysql_query("SELECT ringstellung_1, ringstellung_2, ringstellung_3 FROM configuration WHERE ID='$day'") or die(mysql_error());
			while($info = mysql_fetch_array($data)) 
 			{
 				for ($i = 1; $i < 3; $i++)
				{
					echo $info['ringstellung_' . $i] . " ";
				}	
				echo $info['ringstellung_3'];
			}
			break;
		case 3:
			$data = mysql_query("SELECT steckerverbindungen_1, steckerverbindungen_2, steckerverbindungen_3,
										steckerverbindungen_4, steckerverbindungen_5, steckerverbindungen_6,
										steckerverbindungen_7, steckerverbindungen_8, steckerverbindungen_9, 
										steckerverbindungen_10 FROM configuration WHERE ID='$day'") or die(mysql_error());
			
			while($info = mysql_fetch_array($data))
			{
				for ($i = 1; $i < 10; $i++)
				{
					echo $info['steckerverbindungen_' . $i] . " ";
				}
				echo $info['steckerverbindungen_10'];
			}
			break;
		default:
			$data = "error";
			break;
	}
 	 
	mysql_close($conn);
?>