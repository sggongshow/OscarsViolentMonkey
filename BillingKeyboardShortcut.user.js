// ==UserScript==
// @name        Billing Keyboard Shortcut
// @namespace   GongOscar
// @description Add shortcut key to Billing. Also allow for service code contracts hours to auto populate
// @include     *billing.do?billRegion*
// @include     *CreateBilling.d*
// @include     *billingBC.jsp?*
// @include     *billingDigNewSearch.jsp?*
// @include     */oscar/CaseManagementEntry.do*
// @include     *SaveBilling.do?*
// @include     *formwcb.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version	    23.01.23.0
// ==/UserScript==

//23.01.23.0: added contracted hours shift codes to auto populate (97570) the start and end times

//wait window load first

var BillingCodeArray

window.addEventListener('load', function() {
  var textBox = $('textarea[name="textarea"]')
  textBox.select()
  BillingCodeArray = $("[id*='billing']").filter("[id$='fee']")
  //console.log(BillingCodeArray)
}, false);


document.addEventListener('keydown', function(theEvent) {
	var theKey = theEvent.key
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;


  switch(true){
      //Confirm  button
    case theAltKey && theKey==='1':
      //console.log("alt1 pressed")
      //console.log(BillingCodeArray.length)

      for (let element of BillingCodeArray){
        //console.log(element.value)
        if (element.value.includes("97570")){
          //console.log("97570 code found")
          autoTimeInput(element)
        }
      };




      var subButton = $('input[type="submit"][value="Continue"][name="Submit"]')
      //console.log(subButton)

      if (subButton.attr("value")==null){
        subButton = $('input[type="submit"][value*="Save"][value*="Bill"][name="submit"]')
      }
      if (subButton.attr("value")==null){
        subButton = $('input[type="submit"][value="Confirm"][name="update"]')
      }

      //console.log(subButton.attr("value"))
      //subButton.click() -temp
			break;

    default:
      break;
  }


}, true);

function autoTimeInput(serviceCodeElement){
  //console.log("autotime input")
  var serviceCodeUnitID = serviceCodeElement.id + "_unit"
  //console.log(serviceCodeUnitID)
  var serviceCodeUnitElement = $(`[${"id"}="${serviceCodeUnitID}"]`)[0];
  //var serviceCodeUnitElement = document.getElementById(serviceCodeUnitID); //does the same thing
  var hours = Number(serviceCodeUnitElement.value)/4;

  var startHour = new Date(2022, 0, 1, 9, 0, 0)
  var startHourPrint = moment(startHour).format('HH:mm')

  var endHour = moment(startHour).add(hours, 'hours')
  var endHourPrint = moment(endHour).format('HH:mm')

  $("[id='serviceStartTime']")[0].value = startHourPrint
  $("[id='serviceEndTime']")[0].value = endHourPrint

}

