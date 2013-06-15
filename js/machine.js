var decrypted_message_client = "";

/*
 * 	Disegna la parte superiore dei rotori della macchina Enigma
 */
function create_rotor_place(parent, i)
{
	var rotor_place = document.createElement('div');
	var img = document.createElement('img');
	rotor_place.className = "rotor_place";
	rotor_place.id = "rotor_place_" + i;
	if (i == 1) rotor_place.setAttribute('style', 'margin-left: 90px');
	parent.appendChild(rotor_place);
	img.setAttribute('src','images/base_rotore.png');
	img.setAttribute('alt','rotor_' + i);
	rotor_place.appendChild(img);
}

/*
 * 	Disegna le luci della macchina Enigma
 */
function create_light(parent, key, i)
{
	var light = document.createElement('div');
	var img = document.createElement('img');
	light.className = "button_place";
	light.id = "light_" + key;
	if ((i == 0) && (key == "A"))
	{
		light.setAttribute('style','margin-left: 40px');
	} else if (i == 0) 
	{
		light.setAttribute('style','margin-left: 20px');
	}
	parent.appendChild(light);
	img.id = "light_image_" + key;	
	img.setAttribute('src','images/keys/' + key.toLowerCase() + '_light_off.png');
	img.setAttribute('alt',key.toLowerCase() + '_key');
	img.className = "button";
	light.appendChild(img);
}

/*
 * 	Disegna i tasti della macchina Enigma
 */
function create_keys(parent, key, i)
{
	var button = document.createElement('div');
	var img = document.createElement('img');
	button.className = "button_place";
	button.id = "button_" + key;
	if ((i == 0) && (key == "A"))
	{
		button.setAttribute('style','margin-left: 40px');
	} else if (i == 0) 
	{
		button.setAttribute('style','margin-left: 20px');
	}
	parent.appendChild(button);	
	img.id = "key_image_" + key;	
	img.setAttribute('src','images/keys/' + key.toLowerCase() + '_key_normal.png');
	img.setAttribute('alt',key.toLowerCase() + '_key');
	img.setAttribute('onmousedown','key_down_handler(event, "' + key + '");');
	img.setAttribute('onmouseup','key_up_handler(event, "' + key + '");');
	img.setAttribute('onmouseout','key_up_handler(event, "' + key + '");');
	img.className = "button";
	button.appendChild(img);
}

/*
 * 	Disegna il layout della macchina Enigma
 */
function create_machine_layout()
{
	var board = document.getElementById('board');
	var machine = document.createElement('div');
	var top_machine = document.createElement('div');
	var middle_machine = document.createElement('div');
	var bottom_machine = document.createElement('div');
	
	machine.id = "machine";
	top_machine.id = "top_machine";
	middle_machine.id = "middle_machine";
	bottom_machine.id = "bottom_machine";
	
	board.appendChild(machine);			
	machine.appendChild(top_machine);
	machine.appendChild(middle_machine);
	machine.appendChild(bottom_machine);	
	
	for (var i = 0; i < 3; i++)
	{
		create_rotor_place(top_machine, i+1);	
	}
	
	var keys = new Array("Q", "W", "E", "R", "T", "Z", "U", "I", "O");
	for (var i = 0; i < 9; i++)
	{
		create_light(middle_machine, keys[i], i);
		create_keys(bottom_machine, keys[i], i);
	}
	
	keys = ["A", "S", "D", "F", "G", "H", "J", "K"];
	for (var i = 0; i < 8; i++)
	{
		create_light(middle_machine, keys[i], i);
		create_keys(bottom_machine, keys[i], i);
	}
	
	keys = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];
	for (var i = 0; i < 9; i++)
	{
		create_light(middle_machine, keys[i], i);
		create_keys(bottom_machine, keys[i], i);
	}
}

/*
 * 		Crea la sezione contenente le textbox e i bottoni
 */
