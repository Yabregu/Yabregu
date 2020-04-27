let functions=[
{name:"Sum array ",params:"<input id='param4_1'  > ",functionAsociated : function(index){sumArrayFunction(index)} },
{name:"Multiply array ",params:"<input id='param5_1'  > ",functionAsociated : function(index){multArrayFunction(index)} },
{name:"Reverse text",params:"<input id='param6_1'  > ",functionAsociated : function(index){reverseFunction(index)} },
{name:"Filter long words",params:"<input id='param8_1'><input id='param8_2' type='number'  > ",functionAsociated : function(index){filterLongWordsFunction(index)} },
]
function testInputs(){
	
	document.getElementById("param4_1").value = "1,2,4";
	document.getElementById("param5_1").value = "1,2,4";
	
	document.getElementById("param6_1").value = "Reverse me!";
	
	document.getElementById("param8_1").value = "Try this filter";
	document.getElementById("param8_2").value = 3;
	
}

function sumArrayFunction(pindex){
	let arrayText =document.getElementById("param4_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = sumArray(arrayText);
}
function sumArray(arrayText){
	let arrayToNum = arrayText.split(",").map(function(val){
		return parseInt(val);
	});
	return arrayToNum.reduce(function(total,current){
		return total+current;
	});
}

function multArrayFunction(pindex){
	let arrayText =document.getElementById("param5_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = multArray(arrayText);
}
function multArray(arrayText){
	let arrayToNum = arrayText.split(",").map(function(val){
		return parseInt(val);
	});
	return arrayToNum.reduce(function(total,current){
		return total*current;
	});
}

function reverseFunction(pindex){
	let text =document.getElementById("param6_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = reverse(text);
}
function reverse(text){
	return text.split("").reverse().reduce(function(total,current){
		return total+current;
	})
}
function findLongestWordFunction(pindex){
	let text =document.getElementById("param7_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = findLongestWord(text);
}
function findLongestWord(text){
	return text.split(" ").reduce(function(total,current){
		if(total.length > current.length){
			return total;
		}else{
			return current;
		}
	})
}

function filterLongWordsFunction(pindex){
	let text =document.getElementById("param8_1").value;
	let number =document.getElementById("param8_2").value;
	document.getElementById("functionResult"+pindex).innerHTML = filterLongWords(text,number);
}
function filterLongWords(text,number){
	 return text.split(" ").filter(function(current){
		return current.length > number;
	})
}

function mapArrayFunction(pindex){
	let arrayText =document.getElementById("param9_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = mapArray(arrayText);
}
function mapArray(text){
	 return text.split(",").map(function(current){
		return parseInt(current)*10;
	})
}

function filterArrayFunction(pindex){
	let arrayText =document.getElementById("param10_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = filterArray(arrayText);
}
function filterArray(text){
	 return text.split(",").filter(function(current){
		return parseInt(current)===3;
	})
}
function reduceArrayFunction(pindex){
	let arrayText =document.getElementById("param11_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = reduceArray(arrayText);
}
function reduceArray(text){
	 return text.split(",").reduce(function(total,current){
		return total*current;
	})
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