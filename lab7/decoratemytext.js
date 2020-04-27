window.onload = function(){
    "use strict";
    // put all of your code here
	//alertTest();
	//document.getElementById("buttonBigger").onclick=alertTest;
	//document.getElementById("buttonBigger").onclick=modifyTextSize;
	document.getElementById("checkBling").onchange=alertModifyTextFont;
	document.getElementById("buttonBigger").onclick=modifyTextSizeTimer;
	
 }
 function alertTest(){
	 alert("hello world");
 }
 function modifyTextSize(){
	 let areaDOM =  document.getElementById("areaText");
	  let currentClass =areaDOM.className.replace("bigFontSize","");
	 areaDOM.className =currentClass+" bigFontSize";
 }
 function alertModifyTextFont(){
	 alert("Changing font size!");
	 let areaDOM =  document.getElementById("areaText");
	 let checkDOM = document.getElementById("checkBling");
	 let currentClass =areaDOM.className.replace("boldFontWeight extraCheckClass","").replace("normalFontWeight","");
	 if(checkDOM.checked){
		 areaDOM.className =currentClass+" boldFontWeight extraCheckClass";
	 }else{
		 areaDOM.className =currentClass+" normalFontWeight";
	 }
	 
	 /*Modify body background image*/
	 let body = document.getElementsByTagName("BODY")[0];
	 if(checkDOM.checked){
		 body.className ="bodyWithImage";
	 }else{
		 body.className ="bodyWithNoImage";
	 }
 }
 function modifyTextSizeTimer(){
	 let areaDOM =  document.getElementById("areaText");
	
	 let currentFontSize = parseInt(window.getComputedStyle(areaDOM, null).getPropertyValue('font-size') )*0.75; //from px to pt
	 areaDOM.style.fontSize = (currentFontSize+2)+"pt" ;
	  setInterval(modifyTextSizeTimer,500);
 }