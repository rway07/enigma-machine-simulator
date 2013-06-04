function enigmaConfiguration()
{
	this.rotor = new Array[3];
	this.rotor_letter = new Array[3];

	this.rotor[0] = 0;
	this.rotor[1] = 1;
	this.rotor[2] = 2;
	
	this.rotor_letter[0] = 0;
	this.rotor_letter[1] = 1;
	this.rotor_letter[2] = 2;
}

enigmaConfiguration.prototype.set_rotor = function(place, rotor)
{
	this.rotor[place] = rotor;
}

enigmaConfiguration.prototype.set_rotor_letter = function(rotor, letter)
{
	this.rotor_letter[rotor] = letter;
}

function write_key(key)
{
	var clear_textbox = document.getElementById("clear_textbox");
	var cypher_textbox = document.getElementById("cypher_textbox");
	clear_textbox.value = clear_textbox.value + key;
	cypher_textbox.value = cypher_textbox.value + key;
}

function textbox_down_handler(e)
{
	e = (!e) ? window.event : e;
	var cypher_textbox = document.getElementById("cypher_textbox");
	var c = e.keyCode;
	
	if ((c >= 65) && (c <= 90))
	{
		var key = String.fromCharCode(c);
		var key_node = document.getElementById('key_image_' + key);
		var light_node = document.getElementById('light_image_' + key);
	
		key_down(key_node, key);
		light_on(light_node, key);	
		cypher_textbox.value = cypher_textbox.value + key;	
	}
	
}

function textbox_up_handler(e)
{
	e = (!e) ? window.event : e;
	var c = e.keyCode;
	
	if ((c >= 65) && (c <= 90))
	{
		var key = String.fromCharCode(c);
		var key_node = document.getElementById('key_image_' + key);
		var light_node = document.getElementById('light_image_' + key);
	
		key_up(key_node, key);
		light_off(light_node, key);
	}
}
function key_down_handler(key)
{
	var key_node = document.getElementById('key_image_' + key);
	var light_node = document.getElementById('light_image_' + key);
	
	key_down(key_node, key);
	light_on(light_node, key);
	write_key(key);
}

function key_up_handler(key)
{
	var key_node = document.getElementById('key_image_' + key);
	var light_node = document.getElementById('light_image_' + key);
	
	key_up(key_node, key);
	light_off(light_node, key);		
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
