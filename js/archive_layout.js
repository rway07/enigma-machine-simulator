/*
 * 		Distrugge il contenuto della pagina e genera il layout per la visualizzazione dei messaggi
 */
function show_archive()
{
	destroy_content();
	create_archive_layout();
}

/*
 * 		Genera il layout per la visualizzazioen dei messaggi
 */
function create_archive_layout()
{
	var content = create_content();
	var h1 = document.createElement('h1');
	var title = document.createTextNode("View messages archive");
	h1.className = "left_bar_text";
	content.appendChild(h1);
	h1.appendChild(title);

}
