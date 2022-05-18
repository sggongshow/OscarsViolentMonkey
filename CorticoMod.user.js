// ==UserScript==
// @name        Cortico Shifter
// @namespace   GongOscar
// @description Various navigation buttons for echart screen.  Set your own specific fid (form number) or Measurement groupName
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			22.05.17.5
// ==/UserScript==

function main(){
	console.log("CHECK CORTICO Relocation")
  var checkCort = $('[class*=tw-bg-indigo-60][class*=tw-transition-colors][class*=hover]')
  //console.log(checkCort)
  if (checkCort.length>0){
    //console.log(checkCort)
    //console.log("checkCort")
   	main2(checkCort) 
  }
  
}

function main2(checkCort){

  var boxCort = checkCort[0].parentElement
  var boxCortClass = boxCort.className
  var boxCortArr = boxCortClass.split('tw-right')
  var newClass = boxCortArr[0] + 'tw-left' + boxCortArr[1]
  boxCort.setAttribute('class',newClass)
  boxCort["style"]= "z-index:1;position:fixed;bottom:60px;left:20px;"

}




window.addEventListener('load', function() {
  setTimeout(function(){ main(); }, 5000)
  //waitForNote()


}, false);
