<?php
	$database_name = "enigma";
	$conn = mysql_connect("localhost", "root","") or die(mysql_error());
	mysql_select_db($database_name) or die(mysql_error());
	
	$data = mysql_query("SELECT * FROM messages") or die(mysql_error());
	

?>