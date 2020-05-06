(function(){

$(document).ready(function(){
	//turnWallRed();
	turnAllWallsRed();
	turnEndAlert();
	turnStartClick();
	turnMazeNoCheating();
});

function turnWallRed(){
	$("#boundary1").on("mouseenter",function(){
		$(this).addClass("youlose");
	});
}

function turnAllWallsRed(){
	$("#maze > .boundary").each(function(index,elem){
			$(elem).on("mouseenter",function(){
				$(this).addClass("youlose");
			});
	});
}
function isWallTouched(){
	let isTouched = false;
	$("#maze > .boundary").each(function(index,elem){
		if( $(elem).hasClass("youlose") ){
				isTouched = true;
		}
	});
	return isTouched;
}
function turnEndAlert(){
	$("#end").on("mouseenter",function(){
		if(isWallTouched() ){
			$("#status").text("Sorry, you lost :( ");
		}else{
			$("#status").text("You win!");
		}
	});
}

function turnStartClick(){
	$("#start").on("click",function(){
		allWallsNormal();
	});
}
function allWallsNormal(){
	$("#maze > .boundary").each(function(index,elem){
		$(elem).removeClass("youlose");
	});
}
function allWallsRed(){
	$("#maze > .boundary").each(function(index,elem){
		$(elem).addClass("youlose");
	});
}
function turnMazeNoCheating(){
	$("#maze").on("mouseleave",function(){
		allWallsRed();
		$("#status").text("Sorry, you lost :( ");
	});
}

})()