var mouse_x = 0;
var mouse_y = 0;
var rotor_x = 0;
var rotor_y = 0;
var current_rotor = null;

/*
 * 	Disegna una spina
 */
function create_plug(parent, class_name, key, i)
{
	var plug = document.createElement('div');
	var space = document.createElement('div');
	var img = document.createElement('img');
		
	space.className = class_name;	
	plug.className = class_name;
	plug.id = "plug_" + key;
	if ((i == 0) && (key == "A"))
	{
		plug.setAttribute('style','margin-left: 52px');
	} else if (i == 0) 
	{
		plug.setAttribute('style','margin-left: 32px');
	}
	parent.appendChild(plug);
	img.setAttribute('src','images/keys/plug.png');
	img.setAttribute('alt',key.toLowerCase() + '_plug');
	plug.appendChild(img);
	
	if (i != 8) parent.appendChild(space);
}

/*
 * 	Crea il layout delle spine
 */
function create_plugs_layout(parent)
{
	var plugs = document.createElement('div');
	plugs.id = "plugs";
	
	parent.appendChild(plugs);
	var keys = new Array("Q", "W", "E", "R", "T", "Z", "U", "I", "O");
	for (var i = 0; i < 9; i++)
	{
		create_plug(plugs, "plug_place_top", keys[i], i);	
	}
	
	keys = ["A", "S", "D", "F", "G", "H", "J", "K"];
	for (var i = 0; i < 8; i++)
	{
		create_plug(plugs, "plug_place", keys[i], i);
	}
	
	keys = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];
	for (var i = 0; i < 9; i++)
	{
		create_plug(plugs, "plug_place", keys[i], i);
	}
}

/*
 * 		Crea il layout di configurazione dei rotori
 */
function create_rotors_hole_layout(parent)
{
	var rotors_hole = document.createElement('div');
	rotors_hole.id = "rotors_hole";
	
	parent.appendChild(rotors_hole);
}

/*
 * 		Crea il layout per il contenitore dei rotori
 */
function create_rotors_container_layout(parent)
{
	var rotors_container = document.createElement('div');
	var rotor_one = document.createElement('div');
	var rotor_two = document.createElement('div');
	var rotor_three = document.createElement('div');
	var rotor_four = document.createElement('div');
	var rotor_five = document.createElement('div');
	
	rotors_container.id = "rotors_container";
	rotor_one.id = "rotor_one";
	rotor_one.setAttribute("onmousedown","move_rotor(this);");
	rotor_two.id = "rotor_two";
	rotor_two.setAttribute("onmousedown","move_rotor(this);");
	rotor_three.id = "rotor_three";
	rotor_three.setAttribute("onmousedown","move_rotor(this);");
	rotor_four.id = "rotor_four";
	rotor_four.setAttribute("onmousedown","move_rotor(this);");
	rotor_five.id = "rotor_five";
	rotor_five.setAttribute("onmousedown","move_rotor(this);");
	
	parent.appendChild(rotors_container);
	rotors_container.appendChild(rotor_one);
	rotors_container.appendChild(rotor_two);
	rotors_container.appendChild(rotor_three);
	rotors_container.appendChild(rotor_four);
	rotors_container.appendChild(rotor_five);
}


function create_rotors_conf_layout(parent)
{
	var rotors_hole_div = document.createElement('div');
	var rotors_container_div = document.createElement('div');
	rotors_hole_div.id = "rotors_hole_div";
	rotors_container_div.id = "rotors_container_div";
	
	var rotors_hole = document.createElement('div');
	rotors_hole.id = "rotors_hole";
	
	parent.appendChild(rotors_hole_div);
	parent.appendChild(rotors_container_div);	

	create_rotors_hole_layout(rotors_hole_div);
	create_rotors_container_layout(rotors_container_div);
}

/*
 * 		Distrugge il contenuto della pagina e genera il layout della pagina di configurazione
 */
function show_configuration()
{
	destroy_content();
	create_configuration_layout();	
	locate_phase_one_elements();
}

/*
 * 		Genera il layout della pagina di configurazione
 */
function create_configuration_layout()
{
	var content = create_content();
	content.onmousemove = move;
	content.onmouseup = stop;
	var istr_div = document.createElement('div');
	var conf_div = document.createElement('div');
	var title = document.createElement('h2');
	var text;
	istr_div.id = "istructions_div";
	conf_div.id = "configuration_div"; 
	
	content.appendChild(istr_div);
	content.appendChild(conf_div);
	
	text = document.createTextNode("Phase 1: Walzenlage");
	istr_div.appendChild(title);
	title.appendChild(text);
	
	get_phase_data(istr_div, 1);
	create_rotors_conf_layout(conf_div);
	
	/*var rotors_hole_div = document.createElement('div');
	var rotors_container_div = document.createElement('div');
	var plugs_div = document.createElement('div');
	
	rotors_hole_div.id = "rotors_hole_div";
	rotors_container_div.id = "rotors_container_div";
	plugs_div.id = "plugs_div";
	
	content.appendChild(rotors_hole_div);
	content.appendChild(rotors_container_div);
	content.appendChild(plugs_div);
	
	create_rotors_hole_layout(rotors_hole_div);
	create_rotors_container_layout(rotors_container_div);
	create_plugs_layout(plugs_div);*/
}

/*
 * 	
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
       		text = document.createTextNode("Today rotors configuration: " + data);
       		parent.appendChild(text);
       	}
  	}
	xmlhttp.open("GET","phase.php?p=" + phase, true);
	xmlhttp.send();
}

/*
 * 		Posiziona gli elementi della pagina a seconda della dimensione della finestra
 */
function locate_phase_one_elements()
{
	var rotors_container = document.getElementById('rotors_container');
	var rotors_hole = document.getElementById('rotors_hole');
	var rotors_container_parent = document.getElementById('rotors_container_div');
	var rotors_hole_parent = document.getElementById('rotors_hole_div');
	
	var hole_width = rotors_hole_parent.offsetWidth;
	var container_width = rotors_container_parent.offsetWidth;
	var margin_hole = ((hole_width - 400) / 2);
	var margin_container = ((container_width - 250) / 2);
	
	if (document.getElementById('content').offsetWidth <= 400) 
	{
		margin_hole = 0;
		margin_container = 125;
	}
	
	rotors_hole.setAttribute("style", "margin-left: " + margin_hole + "px");
	rotors_container.setAttribute("style", "margin-left: " + margin_container + "px");
}

/*
 * 		Drag and drop
 */
function stop()
{
	current_rotor = null;
}

function move(e)
{
	 mouse_x = document.all ? window.event.clientX : e.pageX;
     mouse_y = document.all ? window.event.clientY : e.pageY;
     
     if(current_rotor != null)
     {
     	current_rotor.style.left = (mouse_x - rotor_x) + "px";
     	current_rotor.style.top = (mouse_y - rotor_y) + "px";
     }
}

function move_rotor(rotor)
{
	current_rotor = rotor;
	rotor_x = mouse_x - current_rotor.offsetLeft;
    rotor_y = mouse_y - current_rotor.offsetTop;
}
