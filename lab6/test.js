let functions=[
{name:"max",params:"<input id='param1_1' type='number'><input id='param1_2' type='number'>",functionAsociated : function(index){maxFunction(index)} },
{name:"max three",params:"<input id='param2_1' type='number'><input id='param2_2' type='number'><input id='param2_3' type='number'>",functionAsociated : function(index){maxThreeFunction(index)}  },
{name:"Is vowel?",params:"<input id='param3_1'  > ",functionAsociated : function(index){isVowelFunction(index)} },
{name:"Sum array ",params:"<input id='param4_1'  > ",functionAsociated : function(index){sumArrayFunction(index)} },
{name:"Multiply array ",params:"<input id='param5_1'  > ",functionAsociated : function(index){multArrayFunction(index)} },
{name:"Reverse text",params:"<input id='param6_1'  > ",functionAsociated : function(index){reverseFunction(index)} },
{name:"Find largest",params:"<input id='param7_1'  > ",functionAsociated : function(index){findLongestWordFunction(index)} },
{name:"Fliter long words",params:"<input id='param8_1'><input id='param8_2' type='number'  > ",functionAsociated : function(index){filterLongWordsFunction(index)} },

{name:"Map array (x10)",params:"<input id='param9_1'  > ",functionAsociated : function(index){mapArrayFunction(index)} },
{name:"Filter array (===3)",params:"<input id='param10_1'  > ",functionAsociated : function(index){filterArrayFunction(index)} },
{name:"Reduce array (multiply all)",params:"<input id='param11_1'  > ",functionAsociated : function(index){reduceArrayFunction(index)} },
]
function testInputs(){
	document.getElementById("param1_1").value = 1;
	document.getElementById("param1_2").value = 10;
	
	document.getElementById("param2_1").value = 1;
	document.getElementById("param2_2").value = 2;
	document.getElementById("param2_3").value = 3;
	
	document.getElementById("param3_1").value = "a";
	
	document.getElementById("param4_1").value = "1,2,4";
	document.getElementById("param5_1").value = "1,2,4";
	
	document.getElementById("param6_1").value = "Reverse me!";
	document.getElementById("param7_1").value = "I am the largest!";
	
	document.getElementById("param8_1").value = "Try this filter";
	document.getElementById("param8_2").value = 3;
	
	document.getElementById("param9_1").value = "1,2,4";
	document.getElementById("param10_1").value = "2,3,3,4";
	document.getElementById("param11_1").value = "4,5,10";
}
function maxFunction(pindex){
	let num1 =document.getElementById("param1_1").value;
	let num2 =document.getElementById("param1_2").value;
	document.getElementById("functionResult"+pindex).innerHTML = max(num1,num2);
}
function max(num1,num2){
	if(num1 > num2){
	 return num1;
	}else {
		return num2
	};
}

function maxThreeFunction(pindex){
	let num1 =document.getElementById("param2_1").value;
	let num2 =document.getElementById("param2_2").value;
	let num3 =document.getElementById("param2_3").value;
	document.getElementById("functionResult"+pindex).innerHTML = maxThree(num1,num2,num3);
}
function maxThree(num1,num2,num3){
	return Math.max(num1,num2,num3);
}
function isVowelFunction(pindex){
	let text =document.getElementById("param3_1").value;
	document.getElementById("functionResult"+pindex).innerHTML = isVowel(text);
}
function isVowel(text){
	let textUpper = text.toUpperCase();
	return textUpper=="A" || textUpper=="E" || textUpper=="I" || textUpper=="O" || textUpper=="U";
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