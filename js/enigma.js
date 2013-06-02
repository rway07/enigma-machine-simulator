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

function crypt_key(key)
{
	
}
