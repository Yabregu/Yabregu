let functions=[
{name:"reverseArray",params:"<input id='param1_1'  > ",functionAsociated : function(index){reverseArrayFunction(index)} },
{name:"reverseArray InPlace ",params:"<input id='param2_1'  > ",functionAsociated : function(index){reverseArrayInPlaceFunction(index)} },
{name:"array to list",params:"<input id='param3_1'  > ",functionAsociated : function(index){arrayToListFunction(index)} },
{name:"List to Array",params:"<input id='param4_1'  > ",functionAsociated : function(index){listToArrayFunction(index)} },
{name:"Prepend function",params:"<input id='param5_1' placeholder='list'><input id='param5_2' placeholder='item' > ",functionAsociated : function(index){prependFunction(index)} },
{name:"NTH function",params:"<input id='param6_1' placeholder='list'><input id='param6_2' placeholder='index (start 0)' > ",functionAsociated : function(index){nthFunction(index)} },
{name:"Deep equal",params:"let obj = {here: {is: 'an'}, object: 2}; ",functionAsociated : function(index){deepEqualFunction(index)} },
]
function testInputs(){
	
	document.getElementById("param1_1").value = "a,b,c";
	document.getElementById("param2_1").value = "3cc,2bb,1aa";
	document.getElementById("param3_1").value = "1,2,3";
	document.getElementById("param4_1").value = "10,20,30";
	document.getElementById("param5_1").value = "12,20,30";
	document.getElementById("param5_2").value = "10";
	
	document.getElementById("param6_1").value = "10,20,30";
	document.getElementById("param6_2").value = "1";
	
}

function reverseArrayFunction(pindex){
	let arrayText =document.getElementById("param1_1").value.split(",");
	
	document.getElementById("functionResult"+pindex).innerHTML = reverseArray(arrayText);
}
function reverseArray(arrayText){
	
	return arrayText.map(function(val,index){
		return arrayText[arrayText.length -index-1];
	});
}

function reverseArrayInPlaceFunction(pindex){
	let arrayText =document.getElementById("param2_1").value.split(",");
	
	document.getElementById("functionResult"+pindex).innerHTML = reverseArrayInPlace(arrayText);
}
function reverseArrayInPlace(arrayText){
	let arrayTextAux = [];
	arrayText.forEach(function(val,index){
		arrayTextAux[index] = arrayText[arrayText.length -index-1];
	});
	arrayText = arrayTextAux;
	return arrayText;
}

function arrayToListFunction(pindex){
	let arrayText =document.getElementById("param3_1").value.split(",");
	
	document.getElementById("functionResult"+pindex).innerHTML = "Check console";
	console.log(arrayToList(arrayText));
}
function arrayToList(arrayText){
	
	return reverseArray(arrayText).reduce(function(total,current){
		return {value : current, rest: total};
	},null);
}
function listToArrayFunction(pindex){
	let arrayText =document.getElementById("param4_1").value.split(",");
	document.getElementById("functionResult"+pindex).innerHTML = "Check console";
	console.log(listToArray(arrayToList(arrayText)));
}
function listToArray(listParam){
	let arrayReturn = [];
	do{
		arrayReturn.push(listParam.value);
		listParam = listParam.rest;
	}
	while(listParam.rest != null)
	arrayReturn.push(listParam.value);
	return arrayReturn;
}

function prependFunction(pindex){
	let textInput = document.getElementById("param5_1").value;
	let arrayText =textInput.split(",");
	let itemPrepend =document.getElementById("param5_2").value;
	
	document.getElementById("functionResult"+pindex).innerHTML = "Check console";
	let listParam = null;
	if(textInput.length > 0){
		listParam = arrayToList(arrayText);
	}
	console.log(prepend(listParam ,itemPrepend) );
	console.log("(prepend(10, prepend(20, null))) =>" );
	console.log(prepend(10, prepend(20, null)));
}
function prepend(listObj, itemPrepend){
	
	return { value : itemPrepend,rest : listObj };
}


function nthFunction(pindex){
	let textInput = document.getElementById("param6_1").value;
	let arrayText =textInput.split(",");
	let indexFind =document.getElementById("param6_2").value;
	
	document.getElementById("functionResult"+pindex).innerHTML = "Check console";
	
	console.log(nth(arrayToList(arrayText) ,indexFind) );
}
function nth(listObj, itemPrepend){
	return listToArray(listObj)[itemPrepend];
}

function deepEqualFunction(pindex){
	let obj = {here: {is: "an"}, object: 2};
	
	document.getElementById("functionResult"+pindex).innerHTML = 
	"deepEqual(obj, obj) ==> "+deepEqual(obj,obj)+"<br>"+
	"deepEqual(obj, {here: 1, object: 2}) ==> "+deepEqual(obj, {here: 1, object: 2})+"<br>"+
	"deepEqual(obj, {here: {is: 'an'}, object: 2}) ==> "+deepEqual(obj, {here: {is: 'an'}, object: 2});
}
function deepEqual(objA, objB){
	if(objA == null && objB == null){
		return true;
	}
	if(objA == null || objB == null){
		return false;
	}
	if(typeof objA === "object" && typeof objB === "object"){
		return Object.keys(objA).reduce(function(total,current){
			return total && deepEqual(objA[current],objB[current]);
		},true);
	}else if(typeof objA === typeof objB ){
		return objA === objB;
	}else{
		return false
	}
	
}










function performAction(pindex){
	functions[pindex].functionAsociated(pindex);
}

let innerText ="";
functions.forEach(function(val,index){
	innerText+="<div class='functionContainer'>";
	innerText+="<div class='functionNum'>"+(index+1)+". "+val.name+"</div>";
	innerText+="<div class='functionParams'>"+val.params+"</div>";
	innerText+="<div class='functionButton'>"+"<button onclick='performAction("+index+")' >Try</button> "+"</div>";
	innerText+="<div class='functionResult' id='functionResult"+(index)+"'>"+"... "+"</div>";
	innerText+="</div>";
})
document.getElementById("functionGeneral").innerHTML = innerText;
testInputs();