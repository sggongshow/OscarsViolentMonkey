// ==UserScript==
// @name        Cortico Shifter
// @namespace   GongOscar
// @description Various navigation buttons for echart screen.  Set your own specific fid (form number) or Measurement groupName
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version			22.06.06.0
// ==/UserScript==

var checkCort  // make the Cortico Box available globally

var observer = new MutationObserver(function (event) { 
  
  var boxCort = checkCort[0] //Get the actuall Element for the Cortico Icon
  var boxCortClass = boxCort.className //get the class information for Cortico Icon
  
  if (boxCortClass.includes("tw-left-5")==false){ //check if it has already been corrected
    setTimeout(function(){ changeLocation(); }, 400)
  }
})

function main(){
  //Get Cortico Icon Element
  checkCort = $('[class*=cortico-widget-body][class*=tw-fixed][class*=tw-text-white]') 
  
  console.log(checkCort)
  if (checkCort.length>0){ 
    main3()
  }
  
}

function changeLocation(){

  //Get Cortico Icon Array
  checkCort = $('[class*=cortico-widget-body][class*=tw-fixed][class*=tw-text-white]')
  var boxCort = checkCort[0] //Get the actual Cortico Element
  var boxCortClass = boxCort.className //Get th Cortico Element class name
  //Change from right align to left aligh
  var boxCortArr = boxCortClass.split('tw-right') 
  var newClass = boxCortArr[0] + 'tw-left' + boxCortArr[1]
  //Set class to new information and style to custom style 
  boxCort.setAttribute('class',newClass)
  boxCort["style"]= "z-index:1;position:fixed;bottom:60px;left:20px"

}

function main3(){
  
  changeLocation()
  
  // Observe Mutation of Cortico Icon Element focused on class
  observer.observe(checkCort[0], {
    attributes: true, 
    attributeFilter: ['class'],
    childList: false, 
    characterData: false
  })
    
}


window.addEventListener('load', function() {
  setTimeout(function(){ main(); }, 5000)
  //waitForNote()

}, false);
