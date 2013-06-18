/*
* 		phase_3.js
* 		Gestisce la fase 3 della configurazione della macchina Enigma
*/
// Variabili globali
var switches = new Array(26);
var exclusion = new Array(20);
var color = null;
var current_color = 0;
var current_index = 0;
var first = "";
var second = "";

/*
 * 	Disegna una spina
 */
function create_plug(parent, class_name, key, i) {
	var plug = document.createElement('div');
	var space = document.createElement('div');
	var img = document.createElement('img');

	space.className = class_name;
	plug.className = class_name;

	if ((i === 0) && (key == "A")) {
		plug.setAttribute('style', 'margin-left: 52px');
	} else if (i === 0) {
		plug.setAttribute('style', 'margin-left: 34px');
	} else if (key == "K") {
		plug.setAttribute("style", "margin-right: 34px");
	}
	parent.appendChild(plug);
	img.id = "plug_" + key;
	img.setAttribute('src', 'images/plugs/plug.png');
	img.setAttribute('alt', key.toLowerCase() + '_plug');
	img.setAttribute("onclick", 'plug_handler("' + key + '");');
	plug.appendChild(img);
}

/*
 * 	Crea il layout delle spine
 */
function create_plugs_layout(parent) {
	var plugs = document.createElement('div');
	plugs.id = "plugs";

	parent.appendChild(plugs);
	var keys = new Array("Q", "W", "E", "R", "T", "Z", "U", "I", "O");
	for (var i = 0; i < 9; i++) {
		create_plug(plugs, "plug_place_top", keys[i], i);
	}

	keys = ["A", "S", "D", "F", "G", "H", "J", "K"];
	for ( i = 0; i < 8; i++) {
		create_plug(plugs, "plug_place", keys[i], i);
	}

	keys = ["P", "Y", "X", "C", "V", "B", "N", "M", "L"];
	for ( i = 0; i < 9; i++) {
		create_plug(plugs, "plug_place", keys[i], i);
	}
}

/*
 * 		Reset delle variabili riguardanti la fase 3
 */
function reset_phase_3_var() {
	for (var i = 0; i < 26; i++) {
		switches[i] = i;
		if (i < 20) {
			exclusion[i] = "";
		}
	}

	color = null;
	current_color = 0;
	current_index = 0;
	first = "";
	second = "";

	color = new Array("red", "yellow", "blue", "green", "purple", "orange", "brown", "gray", "cyan", "white");
}

/*
 * 		Passaggio dalla fase 2 alla fase 3
 */
function create_phase_3_layout() {
	phase_2_done();
	phase = 3;
	destroy_content();

	var content = create_content();
	var istr_div = document.createElement('div');
	var conf_div = document.createElement('div');
	var title = document.createElement('h2');
	var text = document.createTextNode("Phase 3: Steckerverbindungen");

	istr_div.id = "istructions_div";
	conf_div.id = "configuration_div";
	content.appendChild(istr_div);
	content.appendChild(conf_div);

	istr_div.appendChild(title);
	title.appendChild(text);

	get_phase_data(istr_div, 3);

	reset_phase_3_var();
	create_plugs_layout(conf_div);
	locate_phase_3_elements();
	update_status_bar("Select the letters you want to switch, for a maximum of 10");
}

/*
 * 		Posiziona gli elementi della fase 3
 */
function locate_phase_3_elements() {
	var parent = document.getElementById("configuration_div");
	var child = document.getElementById("plugs");

	var width = parent.offsetWidth;
	var margin = ((width - 400) / 2);

	if (document.getElementById('content').offsetWidth <= 400) {
		margin = 0;
	}

	child.setAttribute("style", "margin-left: " + margin + "px");
}

/*
 * 		Controlla se la spina è già stata selezionata
 */
function check_exclusion(key) {
	for (var i = 0; i < switches.length; i++) {
		if (exclusion[i] == key) {
			return false;
		}
	}

	return true;
}

/*
 * 		Aggiunge la spina alla lista di quelle già selezionate
 */
function add_exclusion(key) {
	exclusion[current_index] = key;
	current_index++;
}

/*
 * 		Gestisce l'evento onClick sulle spine
 */
function plug_handler(key) {
	if ((current_color <= 9) && (check_exclusion(key))) {
		var img = document.getElementById("plug_" + key);

		img.setAttribute("src", "images/plugs/plug_" + color[current_color] + ".png");
		if (first === "") {
			first = key;
		} else {
			if (key == first) {
				first = "";
				img.setAttribute("src", "images/plugs/plug.png");
			} else {
				second = key;
			}
		}

		if (second !== "") {
			current_color++;
			switches[get_index(first)] = get_index(second);
			add_exclusion(first);
			add_exclusion(second);
			first = "";
			second = "";
		}
	}
}

/*
 * 		Aggiorna la configurazione delle spine e
 * 		ricalcola i caratteri cifrati solo alla fine della configurazione
 */
function commit_configuration() {
	for (var i = 0; i < 26; i++) {
		machine.set_plug(i, switches[i]);
	}

	machine.precalculate_keys();
}

/*
 * 		Passaggio dalla fase 3 all'uso della macchina
 */
function use_machine() {
	commit_configuration();
	show_machine();
}
