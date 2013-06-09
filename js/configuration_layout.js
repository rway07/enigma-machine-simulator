var mouse_x = 0;
var mouse_y = 0;
var rotor_x = 0;
var rotor_y = 0;
var current_rotor = null;
var current_rotor_num = 0;
var current_rotor_hole = -1;
var holes = new Array(3);
var current_hole = 0;

function reset_phase_one_var()
{
	mouse_x = 0;
	mouse_y = 0;
	rotor_x = 0;
	rotor_y = 0;
	current_rotor = null;
	current_rotor_num = 0;
	current_rotor_hole = -1;
		
	for (var i = 0; i < 5; i++)
	{
		holes[i] = new hole();
		holes[i].set_rotor(0);
	}	
}

/*
 * 		Oggetto che rappresenta uno degli alloggiamenti dei rotori
 */
function hole()
{
	this.rotor = 0;	
}

/*
 * 		Settaggio rotore numero num nell'alloggiamento
 */
hole.prototype.set_rotor = function(num)
{
	this.rotor = num;
}

/*
 * 		Ottiene il numero del rotore nell'alloggiamento
 */
hole.prototype.get_rotor = function()
{
	return this.rotor;
}


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
function phase_three_layout(parent)
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

function holeMouseOver(obj)
{
	obj.setAttribute("style","background: green;");
}

function holeMouseOut(obj)
{
	obj.setAttribute("style","background: white;");
}

/*
 * 		Crea il layout di configurazione dei rotori
 */
function create_rotors_hole_layout(parent)
{
	var rotors_hole = document.createElement('div');
	var rotor_hole_1 = document.createElement('div');
	var rotor_hole_2 = document.createElement('div');
	var rotor_hole_3 = document.createElement('div');
	rotors_hole.id = "rotors_hole";
	rotor_hole_1.id = "rotor_hole_1";
	rotor_hole_1.setAttribute("onmouseover","holeMouseOver(this);");
	rotor_hole_1.setAttribute("onmouseout","holeMouseOut(this);");
	rotor_hole_2.id = "rotor_hole_2";
	rotor_hole_2.setAttribute("onmouseover","holeMouseOver(this);");
	rotor_hole_2.setAttribute("onmouseout","holeMouseOut(this);");
	rotor_hole_3.id = "rotor_hole_3";
	rotor_hole_3.setAttribute("onmouseover","holeMouseOver(this);");
	rotor_hole_3.setAttribute("onmouseout","holeMouseOut(this);");
	
	parent.appendChild(rotors_hole);
	rotors_hole.appendChild(rotor_hole_1);
	rotors_hole.appendChild(rotor_hole_2);
	rotors_hole.appendChild(rotor_hole_3);
}

/*
 * 		Crea il layout per il contenitore dei rotori
 */
function create_rotors_container_layout(parent)
{
	var rotors_container = document.createElement('div');
	var rotor_1_cont = document.createElement('div');
	var rotor_2_cont = document.createElement('div');
	var rotor_3_cont = document.createElement('div');
	var rotor_4_cont = document.createElement('div');
	var rotor_5_cont = document.createElement('div');
	var rotor_1 = document.createElement('div');
	var rotor_2 = document.createElement('div');
	var rotor_3 = document.createElement('div');
	var rotor_4 = document.createElement('div');
	var rotor_5 = document.createElement('div');
	
	
	rotors_container.id = "rotors_container";
	rotor_1_cont.id = "rotor_1_container";
	rotor_1.id = "rotor_1";
	rotor_1.setAttribute("onmousedown","move_rotor(this);");
	rotor_2_cont.id = "rotor_2_container";
	rotor_2.id = "rotor_2";
	rotor_2.setAttribute("onmousedown","move_rotor(this);");
	rotor_3_cont.id = "rotor_3_container";
	rotor_3.id = "rotor_3";
	rotor_3.setAttribute("onmousedown","move_rotor(this);");
	rotor_4_cont.id = "rotor_4_container";
	rotor_4.id = "rotor_4";
	rotor_4.setAttribute("onmousedown","move_rotor(this);");
	rotor_5_cont.id = "rotor_5_container";
	rotor_5.id = "rotor_5";
	rotor_5.setAttribute("onmousedown","move_rotor(this);");
	
	parent.appendChild(rotors_container);
	rotors_container.appendChild(rotor_1_cont);
	rotors_container.appendChild(rotor_2_cont);
	rotors_container.appendChild(rotor_3_cont);
	rotors_container.appendChild(rotor_4_cont);
	rotors_container.appendChild(rotor_5_cont);
	rotor_1_cont.appendChild(rotor_1);
	rotor_2_cont.appendChild(rotor_2);
	rotor_3_cont.appendChild(rotor_3);
	rotor_4_cont.appendChild(rotor_4);
	rotor_5_cont.appendChild(rotor_5);
}

/*
 * 		Crea il layout di configurazione dei rotori
 */
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
	
	reset_phase_one_var();
}

/*
 * 		Ottieni i dati di configurazione riguardanti la fase 1
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
       		parent.appendChild(document.createElement("br"));
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
 * 		Aggiorna la configurazione della macchina una volta conclusa la fase 1
 */
function phase_one_done()
{
	for (var i = 0; i < 3; i++)
	{
		machine.set_rotor(i, holes[i].get_rotor());
	}
}

/*
 * 		Controlla se la fase 1 è stata completata
 */
function check_phase_one_done()
{
	for (var i = 0; i < 3; i++)
	{
		if (holes[i].get_rotor() == 0) return false;
	}
	
	return true;
}

/*
 * 		Crea il link per il passaggio alla fase 2
 */
