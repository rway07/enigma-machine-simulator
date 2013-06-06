<?php
	$phase=$_GET["p"];
	
	if (($phase < 1) || ($phase > 3)) 
		die("Errore!!");
	
	$database_name = "enigma";
	$conn = mysql_connect("localhost", "root","") or die(mysql_error());
	mysql_select_db($database_name) or die(mysql_error());
	
	$day = date('d');
	
	switch ($phase)
	{
		case 1:
			$data = mysql_query("SELECT walzenlage_1,walzenlage_2,walzenlage_3 FROM configuration WHERE ID='1'") or die(mysql_error());
			
			while($info = mysql_fetch_array( $data )) 
 			{	
				echo $info['walzenlage_1'] . " ";
				echo $info['walzenlage_2'] . " ";
				echo $info['walzenlage_3'];
			}
			
			break;
		case 2:
			$data = mysql_query("SELECT walzenlage_1,walzenlage_2,walzenlage_3 FROM configuration WHERE ID='1'") or die(mysql_error());
			break;
		case 3:
			$data = mysql_query("SELECT walzenlage_1,walzenlage_2,walzenlage_3 FROM configuration WHERE ID='1'") or die(mysql_error());
			break;
	}
 	 
	mysql_close($conn);
?>