function create_screen()
{
	var screen_div = document.getElementById('screen');
	var input_div = document.createElement('div');
	var clear_div = document.createElement('div');
	var cypher_div = document.createElement('div');
	var input_textbox = document.createElement('textarea');
	var clear_textbox = document.createElement('textarea');
	var cypher_textbox = document.createElement('textarea');
	var reset_button = document.createElement("button");
	var send_button = document.createElement("button");

	input_div.id = "screen_input";
	clear_div.id = "screen_clear";
	cypher_div.id = "screen_cypher";
	input_textbox.setAttribute("rows", 2);
	input_textbox.setAttribute("id","input_textbox");
	input_textbox.setAttribute("cols", 16);
	input_textbox.onkeyup = textbox_up_handler;
	input_textbox.onkeydown = textbox_down_handler;	
	input_textbox.onblur = textbox_up_handler;
	clear_textbox.setAttribute("rows", 2);
	clear_textbox.setAttribute("id","clear_textbox");
	clear_textbox.setAttribute("cols", 16);
	clear_textbox.setAttribute("disabled","disabled");
	cypher_textbox.setAttribute("rows", 2);
	cypher_textbox.setAttribute("id", "cypher_textbox");
	cypher_textbox.setAttribute("cols", 16);
	cypher_textbox.setAttribute("disabled","disabled");
	
	screen_div.appendChild(input_div);
	screen_div.appendChild(clear_div);
	screen_div.appendChild(cypher_div);
	
	var text = document.createTextNode("input here: ")
	input_div.appendChild(text);
	input_div.appendChild(input_textbox);
	
	text = document.createTextNode("clear text: ");
	clear_div.appendChild(text);
	clear_div.appendChild(clear_textbox);
	
	text = document.createTextNode("cypher text: ");
	cypher_div.appendChild(text);
	cypher_div.appendChild(cypher_textbox);
	
	send_button.setAttribute("type","button");
	send_button.setAttribute("value","invia");
	send_button.setAttribute("onclick","send_message()");
	send_button.appendChild(document.createTextNode("send!"));
	reset_button.setAttribute("type","button");
	reset_button.setAttribute("value","reset");
	reset_button.setAttribute("onclick","reset_values()");
	reset_button.appendChild(document.createTextNode("reset!"));
	
	screen_div.appendChild(reset_button);
	screen_div.appendChild(send_button);
}

/*
 *	Crea il layout di base per la macchina
 */
function create_main_layout()
{
	var content = create_content();
	var board = document.createElement('div');
	var screen_div = document.createElement('div');
	content.id = "content";
	board.id = "board";
	screen_div.id = "screen";
	
	container.appendChild(content);
	content.appendChild(board);
	content.appendChild(screen_div); 
	
	create_machine_layout()
	create_screen();
	locate_machine();
	
	decrypted_message_client = "";
}

/*
 * 		Posiziona la macchina al centro dello schermo
 */
function locate_machine()
{
	var machine = document.getElementById('machine');
	var width = document.getElementById('content').offsetWidth;
	var current_margin = ((width - 400) / 2);
	
	if (width <= 400) current_margin = 0;
	
	machine.setAttribute("style", "margin-left: " + current_margin + "px");
}

/*
 * 		Distrugge il contenuto di content e genera il layout riguardante la macchina
 */
function show_machine()
{
	destroy_content();
	create_main_layout();
	update_status_bar("Use mouse's pointer or textarea on the left to compose your message!");
}

/*
 * 		Reset dei valori delle textbox
 */
function reset_values()
{
	document.getElementById("input_textbox").value = "";
	document.getElementById("clear_textbox").value = "";
	document.getElementById("cypher_textbox").value = "";
}

/*
 * 		Invia il messaggio scritto dalla macchina al server
 */
