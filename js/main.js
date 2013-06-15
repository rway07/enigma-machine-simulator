/**
 *		main.js
 *  	Contiene le variabili globali e le funzioni di utilità
 */

// Variabili globali
// Oggetto rappresentante la macchina Enigma
var machine = null;		
// Fase corrente di configurazione
var phase = 1;

/*
 * 		Aggiorna la status bar con il testo passato per parametro
 */
function update_status_bar(new_text)
{
	var status_bar = document.getElementById("status_bar");
	
	child = document.getElementById("status_text");
	if (child != null) status_bar.removeChild(child);
	
	var element = document.createElement("h5");
	element.id = "status_text";
	element.className = "status_bar_text";
	
	element.appendChild(document.createTextNode(new_text));
	status_bar.appendChild(element);
}

/*
 * 		Riconosce la pressione del tasto sinistro del mouse
 */
function detect_left_button(e) 
{
    e = e || window.event;
    var button = e.which || e.button;
    return button == 1;
}

/*
 * 		Restituisce l'indice corrispondente ad un determinato tasto
 */
function get_index(key)
{
	return key.charCodeAt() - 65;
}

/*
 * 		Restituisce il numero corrispondente ad un carattere
 */
function get_number(key)
{
	return parseInt(key, 10);
}

/*
 * 		Crea i link per il passaggio alle varie fasi di configurazione
 */
function create_phase_link(phase)
{
	var phase_link = document.createElement("a");
	phase_link.setAttribute("href", "#");
	switch (phase)
	{
		case 1:
			phase_link.id = "phase_2_link";
			phase_link.setAttribute("onclick", "create_phase_2_layout();");
			phase_link.appendChild(document.createTextNode("go to phase 2"));
			break;
		case 2:
			phase_link.id = "phase_3_link";
			phase_link.setAttribute("onclick", "create_phase_3_layout();");
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
 * 		Ottieni i dati di configurazione riguardanti la fase indicata
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
	xmlhttp.open("GET","php/phase.php?p=" + phase, true);
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
	} 
	else if (document.getElementById("istructions_div"))
	{
		switch (phase)
		{
			case 1:
				locate_phase_1_elements();
				break;
			case 2:
				locate_phase_2_elements();
				break;
			case 3:
				locate_phase_3_elements();
				break;
		}
	}
	else 
	{
		locate_table();
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
 * 	Genera il div principale
 */
function create_content()
{
	var container = document.getElementById('container');
	var content = document.createElement('div');
	content.id = "content";	
	
	container.appendChild(content);
	
	return content;
}

/*
 * 		Gestore dell'evento onLoad
 */
window.onload = function()
{
	machine = new enigma();
	//machine.encrypt("G");
	machine.precalculate_keys();
	show_machine();
}

/*
 * 		Gestore dell'evento onResize
 */
window.onresize = function()
{
	locate_elements();
}