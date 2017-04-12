console.log('DOM Injection: bootstrapifying code');
//  Viewport tag
var viewPortTag=document.createElement('meta');
viewPortTag.id="viewport";
viewPortTag.name = "viewport";
viewPortTag.content = "width=device-width, initial-scale=1";
document.getElementsByTagName('head')[0].appendChild(viewPortTag);

//  Panel heading
var panelDivTag=document.createElement('div');
panelDivTag.className="panel panel-default";
var panelHeadingDivTag=document.createElement('div');
panelHeadingDivTag.className="panel-heading";
var headingText = document.getElementsByTagName('H1')[0];
panelHeadingDivTag.appendChild(headingText);

panelDivTag.appendChild(panelHeadingDivTag);

if (window.location.href.indexOf("main.html") !== -1)
{
	//  On Main page
	var tableObject = document.getElementsByTagName('table')[0];
	tableObject.className="table text-center";

	for (var i = 0, row; row = tableObject.rows[i]; i++)
	{
		for (var j = 0, col; col = row.cells[j]; j++)
		{
			console.log(col.childNodes);
			var buttonObject=document.createElement('button');
			buttonObject.className="btn btn-default btn-lg";
			//  new parent is buttonObject
			//  old parent is col
			while(col.childNodes.length > 0)
			{
				buttonObject.appendChild(col.childNodes[0]);
			}
			//buttonObject.appendChild(col.childNodes[0]);
			col.appendChild(buttonObject);
		}
	}

	panelDivTag.appendChild(tableObject);

}
else if (window.location.href.indexOf("scan.html") !== -1)
{
	//  On Scan Page
	var submitButton = document.getElementById('btn_submit');
	var submitButtonNew = document.createElement('button');
	submitButtonNew.type="submit";
	submitButtonNew.className = "btn btn-default";
	submitButtonNew.id = "btn_submit";
	submitButtonNew.appendChild(document.createTextNode("Submit"));
	var parentNode = submitButton.parentNode;
	parentNode.removeChild(submitButton);
	parentNode.appendChild(submitButtonNew);

	//  Success or failure messages
	var successMessage = document.getElementsByTagName('H3')[0];
	var successMessageNewNode = document.createElement('H3');
	successMessageNewNode.className = "text-center";
	var successMessageNewSpan = document.createElement('Span');
	successMessageNewSpan.className = "label label-success";
	successMessageNewSpan.id = "out_success";
	successMessageNewSpan.style.visibility = "hidden";
	successMessageNewSpan.appendChild(document.createTextNode("Success"));
	successMessageNewNode.appendChild(successMessageNewSpan);
	var successMessageParentNode = successMessage.parentNode;
	successMessageParentNode.removeChild(successMessage);
	successMessageParentNode.appendChild(successMessageNewNode);

	var failureMessage = document.getElementsByTagName('H3')[0];
	var failureMessageNewNode = document.createElement('H3');
	failureMessageNewNode.className = "text-center";
	var failureMessageNewSpan = document.createElement('Span');
	failureMessageNewSpan.className = "label label-danger";
	failureMessageNewSpan.id = "out_failure";
	failureMessageNewSpan.style.visibility = "hidden";
	failureMessageNewSpan.appendChild(document.createTextNode("Try Again"));
	failureMessageNewNode.appendChild(failureMessageNewSpan);
	var failureMessageParentNode = failureMessage.parentNode;
	failureMessageParentNode.removeChild(failureMessage);
	failureMessageParentNode.appendChild(failureMessageNewNode);
	
	
	var tableObject = document.getElementsByTagName('table')[0];
	tableObject.className="table";
	var formObject = document.getElementsByTagName('form')[0];
	panelDivTag.appendChild(formObject);
}

var panelParentNode = document.getElementsByTagName('Body')[0];
var firstChild = panelParentNode.childNodes[1];
firstChild.parentNode.insertBefore(panelDivTag, firstChild.nextSibling);

if (window.location.href.indexOf("scan.html") !== -1)
{
	//document.getElementById("txt_part").focus();
}