/*
* 		phase_1.js
* 		Gestise la fase 1 della configurazione della macchina Enigma
*/

// Variabili globali
var mouse_x = 0;
var mouse_y = 0;
var rotor_x = 0;
var rotor_y = 0;
var current_rotor = null;
var current_rotor_num = 0;
var current_rotor_hole = -1;
var holes = new Array(3);
var in_hole = false;
var margin_top_min = 0;
var margin_top_max = 0;
var margin_1_left_min = 0;
var margin_1_left_max = 0;
var margin_2_left_min = 0;
var margin_2_left_max = 0;
var margin_3_left_min = 0;
var margin_3_left_max = 0;

/*
 * 		Oggetto che rappresenta uno degli alloggiamenti dei rotori
 */
function hole() {
	this.rotor = 0;
}

/*
 * 		Settaggio rotore numero num nell'alloggiamento
 */
hole.prototype.set_rotor = function(num) {
	this.rotor = num;
}
/*
 * 		Ottiene il numero del rotore nell'alloggiamento
 */
hole.prototype.get_rotor = function() {
	return this.rotor;
}
/*
 * 		Aggiorna le coordinate degli alloggiamenti dei rotori
 */
function update_holes_coords() {
	var hole_1 = document.getElementById("rotor_hole_1");
	margin_top_min = getOffset(hole_1).top;
	margin_top_max = margin_top_min + 110;
	margin_1_left_min = getOffset(hole_1).left;
	margin_1_left_max = margin_1_left_min + 50;
	margin_2_left_min = margin_1_left_max;
	margin_2_left_max = margin_2_left_min + 50;
	margin_3_left_min = margin_2_left_max;
	margin_3_left_max = margin_3_left_min + 50;
}

/*
 * 		Reset delle variabili riguardanti la fase 1 della configurazione
 */
function reset_phase_1_var() {
	phase = 1;
	mouse_x = 0;
	mouse_y = 0;
	rotor_x = 0;
	rotor_y = 0;
	current_rotor = null;
	current_rotor_num = 0;
	current_rotor_hole = -1;

	for (var i = 0; i < 5; i++) {
		holes[i] = new hole();
		holes[i].set_rotor(0);
	}
}

/*
 * 		Gestore dell'evento onMouseOver sull'alloggimanto del rotore
 */
function hole_mouse_over(obj) {
	obj.setAttribute("style", "background: green;");
}

/*
 * 		Gestore dell'evento onMouseOut sull'alloggimento del rotore
 */
function hole_mouse_out(obj) {
	obj.setAttribute("style", "background: white;");
}

/*
 * 		Controlla se il mouse si trova alle coordinate dell'alloggiamento indicato
 */
function check_position(l_min, l_max, t_min, t_max) {
	if (((mouse_x >= l_min) && (mouse_x <= l_max)) && ((mouse_y >= t_min) && (mouse_y <= t_max))) {
		return true;
	}

	return false;
}

/*
 * 		Crea il layout di configurazione dei rotori
 */
function create_rotors_hole_layout(parent) {
	var rotors_hole = document.createElement('div');
	var rotor_hole = new Array(3);
	rotors_hole.id = "rotors_hole";
	parent.appendChild(rotors_hole);

	for (var i = 0; i < 3; i++) {
		rotor_hole[i] = document.createElement("div");
		rotor_hole[i].id = "rotor_hole_" + (i + 1);
		rotor_hole[i].className = "rotor_hole";
		rotors_hole.appendChild(rotor_hole[i]);
	}
}

/*
 * 		Crea il layout per il contenitore dei rotori
 */
function create_rotors_container_layout(parent) {
	var j = 0;
	var rotors_container = document.createElement('div');
	var rotor_cont = new Array(5);
	var rotor = new Array(5);
	rotors_container.id = "rotors_container";
	parent.appendChild(rotors_container);

	for (var i = 0; i < 5; i++) {
		j = i + 1;
		rotor_cont[i] = document.createElement("div");
		rotor_cont[i].id = "rotor_container_" + j;
		rotor_cont[i].className = "rotor_container";
		rotors_container.appendChild(rotor_cont[i]);
		rotor[i] = document.createElement("div");
		rotor[i].id = "rotor_" + j;
		rotor[i].className = "rotor";
		rotor[i].setAttribute("onmousedown", "move_rotor(event, this);");
		rotor_cont[i].appendChild(rotor[i]);
	}
}

/*
 * 		Crea il layout di configurazione dei rotori
 */
