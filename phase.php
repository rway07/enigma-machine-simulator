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
			$data = mysql_query("SELECT walzenlage_1, walzenlage_2, walzenlage_3 FROM configuration WHERE ID='$day'") or die(mysql_error());
			
			while($info = mysql_fetch_array( $data )) 
 			{	
				echo $info['walzenlage_1'] . " ";
				echo $info['walzenlage_2'] . " ";
				echo $info['walzenlage_3'];
			}
			
			break;
		case 2:
			$data = mysql_query("SELECT ringstellung_1, ringstellung_2, ringstellung_3 FROM configuration WHERE ID='$day'") or die(mysql_error());
			
			while($info = mysql_fetch_array( $data )) 
 			{	
				echo $info['ringstellung_1'] . " ";
				echo $info['ringstellung_2'] . " ";
				echo $info['ringstellung_3'];
			}
			
			break;
		case 3:
			$data = mysql_query("SELECT steckerverbindungen_1, steckerverbindungen_2, steckerverbindungen_3,
										steckerverbindungen_4, steckerverbindungen_5, steckerverbindungen_6,
										steckerverbindungen_7, steckerverbindungen_8, steckerverbindungen_9, 
										steckerverbindungen_10 FROM configuration WHERE ID='$day'") or die(mysql_error());
			
			while($info = mysql_fetch_array( $data )) 
 			{	
				echo $info['steckerverbindungen_1'] . " ";
				echo $info['steckerverbindungen_2'] . " ";
				echo $info['steckerverbindungen_3'] . " ";
				echo $info['steckerverbindungen_4'] . " ";
				echo $info['steckerverbindungen_5'] . " ";
				echo $info['steckerverbindungen_6'] . " ";
				echo $info['steckerverbindungen_7'] . " ";
				echo $info['steckerverbindungen_8'] . " ";
				echo $info['steckerverbindungen_9'] . " ";
				echo $info['steckerverbindungen_10'];
			}
			
			break;
	}
 	 
	mysql_close($conn);
?>