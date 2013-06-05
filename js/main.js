/**
 *	main.js
 *  inizializza i vari componenti grafici e la configurazione di default
 * 
 */

var machine;

/*
 * 		Riposiziona gli elementi della pagina a seconda della dimensione della finestra
 */
function locate_elements()
{
	var current_div = document.getElementById('machine');
	if (current_div != undefined)
	{
		locate_machine();
	} else
	{
		current_div = document.getElementById('rotors_hole_div');
		if (current_div != undefined)
		{
			locate_configuration_elements();
		}
	}
	
}

/*
 * 	Distrugge tutti gli elementi all'interno di content
 */
function destroy_content()
{
	var content = document.getElementById('content');
	if (content != null)
	{
		var parent = content.parentNode;
		parent.removeChild(content);
	}
		
}

/*
 * 	Genera il div content 
 */
function create_content()
{
	var container = document.getElementById('container');
	var content = document.createElement('div');
	content.id = "content";	
	
	container.appendChild(content);
	
	return content;
}

window.onload = function()
{
	//create_main_layout();
	// For now load enima machine core at window load
	machine = new enigma();
}

window.onunload = function()
{
	
}

window.onresize = function()
{
	locate_elements();
}
