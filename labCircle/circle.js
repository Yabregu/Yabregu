(function(){
"use strict";
$(document).ready(function(){
	 let jCircle = $("#circle1");
	 //let interId = setInterval(function(){circleGrows(10);} , 250);
	 $("#width").val(50);
	 $("#growAmount").val(10);
	$("#growRate").val(250);
	$("#numberCircles").val(12);
	 /*
	 jCircle.on("click",function(){
		$(this).hide();
		clearInterval(interId);
	 });
	 */
	 $("form").on("submit",function(e){
		 const width = $("#width").val();
		 const growAmount = $("#growAmount").val();
		 const growRate = $("#growRate").val();
		 const numberCircles = $("#numberCircles").val();
		 
		 e.preventDefault();
		 let container = $(".containerCircle");
		 container.find(".circle").remove();
		 for(let i = 0;i < numberCircles ; i++){
			 const redC = Math.floor(Math.random() * 100);
			 const greenC = Math.floor(Math.random() * 100);
			 const blueC = Math.floor(Math.random() * 100);
			 let circle = $("<div>",{
					id : "circle"+i,
					class: "circle",
					width : width+"px",
					height : width+"px",
					css:{
						
						"border-radius" : width+"px",
						"justify-self" : "unset",
					"align-self":"center",
					"background-color" : "rgb("+redC+","+greenC+","+blueC+")",
					"margin-left" : "calc("+Math.floor(Math.random() * 100)+"% - "+width+"px)"
					}
					
			})
			container.append(circle);
			let interId = setInterval(function(){circleGrows(growAmount,circle);} , growRate);
			circle.on("click",function(e){
				$(this).remove();
			clearInterval(interId);
			})
		 }
		 /*
		 let interId = setInterval(function(){circleGrows(growAmount);} , growRate);
		 jCircle.show().width(width).height(width).bind("click",function(e){
			$(this).remove();
			clearInterval(interId);
		 });
		 */
		 
		 
	 })
	
});
 
 
 
 function circleGrows(growAmount,jCircle){
	 growAmount = parseInt(growAmount);
	 
	 jCircle.width( parseInt(jCircle.width()) + growAmount+"px" );
	 jCircle.height( parseInt(jCircle.height()) + growAmount+"px" );
	 jCircle.css("border-radius",parseInt(jCircle.css("border-radius"))+growAmount+"px");
	 
 }
 
})()