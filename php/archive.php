<?php
	/*
 	 *		archive.php 
	 * 		Gestisce il recupero dei messaggi inviati tramite la macchina Enigma
 	 */
    $database_name = "enigma";
    $table_name = "messages";
	
    $conn = mysql_connect("localhost", "root", "") or die(mysql_error());
    mysql_select_db($database_name) or die(mysql_error());

    $data = mysql_query("SELECT * FROM $database_name.$table_name") or die(mysql_error());
    $rows = mysql_num_rows($data);

    echo $rows . "_";

    while ($info = mysql_fetch_array($data)) {
        echo $info['date'] . "_";
        echo $info['clear_message'] . "_";
        echo $info['crypted_message'] . "_";
        echo $info['decrypted_message_server'] . "_";
        echo $info['decrypted_message_client'] . "_";
    }

    mysql_close($conn);
?>