function check_phase_two()
{
	if (check_phase_one_done())
	{
		// Enable phase two pass
		var phase_two_link = document.createElement("a");
		phase_two_link.id = "phase_two_link";
		phase_two_link.setAttribute("href","#");
		phase_two_link.setAttribute("onclick","create_phase_two_layout();");
		phase_two_link.appendChild(document.createTextNode("go to phase 2"));
		document.getElementById("istructions_div").appendChild(phase_two_link);
	}
	else
	{
		// Disable always
		link = document.getElementById("phase_two_link");
		if (link != null)
		{
			document.getElementById("istructions_div").removeChild(link);
		}
	}
}

/*
 * 		Crea il layout per la fase 2
 */
function create_phase_two_layout()
{
	phase_one_done();
	destroy_content();
}
function place_rotor(rotor, place)
{
	var parent = rotor.parentNode;
	var new_rotor = document.createElement("div");
	
	parent.removeChild(rotor);
	new_rotor.id = rotor.id;
	new_rotor.setAttribute("onmousedown", "move_rotor(this);")
	document.getElementById("rotor_hole_" + place).appendChild(new_rotor); 
}

function remove_rotor(parent_number, rotor)
{
	var parent = rotor.parentNode;
	var new_rotor = document.createElement("div");
	parent.removeChild(rotor);
	new_rotor.id = current_rotor.id;
	new_rotor.setAttribute("onmousedown", "move_rotor(this);");
	document.getElementById("rotor_" + parent_number + "_container").appendChild(new_rotor); 
}

function check_hole(hole, rotor_num)
{
	for (var i = 0; i < 3; i++)
	{
		if (holes[i].get_rotor() == rotor_num)
			holes[i].set_rotor(0);
	}
	
	holes[hole].set_rotor(rotor_num);
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

/*
 * 		Funzione richimamata nell'evento mouseUp durante il trascinamento del rotore
 */
function stop()
{
	if (current_rotor != null)
	{
		var hole_1 = document.getElementById("rotor_hole_1");
		var margin_top_min = getOffset(hole_1).top;
		var margin_top_max = margin_top_min + 110;
		var margin_1_left_min = getOffset(hole_1).left;
		var margin_1_left_max = margin_1_left_min + 50;
		var margin_2_left_min = margin_1_left_max;
		var margin_2_left_max = margin_2_left_min + 50;
		var margin_3_left_min = margin_2_left_max;
		var margin_3_left_max = margin_3_left_min + 50;
		
		var parent = current_rotor.parentNode;
		
		if (((mouse_x >= margin_1_left_min) && (mouse_x <= margin_1_left_max)) && ((mouse_y >= margin_top_min) && (mouse_y <= margin_top_max)) && holes[0].get_rotor() == 0) 
		{
			//current_rotor.style.left = hole_1.style.left;
			//current_rotor.style.top = hole_1.style.top;
			place_rotor(current_rotor, 1);
			check_hole(0, current_rotor_num);
		} 
		else if (((mouse_x >= margin_2_left_min) && (mouse_x <= margin_2_left_max)) && ((mouse_y >= margin_top_min) && (mouse_y <= margin_top_max)) && holes[1].get_rotor() == 0) 
		{
			//current_rotor.style.left = margin_2_left_min;
			//current_rotor.style.top = margin_top_min;
			place_rotor(current_rotor, 2);
			check_hole(1, current_rotor_num);
		} 
		else if (((mouse_x >= margin_3_left_min) && (mouse_x <= margin_3_left_max)) && ((mouse_y >= margin_top_min) && (mouse_y <= margin_top_max)) && holes[2].get_rotor() == 0) 
		{
			//current_rotor.style.left = margin_3_left_min;
			//current_rotor.style.top = margin_top_min;
			place_rotor(current_rotor, 3);
			check_hole(2, current_rotor_num);
		} 
		else 
		{
			var base_div = document.getElementById(current_rotor.id + "_container");
			if (current_rotor_hole >= 0) 
			{
				remove_rotor(current_rotor_hole+1, current_rotor);
				holes[current_rotor_hole].set_rotor(0);
			}
			else
			{
				current_rotor.style.left = base_div.style.left;
				current_rotor.style.top = base_div.style.top;
			}
		}

		current_rotor = null;
		document.body.onmousemove = null;
		document.body.onmouseup = null;
		check_phase_two(); 
	}
}

/*
 * 		Funzione richiamata durante il movimento del rotore
 */
function move(e)
{	
	 mouse_x = document.all ? window.event.clientX : e.pageX;
     mouse_y = document.all ? window.event.clientY : e.pageY;
     	
     if(current_rotor != null)
     {	
     	if (mouse_x <= 220) mouse_x = 200;
     	if (mouse_y <= 65) mouse_y = 60;
     	
     	current_rotor.style.left = (mouse_x - rotor_x) + "px";
     	current_rotor.style.top = (mouse_y - rotor_y) + "px";
     }
}

/*
 * 		Ottiene il numero del rotore a seconda del nome dell'id del div
 */
function get_rotor_number(rotor)
{
	var str = rotor.id;
	
	return str.slice(-1);
}

/*
 * 		Inizializza il drag and drop
 */
function move_rotor(rotor)
{
	current_rotor = rotor;
	current_rotor_num = get_rotor_number(current_rotor);
	
	for (var i = 0; i < 3; i++)
	{
		var num = holes[i].get_rotor();
		if (num == current_rotor_num)
		{
			current_rotor_hole = i;
		}	
	}
	
	rotor_x = mouse_x - current_rotor.offsetLeft;
    rotor_y = mouse_y - current_rotor.offsetTop;

	document.body.onmousemove = move;
	document.body.onmouseup = stop;
}