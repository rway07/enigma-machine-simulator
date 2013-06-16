/*
 * 		Rappresentazione del funzionamento della macchina Enigma
 */
function enigma()
{
	this.rotor = new Array(3);
	this.rotor_number = new Array(3);
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
	
	// Inizializzazione variabili
	for (var i = 0; i < 3; i++)
	{
		this.rotor[i] = this.rotor_conf[i];
		this.rotor_number[i] = i;
		this.rotor_inv[i] = this.rotor_conf_inv[i];
		this.rotor_letter[i] = 0;	
	}
	
	for (var i = 0; i < 26; i++)
	{
		this.switches[i] = i;
	} 
}


enigma.prototype.get_rotors_conf = function()
{
	var text = "";
	
	for (var i = 0; i < 3; i++)
	{
		text = text + this.rotor_number[i] + " ";
	}	
	
	return text;
}

enigma.prototype.get_rotors_letter_conf = function()
{
	var text = "";
	
	for (var i = 0; i < 3; i++)
	{
		text = text + this.input[this.rotor_letter[i]] + " ";
	}
	
	return text;
}

enigma.prototype.get_plugs_conf = function()
{
	var text = "";
	
	for (var i = 0; i < 26; i++)
	{
		if (this.switches[i] != i)
			text = text + this.input[i] + "<>" + this.input[this.switches[i]] + " ";
	}
	
	if (text == "") 
		text = "N/C";
		
	return text;
}

/*
 * 		Impostazione del rotore nell'alloggiamento indicato
 */
enigma.prototype.set_rotor = function(place, rotor)
{
	var index = get_number(rotor) - 1;
	this.rotor_number[place] = index;
	this.rotor[place] = this.rotor_conf[index];
	this.rotor_inv[place] = this.rotor_conf_inv[index];
}

/*
 * 		Imposta la lettera del rotore
 */
enigma.prototype.set_rotor_letter = function(rotor, letter)
{
	this.rotor_letter[rotor] = letter;
}

/*
 * 		Configura una spina di scambio delle lettere
 */
enigma.prototype.set_plug = function(key_source, key_dest)
{
	this.switches[key_source] = key_dest;
}

/*
 * 		Restiruisce il carattere cifrato
 */
enigma.prototype.get_encrypted_key = function(key)
{
	//var index = String.charCodeAt(key) - 65;
	var index = key.charCodeAt(0) - 65;
	
	return this.crypt_table[index];
}

/*
 * 		Per ogni lettera calcola il corrispettivo cifrato
 */
enigma.prototype.precalculate_keys = function()
{
	var key;
	for (var i = 0; i < 26; i++)
	{
		key = this.input[i];
		this.crypt_table[i] = this.encrypt(key);	
	}	
}

/*
 * 		Applica l'algoritmo della macchina Enigma al carattere indicato
 */
enigma.prototype.encrypt = function(key)
{
	var index = this.switches[key_to_number(key)];
	var step_char;
	var step = 0;
	
	for (var i = 0; i < 3; i++)
	{
		index = (index + this.rotor_letter[i]) % 26;
		step_char = this.rotor[i][index];
		index = step_char.charCodeAt(0) - 65;
	}

	step_char = this.reflector[index];
	index = (step_char.charCodeAt(0) - 65);
		
	for (var i = 2; i >=0; i--)
	{
		step = this.rotor_letter[i];
		step_char = this.rotor_inv[i][index];
		index = (step_char.charCodeAt(0) - 65) - step;
		index = ((index) < 0) ? (26 + index) : index;
	}
	step_char = this.input[index];
	
	return step_char;
}