// ==UserScript==
// @name        Billing Keyboard Shortcut
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     *billing.do?billRegion*
// @include     *CreateBilling.d*
// @include     *billingBC.jsp?*
// @include     *billingDigNewSearch.jsp?*
// @include     */oscar/CaseManagementEntry.do*
// @include     *SaveBilling.do?*
// @include     *formwcb.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    22.05.17.2
// ==/UserScript==


//wait window load first
window.addEventListener('load', function() {
  var textBox = $('textarea[name="textarea"]')
  textBox.select()  
}, false);


document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
  
  
  switch(true){
      //Confirm  button
    case theAltKey && theKey==='1': 
      var subButton = $('input[type="submit"][value="Continue"][name="Submit"]') 
      console.log(subButton)
      
      if (subButton.attr("value")==null){
        subButton = $('input[type="submit"][value*="Save"][value*="Bill"][name="submit"]')
      }
      if (subButton.attr("value")==null){
        subButton = $('input[type="submit"][value="Confirm"][name="update"]')
      }
      
      //console.log(subButton.attr("value"))
      subButton.click()
			break;
      
    default:
      break; 
  }
  
  
}, true);

