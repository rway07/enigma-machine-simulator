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
	//var board = document.getElementById('board');
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
	rotors_container.id = "rotors_container";
	rotor_one.id = "rotor_one";
	rotor_two.id = "rotor_two";
	rotor_three.id = "rotor_three";
	rotor_one.className = "rotor";
	rotor_two.className = "rotor";
	rotor_three.className = "rotor";
	
	parent.appendChild(rotors_container);
	rotors_container.appendChild(rotor_one);
	rotors_container.appendChild(rotor_two);
	rotors_container.appendChild(rotor_three);
}

/*
 * 		Distrugge il contenuto della pagina e genera il layout della pagina di configurazione
 */
function show_configuration()
{
	destroy_content();
	create_configuration_layout();	
	locate_configuration_elements();
}

/*
 * 		Genera il layout della pagina di configurazione
 */
function create_configuration_layout()
{
	var content = create_content();
	var rotors_hole_div = document.createElement('div');
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
	create_plugs_layout(plugs_div);
}

/*
 * 		Posiziona gli elementi della pagina a seconda della dimensione della finestra
 */
function locate_configuration_elements()
{
	var rotors_container = document.getElementById('rotors_container');
	var rotors_hole = document.getElementById('rotors_hole');
	var plugs = document.getElementById('plugs');
	var width = document.getElementById('content').offsetWidth;
	var margin_big = ((width - 400) / 2);
	var margin_small = ((width - 150) / 2);
	if (width <= 400) 
	{
		margin_big = 0;
		margin_small = 125;
	}
	
	plugs.setAttribute("style", "margin-left: " + margin_big + "px");
	rotors_hole.setAttribute("style", "margin-left: " + margin_big + "px");
	rotors_container.setAttribute("style", "margin-left: " + margin_small + "px");
}
