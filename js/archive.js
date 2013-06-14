function create_table(parent, data)
{
	var table = document.createElement("table");
	table.id = "messages_table";
	//table.setAttribute("border","1");
	table.setAttribute("align","center");
	var title = new Array("DATE","CLEAR MESSAGE","CRYPTED MESSAGE","DECRYPTED MESSAGE SERVER","DECRYPTED MESSAGE CLIENT");
	var rows_number = get_number(data[0]) + 1;
	var rows = new Array(rows_number);
	var elements = new Array(rows_number * 5);
	var j = 0;
	var data_index = 1;
	
	for (var i = 0; i < rows_number; i++)
	{
		rows[i] = document.createElement("tr");
		for (var k = 0; k < 5; k++)
		{
			elements[j] = document.createElement("td");
			
			if (i == 0)
			{
				elements[j].appendChild(document.createTextNode(title[k]));
				rows[i].appendChild(elements[j]);
			} 
			else
			{
				elements[j].appendChild(document.createTextNode(data[data_index]));
				rows[i].appendChild(elements[j]);
				data_index++;
			}
			j++;
		}	
		
		table.appendChild(rows[i]);
	}
	
	parent.appendChild(table);
}

function locate_table()
{
	var table = document.getElementById("messages_table");
	var table_width = table.offsetWidth;
	var content_width = document.getElementById("content").offsetWidth;
	var current_margin = ((content_width - table_width) / 2);
	
	if (content_width <= table_width) current_margin = 0;
	
	table.setAttribute("style", "margin-left: " + current_margin + "px");
}

function get_messages(parent)
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
       		var elements = data.split("_");
       		create_table(parent, elements);
       	}
  	}
	xmlhttp.open("GET","archive.php", true);
	xmlhttp.send();
}

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
	var table_div = document.createElement("h5");
	get_messages(table_div);
	content.appendChild(table_div);
}
