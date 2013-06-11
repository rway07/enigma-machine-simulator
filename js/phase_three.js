

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
	} 
	else if (i == 0) 
	{
		plug.setAttribute('style','margin-left: 34px');
	} 
	else if (key == "K")
	{
		plug.setAttribute("style","margin-right: 34px");
	}
	parent.appendChild(plug);
	img.setAttribute('src','images/keys/plug.png');
	img.setAttribute('alt',key.toLowerCase() + '_plug');
	plug.appendChild(img);
	
	//if (i != 8) parent.appendChild(space);
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
 * 		Passaggio dalla fase 2 alla fase 3
 */
function create_phase_three_layout()
{
	phase_two_done();
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
	
	//reset_phase_two_var();
	create_plugs_layout(conf_div);
	locate_phase_three_elements();
}

/*
 * 		Posiziona gli elementi della fase 3
 */
function locate_phase_three_elements()
{
	var parent = document.getElementById("configuration_div");
	var child = document.getElementById("plugs");
	
	var width = parent.offsetWidth;
	var margin = ((width - 400) / 2);
		
	if (document.getElementById('content').offsetWidth <= 400) 
	{
		margin = 0;
	}
	
	child.setAttribute("style", "margin-left: " + margin + "px");
}