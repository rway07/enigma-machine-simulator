var letter = new Array(3);

function phase_two_done()
{
	for (var i = 0; i < 3; i++)
	{
		machine.set_rotor_letter(i, letter[i]);
	}
}

function reset_phase_two_var()
{
	for (var i = 0; i < 3; i++)
	{
		letter[i] = 0;
	}
}

function create_rotors_letter_conf_layout(parent)
{
	var rotors_base = document.createElement("div");
	rotors_base.id = "rotors_letter_base";
	parent.appendChild(rotors_base);
	
	var arrow_up = new Array(3);
	var arrow_down = new Array(3);
	var num = new Array(3);
	var text = new Array(3);
	
	for (var i = 0; i < 3; i++)
	{
		arrow_up[i] = document.createElement("div");
		arrow_up[i].id = "rotor_letter_up_" + (i+1);
		arrow_up[i].setAttribute("onclick","arrow_up_handler(" + i + ")");
		arrow_up[i].setAttribute("onmousedown","arrow_up_press(" + (i+1) + ")");
		arrow_up[i].setAttribute("onmouseup","arrow_up_release(" + (i+1) + ")");
		rotors_base.appendChild(arrow_up[i]);
	}
	
	for (var i = 0; i < 3; i++)
	{
		num[i] = document.createElement("div");
		num[i].id = "rotor_letter_" + (i+1);
		rotors_base.appendChild(num[i]);
		text[i] = document.createElement("h2");
		text[i].id = "text_" + (i+1);
		text[i].setAttribute("class","letter_text");
		text[i].appendChild(document.createTextNode(letter[i]));
		num[i].appendChild(text[i]);
			
	}
	
	for (var i = 0; i < 3; i++)
	{
		arrow_down[i] = document.createElement("div");
		arrow_down[i].id = "rotor_letter_down_" + (i+1);
		arrow_down[i].setAttribute("onclick","arrow_down_handler(" + i + ")");
		arrow_down[i].setAttribute("onmousedown","arrow_down_press(" + (i+1) + ")");
		arrow_down[i].setAttribute("onmouseup","arrow_down_release(" + (i+1) + ")");
		rotors_base.appendChild(arrow_down[i]);
	}
}

/*
 * 		Crea il layout per la fase 2
 */
function create_phase_two_layout()
{
	phase_one_done();
	phase = 2;
	destroy_content();

	var content = create_content();
	var istr_div = document.createElement('div');
	var conf_div = document.createElement('div');
	var title = document.createElement('h2');
	var text = document.createTextNode("Phase 2: Ringstellung");
	
	istr_div.id = "istructions_div";
	conf_div.id = "configuration_div"; 
	content.appendChild(istr_div);
	content.appendChild(conf_div);
	
	istr_div.appendChild(title);
	title.appendChild(text);
	
	get_phase_data(istr_div, 2);
	reset_phase_two_var();
	create_rotors_letter_conf_layout(conf_div);
	locate_phase_two_elements();
}

function locate_phase_two_elements()
{
	var parent = document.getElementById("configuration_div");
	var child = document.getElementById("rotors_letter_base");
	
	var width = parent.offsetWidth;
	var margin = ((width - 400) / 2);
		
	if (document.getElementById('content').offsetWidth <= 400) 
	{
		margin = 0;
	}
	
	child.setAttribute("style", "margin-left: " + margin + "px");
}

function change_letter(i, num)
{
	var ele = document.getElementById("text_" + i);
	var parent = document.getElementById("rotor_letter_" + i);
	parent.removeChild(ele);
	ele = document.createElement("h2");
	ele.id = "text_" + i;
	ele.setAttribute("class","letter_text");
	parent.appendChild(ele);
	ele.appendChild(document.createTextNode(num));
}

function arrow_up_handler(i)
{
	letter[i] = (letter[i] + 1) % 26;
	change_letter(i+1, letter[i]);
}

function arrow_up_press(i)
{
	document.getElementById("rotor_letter_up_" + i).setAttribute("style","background: url(../images/letter_up_red.png)");
}

function arrow_up_release(i)
{
	document.getElementById("rotor_letter_up_" + i).setAttribute("style","background: url(../images/letter_up.png)");
}

function arrow_down_handler(i)
{
	letter[i] = ((letter[i] - 1) < 0) ? 25 : letter[i] - 1;
	change_letter(i+1, letter[i]);
}

function arrow_down_press(i)
{
	document.getElementById("rotor_letter_down_" + i).setAttribute("style","background: url(../images/letter_down_red.png)");	
}

function arrow_down_release(i)
{
	document.getElementById("rotor_letter_down_" + i).setAttribute("style","background: url(../images/letter_down.png)");	
}
