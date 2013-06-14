function enigma()
{
	this.rotor = new Array(3);
	this.rotor_inv = new Array(3);
	this.rotor_letter = new Array(3);
	this.rotor_conf = new Array(5);
	this.rotor_conf_inv = new Array(5);
	this.crypt_table = new Array(26);
	this.switches = new Array(26);

	this.input = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.rotor_conf[0] = ["E","K","M","F","L","G","D","Q","V","Z","N","T","O","W","Y","H","X","U","S","P","A","I","B","R","C","J"];
	this.rotor_conf_inv[0] = ["U","W","Y","G","A","D","F","P","V","Z","B","E","C","K","M","T","H","X","S","L","R","I","N","Q","O","J"];
	this.rotor_conf[1] = ["A","J","D","K","S","I","R","U","X","B","L","H","W","T","M","C","Q","G","Z","N","P","Y","F","V","O","E"];
	this.rotor_conf_inv[1] = ["A","J","P","C","Z","W","R","L","F","B","D","K","O","T","Y","U","Q","G","E","N","H","X","M","I","V","S"];
	this.rotor_conf[2] = ["B","D","F","H","J","L","C","P","R","T","X","V","Z","N","Y","E","I","W","G","A","K","M","U","S","Q","O"];
	this.rotor_conf_inv[2] = ["T","A","G","B","P","C","S","D","Q","E","U","F","V","N","Z","H","Y","I","X","J","W","L","R","K","O","M"];
	this.rotor_conf[3] = ["E","S","O","V","P","Z","J","A","Y","Q","U","I","R","H","X","L","N","F","T","G","K","D","C","M","W","B"];
	this.rotor_conf_inv[3] = ["H","Z","W","V","A","R","T","N","L","G","U","P","X","Q","C","E","J","M","B","S","K","D","Y","O","I","F"];
	this.rotor_conf[4] = ["V","Z","B","R","G","I","T","Y","U","P","S","D","N","H","L","X","A","W","M","J","Q","O","F","E","C","K"];
	this.rotor_conf_inv[4] = ["Q","C","Y","L","X","W","E","N","F","T","Z","O","S","M","V","J","U","D","K","G","I","A","R","P","H","B"];
	this.reflector = ["Y","R","U","H","Q","S","L","D","P","X","N","G","O","K","M","I","E","B","F","Z","C","W","V","J","A","T"];
	
	for (var i = 0; i < 3; i++)
	{
		this.rotor[i] = this.rotor_conf[i];
		this.rotor_inv[i] = this.rotor_conf_inv[i];
		this.rotor_letter[i] = 0;	
	}
	
	for (var i = 0; i < 26; i++)
	{
		this.switches[i] = i;
	} 
}

enigma.prototype.set_rotor = function(place, rotor)
{
	var index = get_number(rotor) - 1;
	this.rotor[place] = this.rotor_conf[index];
	this.rotor_inv[place] = this.rotor_conf_inv[index];
}

enigma.prototype.set_rotor_letter = function(rotor, letter)
{
	this.rotor_letter[rotor] = letter;
}

enigma.prototype.set_plug = function(key_source, key_dest)
{
	this.switches[key_source] = key_dest;
}

enigma.prototype.get_encrypted_key = function(key)
{
	var index = String.charCodeAt(key) - 65;
	
	return this.crypt_table[index];
}

enigma.prototype.precalculate_keys = function()
{
	var key;
	for (var i = 0; i < 26; i++)
	{
		key = this.input[i];
		this.crypt_table[i] = this.encrypt(key);	
	}	
}
function key_to_number(key)
{
	return String.charCodeAt(key) - 65;	
}

enigma.prototype.encrypt = function(key)
{
	var index = this.switches[key_to_number(key)];
	//var index = String.charCodeAt(current_key) - 65;
	var step_char;
	
	for (var i = 0; i < 3; i++)
	{
		index = (index + this.rotor_letter[i]) % 25;
		step_char = this.rotor[i][index];
		index = String.charCodeAt(step_char) - 65;
	}

	step_char = this.reflector[index];
	index = String.charCodeAt(step_char) - 65;
	
	for (var i = 2; i >=0; i--)
	{
		index = (index + this.rotor_letter[i]) % 25;
		step_char = this.rotor_inv[i][index];
		index = String.charCodeAt(step_char) - 65;
	}
	
	return step_char;
}

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
}

function textbox_down_handler(e)
{
	e = (!e) ? window.event : e;
	var c = e.keyCode;
	
	if ((c >= 65) && (c <= 90))
	{
		var key = String.fromCharCode(c);
		write_key(key);
	}
}

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
function key_down_handler(e, key)
{
	if (detect_left_button(e)) write_key(key);
}

function key_up_handler(e, key)
{
	if (detect_left_button(e)) key_release(key);
}

function key_press(key, encrypted_key)
{
	var key_node = document.getElementById('key_image_' + key);
	var light_node = document.getElementById('light_image_' + encrypted_key);
	
	key_down(key_node, key);
	light_on(light_node, encrypted_key);
}

function key_release(key)
{
	var key_node = document.getElementById('key_image_' + key);
	var encrypted_key = machine.get_encrypted_key(key);
	var light_node = document.getElementById('light_image_' + encrypted_key);
	
	key_up(key_node, key);
	light_off(light_node, encrypted_key);
}

function key_down(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_key_pressed.png');	
}

function key_up(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_key_normal.png');
}

function light_on(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_light_on.png');
}

function light_off(parent, key)
{
	parent.setAttribute('src','images/keys/' + key.toLowerCase() + '_light_off.png');
}
