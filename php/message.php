<?php
	/*
	 * 		message.php
	 * 		Gestisce l'invio dei messaggi della macchina Enigma
	 */
	require "enigma.php";
	
	setup_machine();
	
	$database_name = "enigma";
	$table_name = "messages";
	$conn = mysql_connect("localhost", "root","") or die(mysql_error());
	mysql_select_db($database_name) or die(mysql_error());

	$timestamp = date('Y-m-d H:i:s');	
	
	$data = mysql_query("SELECT MAX(ID) AS 'idmax' FROM $database_name.$table_name") or die(mysql_error());
	$info = mysql_fetch_array($data);
	$id = $info['idmax'] + 1;
	
	$clear_text = $_POST['clear'];
	$crypted_text = $_POST["crypt"];
	$decrypted_text_client = $_POST["c_decrypt"];
	
	$decrypted_text_server = decrypt_text($crypted_text);
		
	$data = mysql_query(
	"INSERT INTO $database_name.$table_name (`ID`, `date`, `clear_message`, `crypted_message`, `decrypted_message_server`, 		`decrypted_message_client`) VALUES ('$id', '$timestamp', '$clear_text', '$crypted_text', '$decrypted_text_server', 			'$decrypted_text_client');") or die(mysql_error());
				
	mysql_close($conn);
?>