/*
 * 		utility.js
 * 		Contiene alcune funzioni di utilità
 */

/*
 * 		Riconosce la pressione del tasto sinistro del mouse
 */
function detect_left_button(e) {
	e = e || window.event;
	var button = e.which || e.button;
	return button == 1;
}

/*
 * 		Dato un carattere restituisce un numero
 */
function key_to_number(key) {
	return (key.charCodeAt(0) - 65);
}

/*
 * 		Restituisce l'indice corrispondente ad un determinato tasto
 */
function get_index(key) {
	return key.charCodeAt() - 65;
}

/*
 * 		Restituisce il numero corrispondente ad un carattere
 */
function get_number(key) {
	return parseInt(key, 10);
}
