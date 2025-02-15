/*
 * 		archive.js
 * 		Gestisce il recupero e la visualizzazione dei messaggi inviati al server
 */
/*
 * 		Distrugge il contenuto della pagina e genera il layout per la visualizzazione dei messaggi
 */
function show_archive() {
	destroy_content();
	create_archive_layout();
}

/*
 * 		Genera il layout per la visualizzazioen dei messaggi
 */
function create_archive_layout() {
	var content = create_content();
	var title_text = document.createElement('h1');
	var title = document.createTextNode("View messages archive");
	var table_div = document.createElement("div");
	title_text.className = "left_bar_text";
	content.appendChild(title_text);
	title_text.appendChild(title);

	get_messages(table_div);
	content.appendChild(table_div);
	update_status_bar("This section shows messages sent before with Enigma machine");
}

/*
 * 		Divide il testo in modo che possa essere visualizzato nelle celle della tabella
 */
function wrap_text(text) {
	var data = text.split(" ");
	var buffer = "";
	var current_len = 0;

	for (var i = 0; i < data.length; i++) {
		current_len = current_len + data[i].length;

		buffer = buffer + data[i] + " ";

		if (current_len > 20) {
			buffer = truncate_text(buffer);
			current_len = current_len - 20;
		}
	}

	return buffer;
}

/*
 * 		Aggiunge uno spazio ogni 20 caratteri al testo passato per parametro
 */
function truncate_text(text) {
	var len = text.length;
	var buffer = "";
	var start = 0;
	var end = 20;
	var step = len;

	if (len > 20) {
		while ((end <= len) && (step > 0)) {
			buffer = buffer + text.substring(start, end) + " ";
			start = end;
			step = step - 20;
			if (step <= 20) {
				end = end + step;
			} else {
				end = end + 20;
			}
		}
	}

	return buffer;
}

/*
 * 		Crea la tabella dove verranno visualizzati i messaggi
 */
function create_table(parent, data) {
	var table = document.createElement("table");
	table.id = "messages_table";
	var title = new Array("DATE", "CLEAR MESSAGE", "CRYPTED MESSAGE", "DECRYPTED MESSAGE SERVER", "DECRYPTED MESSAGE CLIENT");
	var rows_number = get_number(data[0]) + 1;
	var rows = new Array(rows_number);
	var elements = new Array(rows_number * 5);
	var j = 0;
	var data_index = 1;
	var flag = false;

	for (var i = 0; i < rows_number; i++) {
		flag = false;
		rows[i] = document.createElement("tr");
		for (var k = 0; k < 5; k++) {
			if (i === 0) {
				elements[j] = document.createElement("th");
				elements[j].appendChild(document.createTextNode(title[k]));
				rows[i].appendChild(elements[j]);
			} else {
				var string = data[data_index];

				if (k == 3) {
					if (data[data_index] != data[data_index + 1]) {
						flag = true;
					}
				}

				if (string.length > 20) {
					string = wrap_text(string);
				}
				elements[j] = document.createElement("td");
				if (flag === true) {
					elements[j].setAttribute("class", "red_td");
				}
				elements[j].appendChild(document.createTextNode(string));
				rows[i].appendChild(elements[j]);
				data_index++;
			}
			j++;
		}

		table.appendChild(rows[i]);
	}
	parent.appendChild(table);
}

/*
 * 		Riceve i messaggi dal server
 */
function get_messages(parent) {
	var xmlhttp;
	var data;

	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			data = xmlhttp.responseText;
			var elements = data.split("_");
			create_table(parent, elements);
		}
	};
	xmlhttp.open("GET", "php/archive.php?timeid=" + (Math.random() * 100000), true);
	xmlhttp.send();
}