// ==UserScript==
// @name        Billing Code Conversion
// @namespace   GongOscar
// @description Constant EForm Submit and Print button locations
// @include     *billing.do?billRegion*
// @include     *billingBC.jsp?*
// @include     *CreateBilling.*
// @include     */oscar/CaseManagementEntry.do*
// @include     *SaveBilling.do?*
// @include     *formwcb.do?*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version 	  22.05.17.2
// ==/UserScript==


//wait window load first
window.addEventListener('load', function() {
  
   setTimeout(function(){ main(); }, 250);
  
}, false);


function main(){

  var codeList = $('a[href*=myFunction][onclick*=PickD]')
  console.log(codeList)

	for (let i = 0; i < codeList.length; i++) {
  	
    var title = codeList[i].title
    var dxCode = codeList[i].text.trim()

    codeList[i].text = "- " + title + dxCode
		codeList[i].title = dxCode
	}

  
  

}
