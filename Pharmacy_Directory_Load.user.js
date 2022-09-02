// ==UserScript==
// @name        Pharmacy Directory LoaderVersion 2
// @namespace   GongOscar
// @description Constant EForm 
// @include     *oscarRx/SelectPharmacy2.jsp*
// @require     https://code.jquery.com/jquery-3.6.0.js
// @grant       GM_addStyle
// @version     22.07.01.0
// ==/UserScript==

//alert("test")


let DataArray = []
var name
var address 
var phone
var fax
var nameBox
var addressBox
var phoneBox
var faxBox 
var iframe
var pharmacyFormObj
var PharmacyID
var test
 console.log("testv")
//GET THE DATA INITIALLY 
window.addEventListener('load', function() {
  console.log("parse csv")
  alert("Close SCRIPT if you don't want pharmacy loader to run");
  //var url = "https://raw.githubusercontent.com/sggongshow/Oscars/main/Pharmacy_List1-50.csv";
  var url = "https://raw.githubusercontent.com/sggongshow/Oscars/main/Pharmacy_List50UP.csv";
  
  var request = new XMLHttpRequest();  
  request.open("GET", url, false);   
  request.send(null);  

  DataArray = new Array();
  var jsonObject = request.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject.length; i++) {
    DataArray.push(jsonObject[i].split(','));
  }
  // Retrived data from csv file content
  console.log(DataArray);
	
  main()

}, false);

function newaddPharmacy() {

  	console.log(nameBox.value)
  	console.log(addressBox.value)
  	console.log(phoneBox.value)
  	console.log(faxBox.value)
		console.log("Newaddpharm")
  
	  var data = pharmacyFormObj.serialize();
    console.log(data)
	  $.post("/oscar/oscarRx/managePharmacy.do?method=add",
			  data, function( data ) {
				if( data.success ) {
          console.log("yes")
          //return 0
					//window.refresh();
				}
				else {
					alert("There was an error saving your Pharmacy");
				}
			},
			"json"
		);
  	
  }



function consoleLogger(text){
  console.log(text)
  //return
}

function afterLoad(){
		console.log("afterLoad Start")
  
  	var iframeOG = document.getElementById("lightwindow_iframe")
    iframe = $("#lightwindow_iframe")
    iframeOG.contentWindow.confirm= function(){ return true;}

    
  	console.log("test")
		nameBox = iframe.contents().find('#pharmacyName')[0]
    addressBox = iframe.contents().find('#pharmacyAddress')[0]
  	phoneBox = iframe.contents().find("#pharmacyPhone1")[0]
    faxBox = iframe.contents().find('#pharmacyFax')[0]
  	var submitButton = iframe.contents().find('input[type="button"][value="Submit"][onclick*="savePh"]')
    
    pharmacyFormObj = iframe.contents().find('#pharmacyForm')
  	PharmacyID = iframe.contents().find('#pharmacyID')
    console.log(pharmacyFormObj)
  	//console.log(nameBox)
  	//console.log(addressBox)
  	//console.log(phoneBox)
  	//console.log(faxBox)
    

    nameBox.value = name
    addressBox.value = address
    phoneBox.value = phone
  	faxBox.value = fax
  
    newaddPharmacy()
   	console.log("overlay closed")
  	//return 1
}

function sleep(milliseconds) {
  console.log("sleeping")
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function OverlaySeen(){
  console.log(PharmBoxVis)
 	if (PharmBoxVis == "block"){//we want it to match
    	console.log("YES VISIBLE")
       return "visible" 
    } else{
      sleep(2000)
      OverlayThere()
    }
   
}

async function fillDetails() {
  //check if fill window open yet
 		return new Promise(resolve => {
      function checkFlag(){
        //console.log("test")
        var PharmBox = $('#lightwindow')
      	var PharmBoxVis = PharmBox.css('display')	
        iframe = $("#lightwindow_iframe")
        iframeLoad = $("#lightwindow_loading")
        var PharmLoadVis = iframeLoad.css('display')	
        //console.log(PharmBoxVis + "  " + iframe.length + "  " + PharmLoadVis)
        if ((PharmBoxVis != "block") && (iframe.length != 1 ) && (PharmLoadVis = "none")){//Reasons to keep waiting
          //console.log(PharmBoxVis + "  " + iframe.length + "  " + PharmLoadVis)
          //console.log("Not seen")
          //setTimeout(function(){ fillDetails();}, 2000);//wait 50 millisecnds then recheck  
          setTimeout(checkFlag, 15000);
          //return
        }else{ 
          console.log("resolved " + name)
          console.log(PharmBoxVis + "  " + iframe.length + "  " + PharmLoadVis)
          //sleep(5000).
          afterLoad()
          resolve('resolved');  
        }    
      }//checkflag
      checkFlag()
    });//Promise
      /*             
 		console.log("Visible")
    iframe = $("#lightwindow_iframe")
    iframe.load(function () {
      console.log("loaded")
      afterLoad()
    });
    console.log("resolved")
    /*/
    
    
    //setTimeout(function(){ afterLoad() },5000);
		//setTimeout(function(){phoneBox = $('#lightwindow_iframe').contents().find('#pharmacyPhone1');console.log(phoneBox) },5000);
		return
}





async function main(){

    //unsafeWindow.addPharmacy();
  	//console.log("tester")
  
  
  //console.log(iframe)
 	for(let i = 0; i < DataArray.length; i++){
    name = DataArray[i][0]
    address = DataArray[i][1] + DataArray[i][2]
    address = address.replace(/['"]+/g, '')
    phone = DataArray[i][3]
    fax = DataArray[i][4]
    console.log("RUNNING LINE" +i)
    test = await fillDetails()
    console.log("FINISHED LINE" + i )
    //ActiveRun()
    
    //fillDetails()
    }
    
		
   
  	console.log("finished")
  	
  	//setTimeout(function(){fillDetails();},9000);
    //setTimeout(function(){consoleLogger("end test")},10000);

		
		
    
    //setTimeout(, 30000);
}
