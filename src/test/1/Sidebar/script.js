/*Handle requests from background.html*/
function handleRequest(
	//The object data with the request params
	request,
	//These last two ones isn't important for this example, if you want know more about it visit: http://code.google.com/chrome/extensions/messaging.html
	sender, sendResponse
	) {
	if (request.callFunction == "toggleSidebar")
		toggleSidebar();
}
chrome.extension.onRequest.addListener(handleRequest);

/*Small function wich create a sidebar(just to illustrate my point)*/
var sidebarOpen = false;
var sidebarExists = false;

/*  Insert Div */
function toggleSidebar() {
console.log('Hey-hey, im DIV');
	if(sidebarOpen) {
		var el = document.getElementById('mySidebar');
		el.parentNode.removeChild(el);
		document.body.style.margin = "0px 0px 0px 0px"
		sidebarOpen = false;
	}
	else {
		var sidebar = document.createElement('div');
		sidebar.id = "mySidebar";
		sidebar.innerHTML = "\
			<h1>Hello</h1>\
			World!\
		";
		sidebar.style.cssText = "\
			position:fixed;\
			top:0px;\
			width:200px;\
			height:100%;\
			background:white;\
			box-shadow:inset 0 0 1em black;\
			z-index:999999;\
		";
		document.body.style.margin = "0px 200px 0px 0px"
		document.body.appendChild(sidebar);
		sidebarOpen = true;

		if (!sidebarExists) {
			setTimeout(slideSidebar, 50);
		} else {
			slideSidebar();
		}
		sidebarExists = true;
	}
}
/**/
//insert iFrame
/*
function toggleSidebar() {
console.log('Hey-hey, i'm DIV');
	if(sidebarOpen) {
		document.getElementById('mySidebar').style.width="0px"
		//var el = document.getElementById('mySidebar');
		//el.parentNode.removeChild(el);
		document.body.style.margin = "0px 0px 0px 0px"
		sidebarOpen = false;
	}
	else {
		var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
		if (!location.ancestorOrigins.contains(extensionOrigin)) {

			if (!sidebarExists) {
				var sidebar = document.createElement('iframe');
				sidebar.src = chrome.runtime.getURL('frame.html');
				sidebar.id = "mySidebar";
				sidebar.style.cssText= "position:fixed;top:0;width:0px;height:100%;z-index:1000;";
				document.body.appendChild(sidebar);
			}

			sidebarOpen = true;
		}


		if (!sidebarExists) {
			setTimeout(slideSidebar, 50);
		} else {
			slideSidebar();
		}
		sidebarExists = true;
	}
}*/

function slideSidebar() {
	document.body.style.webkitTransition = "margin 500ms";
	document.getElementById('mySidebar').style.webkitTransition = "width 500ms";

	document.body.style.margin = "0px 300px 0px 0px";
	document.getElementById('mySidebar').style.width = "300px";
}