/**
 *		help.js
 *  	Gestisce la documentazione 
 */

/*
 * 	Visualizza la documentazione dell'applicazione
 */
function show_help() {
	destroy_content();
	update_status_bar("Documentation");
	
	var content = create_content();	
	var help_div = document.createElement("div");
	
	var h2 = document.createElement("h2");
	var p1 = document.createElement("p");
	var p2 = document.createElement("p");
	var p3 = document.createElement("p");
	var p4 = document.createElement("p");
	
	h2.appendChild(document.createTextNode("Benvenuti in Enigma Machine Simulator!"));
	p1.appendChild(document.createTextNode("Questa web application permette di comporre messaggi riproducendo l'algoritmo di cifratura della macchina 		enigma (o almeno di una delle sue versioni). Nella sezione <Use Machine> è possibile utilizzare subito la macchina. Si può comporre il 		messaggio scrivendo nella textbox in fondo alla pagina o usando il mouse per premere i tasti nella riproduzione della macchina enigma. Il 		messaggio verrà poi inviato al server."));
	
	p2.appendChild(document.createTextNode("La sezione <Configuration> permette di configurare la macchina Enigma esattamente come veniva fatto nella 		Seconda Guerra Mondiale. La configurazione si compone di tre fasi: "));
	p2.appendChild(document.createElement("br"));
	p2.appendChild(document.createTextNode("1) Configurazione dei rotori: In questa fase basta trascinare i rotori negli alloggiamenti al 		centro della pagina.")); 
	p2.appendChild(document.createElement("br"));
	p2.appendChild(document.createTextNode("2) Configurazione delle lettere dei rotori: Qui si usano le freccie direzionali per cambiare la lettera 		associata al rotore. In questa fase viene visualizzato l'indice della lettera.")); 
	p2.appendChild(document.createElement("br"));
	p2.appendChild(document.createTextNode("3) Configurazione delle spine di scambio delle lettere: Selezionare due spine col mouse per impostare lo 		scambio delle lettere. E possibile impostare al massimo dieci scambi."));
	p2.appendChild(document.createElement("br"));
	p2.appendChild(document.createTextNode("Durante la guerra i Tedeschi cambiavano la configurazione della macchina ogni giorno. L'applicazione 		mostra, per ogni fase della configurazione, i settaggi del giorno. Seguire la configurazione del giorno è facoltativo."));
	
	p3.appendChild(document.createTextNode("Nella sezione <View Messages> è possibile visualizzare i messaggi inviati al server. Il messaggio verrà 		visualizzato in chiaro e in forma criptata. Verrà visualizzato inoltre il messaggio decriptato con la configurazione del client (ossia quella 		impostata dall'utente) e decriptato con la configurazione del server, che corrisponde con la configurazione del giorno. Se si è configurata 		la macchina con la configurazione del giorno, i messaggi decriptati dal client e dal server saranno identici."));
	p3.appendChild(document.createElement("br"));
	p3.appendChild(document.createTextNode("Per una spiegazione dell'algoritmo della macchina Enigma, si rimanda a Internet!!"));
	
	p4.appendChild(document.createTextNode("La sezione <Help> visualizza questo messaggio!"));
	
	help_div.appendChild(h2);
	help_div.appendChild(p1);
	help_div.appendChild(p2);
	help_div.appendChild(p3);
	help_div.appendChild(p4);
	help_div.className = "status_bar_text";
	
	content.appendChild(help_div);
}