function create_rotors_conf_layout(parent) {
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
function show_configuration() {
	destroy_content();
	create_configuration_layout();
	locate_phase_1_elements();
	update_status_bar("Place the rotors in the holes at the center of the page, following the order reported in the istructions, if you want...");
}

/*
 * 		Genera il layout della pagina di configurazione
 */
function create_configuration_layout() {
	var content = create_content();
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

	reset_phase_1_var();
	content.onscroll = update_holes_coords;
}

/*
 * 		Posiziona gli elementi della pagina a seconda della dimensione della finestra
 */
function locate_phase_1_elements() {
	var rotors_container = document.getElementById('rotors_container');
	var rotors_hole = document.getElementById('rotors_hole');
	var rotors_container_parent = document.getElementById('rotors_container_div');
	var rotors_hole_parent = document.getElementById('rotors_hole_div');

	var hole_width = rotors_hole_parent.offsetWidth;
	var container_width = rotors_container_parent.offsetWidth;
	var margin_hole = ((hole_width - 400) / 2);
	var margin_container = ((container_width - 250) / 2);

	if (document.getElementById('content').offsetWidth <= 400) {
		margin_hole = 0;
		margin_container = 125;
	}

	rotors_hole.setAttribute("style", "margin-left: " + margin_hole + "px");
	rotors_container.setAttribute("style", "margin-left: " + margin_container + "px");
	update_holes_coords();
}

/*
 * 		Aggiorna la configurazione della macchina una volta conclusa la fase 1
 */
function phase_1_done() {
	for (var i = 0; i < 3; i++) {
		machine.set_rotor(i, holes[i].get_rotor());
	}
}

/*
 * 		Controlla se la fase 1 è stata completata
 */
function check_phase_1_done() {
	for (var i = 0; i < 3; i++) {
		if (holes[i].get_rotor() === 0) {
			return false;
		}
	}

	return true;
}

/*
 * 		Crea il link per il passaggio alla fase 2
 */
function check_phase_2() {
	if (check_phase_1_done()) {
		if (document.getElementById("phase_2_link") === null) {
			create_phase_link(1);
		}
	} else {
		link = document.getElementById("phase_2_link");
		if (link !== null) {
			document.getElementById("istructions_div").removeChild(link);
		}
	}
}

/*
 * 		Posiziona il rotore nell'alloggiamento indicato
 */
function place_rotor(rotor, place) {
	var parent = rotor.parentNode;
	var new_rotor = document.createElement("div");

	parent.removeChild(rotor);
	new_rotor.id = rotor.id;
	new_rotor.className = rotor.className;
	new_rotor.setAttribute("onmousedown", "move_rotor(event, this);")
	document.getElementById("rotor_hole_" + place).appendChild(new_rotor);
}

/*
 * 		Rimuove il rotore dall'alloggiamento indicato
 */
function remove_rotor(rotor) {
	var parent = rotor.parentNode;
	var new_rotor = document.createElement("div");
	var container_number = get_last_char(rotor.id);
	parent.removeChild(rotor);
	new_rotor.id = current_rotor.id;
	new_rotor.className = current_rotor.className;
	new_rotor.setAttribute("onmousedown", "move_rotor(event, this);");
	document.getElementById("rotor_container_" + container_number).appendChild(new_rotor);
}

/*
 * 		Controlla se il rotore passato come parametro Ã¨ presente in un altro alloggiamento
 * 		e lo posiziona in quello indicato
 */
function check_hole(hole, rotor_num) {
	for (var i = 0; i < 3; i++) {
		if (holes[i].get_rotor() == rotor_num) {
			holes[i].set_rotor(0);
		}
	}

	holes[hole].set_rotor(rotor_num);
}

/*
 * 		Restituisce l'offset corrente dell'elemento passato come parametro
 * 		a seconda delle dimensioni della finestra e dalla posizione della scroll bar
 */
function getOffset(el) {
	var _x = 0;
	var _y = 0;
	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return {
		top : _y,
		left : _x
	};
}

/*
 * 		Funzione richimamata nell'evento mouseUp durante il trascinamento del rotore
 */
function stop() {
	if (current_rotor !== null) {
		var parent = current_rotor.parentNode;

		if (((mouse_x >= margin_1_left_min) && (mouse_x <= margin_1_left_max)) && ((mouse_y >= margin_top_min) && (mouse_y <= margin_top_max)) && holes[0].get_rotor() === 0) {
			place_rotor(current_rotor, 1);
			check_hole(0, current_rotor_num);
			hole_mouse_out(document.getElementById("rotor_hole_1"));
		} else if (((mouse_x >= margin_2_left_min) && (mouse_x <= margin_2_left_max)) && ((mouse_y >= margin_top_min) && (mouse_y <= margin_top_max)) && holes[1].get_rotor() === 0) {
			place_rotor(current_rotor, 2);
			check_hole(1, current_rotor_num);
			hole_mouse_out(document.getElementById("rotor_hole_2"));
		} else if (((mouse_x >= margin_3_left_min) && (mouse_x <= margin_3_left_max)) && ((mouse_y >= margin_top_min) && (mouse_y <= margin_top_max)) && holes[2].get_rotor() === 0) {
			place_rotor(current_rotor, 3);
			check_hole(2, current_rotor_num);
			hole_mouse_out(document.getElementById("rotor_hole_3"));
		} else {
			if (current_rotor_hole >= 0) {
				remove_rotor(current_rotor);
				holes[current_rotor_hole].set_rotor(0);
			} else {
				var new_rotor = document.createElement("div");
				parent.removeChild(current_rotor);
				new_rotor.id = current_rotor.id;
				new_rotor.className = current_rotor.className;
				new_rotor.setAttribute("onmousedown", "move_rotor(event, this);")
				parent.appendChild(new_rotor);

			}

			hole_mouse_out(document.getElementById("rotor_hole_1"));
			hole_mouse_out(document.getElementById("rotor_hole_2"));
			hole_mouse_out(document.getElementById("rotor_hole_3"));
		}

		var content = document.getElementById("content");
		content.onmousemove = null;
		content.onmouseup = null;
		current_rotor = null;
		check_phase_2();
	}
}

/*
 * 		Funzione richiamata durante il movimento del rotore
 */
function move(e) {
	mouse_x = document.all ? window.event.clientX : e.pageX;
	mouse_y = document.all ? window.event.clientY : e.pageY;

	if (current_rotor !== null) {
		if (mouse_x <= 220) {
			mouse_x = 200;
		}
		if (mouse_y <= 65) {
			mouse_y = 60;
		}

		if (check_position(margin_1_left_min, margin_1_left_max, margin_top_min, margin_top_max)) {
			hole_mouse_over(document.getElementById("rotor_hole_1"));
			hole_mouse_out(document.getElementById("rotor_hole_2"));
			hole_mouse_out(document.getElementById("rotor_hole_3"));
			in_hole = true;
		} else if (check_position(margin_2_left_min, margin_2_left_max, margin_top_min, margin_top_max)) {
			hole_mouse_over(document.getElementById("rotor_hole_2"));
			hole_mouse_out(document.getElementById("rotor_hole_1"));
			hole_mouse_out(document.getElementById("rotor_hole_3"));
			in_hole = true;
		} else if (check_position(margin_3_left_min, margin_3_left_max, margin_top_min, margin_top_max)) {
			hole_mouse_over(document.getElementById("rotor_hole_3"));
			hole_mouse_out(document.getElementById("rotor_hole_1"));
			hole_mouse_out(document.getElementById("rotor_hole_2"));
			in_hole = true;
		} else {
			if (in_hole === true) {
				hole_mouse_out(document.getElementById("rotor_hole_1"));
				hole_mouse_out(document.getElementById("rotor_hole_2"));
				hole_mouse_out(document.getElementById("rotor_hole_3"));
			}
		}

		current_rotor.style.left = (mouse_x - rotor_x) + "px";
		current_rotor.style.top = (mouse_y - rotor_y) + "px";
	}
}

/*
 * 		Ottiene il numero del rotore a seconda del nome dell'id del div
 */
function get_rotor_number(rotor) {
	var str = rotor.id;

	return str.slice(-1);
}

/*
 * 		Inizializza il drag and drop
 */
function move_rotor(e, rotor) {
	if (detect_left_button(e)) {
		current_rotor = rotor;
		current_rotor_num = get_rotor_number(current_rotor);
		current_rotor_hole = -1;

		for (var i = 0; i < 3; i++) {
			var num = holes[i].get_rotor();
			if (num == current_rotor_num) {
				current_rotor_hole = i;
			}
		}

		mouse_x = document.all ? window.event.clientX : e.pageX;
		mouse_y = document.all ? window.event.clientY : e.pageY; 
		rotor_x = mouse_x - current_rotor.offsetLeft;
		rotor_y = mouse_y - current_rotor.offsetTop;

		
		var content = document.getElementById("content");
		content.onmousemove = move;
		content.onmouseup = stop;
	}
}