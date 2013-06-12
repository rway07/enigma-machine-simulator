/**
 *	main.js
 *  inizializza i vari componenti grafici e la configurazione di default
 * 
 */

var machine = null;
var phase = 1;

function detect_left_button(e) 
{
    e = e || window.event;
    var button = e.which || e.button;
    return button == 1;
}

function get_index(key)
{
	return key.charCodeAt() - 65;
}

function get_number(key)
{
	return key.charCodeAt() - 48;
}

function create_phase_link(phase)
{
	var phase_link = document.createElement("a");
	phase_link.setAttribute("href", "#");
	switch (phase)
	{
		case 1:
			phase_link.id = "phase_two_link";
			phase_link.setAttribute("onclick", "create_phase_two_layout();");
			phase_link.appendChild(document.createTextNode("go to phase 2"));
			break;
		case 2:
			phase_link.id = "phase_three_link";
			phase_link.setAttribute("onclick", "create_phase_three_layout();");
			phase_link.appendChild(document.createTextNode("go to phase 3"));
			break;
		case 3:
			phase_link.id = "phase_done_link";
			phase_link.setAttribute("onclick", "use_machine();");
			phase_link.appendChild(document.createTextNode("use machine!!"));
			break;
	}
	
	document.getElementById("istructions_div").appendChild(phase_link); 
}

/*
 * 		Ottieni i dati di configurazione riguardanti la fase x
 */
function get_phase_data(parent, phase)
{
	var xmlhttp;
	var data;
	
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
    		data = xmlhttp.responseText;
    		switch (phase)
    		{
    			case 1:
    				text = document.createTextNode("Today rotors configuration: " + data);
    				break;
    			case 2:
    				text = document.createTextNode("Today rotors letter configuration: " + data);
    				break;
    			case 3:
    				text = document.createTextNode("Today plugs configuration: " + data);
    				break;
    		}
       		parent.appendChild(text);
       		parent.appendChild(document.createElement("br"));
       		if (phase != 1)
       			create_phase_link(phase);
       	}
  	}
	xmlhttp.open("GET","phase.php?p=" + phase, true);
	xmlhttp.send();
}

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
		switch (phase)
		{
			case 1:
				locate_phase_one_elements();
				break;
			case 2:
				locate_phase_two_elements();
				break;
			case 3:
				locate_phase_three_elements();
				break;
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
	// For now load enigma machine core at window load
	machine = new enigma();
	machine.precalculate_keys();
}

window.onunload = function()
{
	
}

window.onresize = function()
{
	locate_elements();
}