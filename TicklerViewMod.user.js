// ==UserScript==
// @name        Tickler View Completed
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     */ticklerDemoMain.jsp?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			23.02.12.0
// ==/UserScript==

//changelog
//23.02.12.0: changed to quipo: Create Report button jquery changed


//wait window load first

window.addEventListener('load', function() {

  var compBut = document.createElement('input');
  compBut.type = 'button';
  compBut.id = 'compBut'
  compBut.name = 'compBut'
  compBut.value = 'COMPLETED'
  compBut.onclick = compButFunc
  compBut.setAttribute('style', 'width:80px;font-size:12px;padding:0px;position:fixed;top:10px;right:10; background-color:cyan;');
	document.body.appendChild(compBut);

  //--------- select the textbox area so I can start typing immediately
  var textBox = $('textarea[name="textarea"]')
  textBox.select()
}, false);




document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;


  switch(true){
      //Acknowledge  button
    case theAltKey && theKey==='1':
      compButFunc()
			break;

    default:
      break;
  }


}, true);


function compButFunc(){
  var selectList = $('[name="ticklerview"]')[0]
  selectList.value = "C"
  var reportBut = $('input[value*="Report"]')[0]
  reportBut.click()

}