function send_message()
{
	var xmlhttp;
	var data;
	var clear_text = document.getElementById("clear_textbox").value;
	var crypted_text = document.getElementById("cypher_textbox").value;
	var params = "clear=" + clear_text + "&crypt=" + crypted_text + "&c_decrypt=" + decrypted_message_client;
	
	if (window.XMLHttpRequest)
  	{
  		xmlhttp=new XMLHttpRequest();
  	}
	else
  	{
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	xmlhttp.onreadystatechange=function()
  	{
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		
    	}
  	}
  	
	xmlhttp.open("POST","php/message.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(params);
}

/*
 * 		Dato un carattere restituisce un numero
 */
function key_to_number(key)
{
	return String.charCodeAt(key) - 65;	
}

/*
 * 		Scrive i caratteri in chiaro e cifrati nelle textbox corrispettive
 */
function write_key(key)
{
	var clear_textbox = document.getElementById("clear_textbox");
	var cypher_textbox = document.getElementById("cypher_textbox");
	var encrypted_key = machine.get_encrypted_key(key);
	var key_node = document.getElementById('key_image_' + key);
	var light_node = document.getElementById('light_image_' + encrypted_key);
		
	key_press(key, encrypted_key)	

	clear_textbox.value = clear_textbox.value + key;
	cypher_textbox.value = cypher_textbox.value + encrypted_key;
	decrypted_message_client = decrypted_message_client + machine.get_encrypted_key(encrypted_key);
}

/*
 * 		Aggiunge uno spazio nelle textbox
 */
function write_space()
{
	var clear_textbox = document.getElementById("clear_textbox");
	var cypher_textbox = document.getElementById("cypher_textbox");
	
	clear_textbox.value = clear_textbox.value + " ";
	cypher_textbox.value = cypher_textbox.value + " ";
	
	decrypted_message_client = decrypted_message_client + " "
}

/*
 * 		Gestore dell'evento key_down all'interno della textbox
 */
function textbox_down_handler(e)
{
	e = (!e) ? window.event : e;
	var c = e.keyCode;
	
	if ((c >= 65) && (c <= 90))
	{
		var key = String.fromCharCode(c);
		write_key(key);
	}
	else if (c == 32)
	{
		write_space();
	}
}

/*
 * 		Gestore dell'evento key_up all'interno della textbox
 */
function textbox_up_handler(e)
{
	e = (!e) ? window.event : e;
	var c = e.keyCode;
	
	if ((c >= 65) && (c <= 90))
	{
		var key = String.fromCharCode(c);
		key_release(key);
	}
}

/*
 * 		Gestore dell'evento mouseDown
 */
function key_down_handler(e, key)
{
	if (detect_left_button(e)) write_key(key);
}

/*
 * 		Gestore dell'evento mouseUp
 */
function key_up_handler(e, key)
{
	if (detect_left_button(e)) key_release(key);
}

/*
 * 		Simula la pressione di un tasto sulla macchina Enigma
 */
function key_press(key, encrypted_key)
{
	var key_node = document.getElementById('key_image_' + key);
	var light_node = document.getElementById('light_image_' + encrypted_key);
	
	key_down(key_node, key);
	light_on(light_node, encrypted_key);
}

/*
 * 		Simula il rilascio di un tasto sulla macchina Enigma
 */
function key_release(key)
{
	var key_node = document.getElementById('key_image_' + key);
	var encrypted_key = machine.get_encrypted_key(key);
	var light_node = document.getElementById('light_image_' + encrypted_key);
	
	key_up(key_node, key);
	light_off(light_node, encrypted_key);
}

/*	
 * 		Cambio immagine relativo alla pressione di un tasto sulla macchina Enigma
 */
function key_down(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_key_pressed.png');	
}

/*
 * 		Cambio immagine relativo al rilascio di un tasto sulla macchina Enigma
 */
function key_up(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_key_normal.png');
}

/*
 * 		Cambio immagine della lampadina relativo alla pressione di un tasto sulla macchina Enigma
 */
function light_on(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_light_on.png');
}

/*
 * 		Cambio immagine della lampadina relativo al rilascio di un tasto sulla macchina Enigma
 */
function light_off(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_light_off.png');
}