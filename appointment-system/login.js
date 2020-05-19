$(function(){
	$("form").on("submit",function(e){
		e.preventDefault();
		searchUserName();
	})
});


function searchUserName(){
	const userName = $("#userName").val();
	const userPass = $("#userPass").val();
	
	let userFind = users.find( curr => curr.user === userName);
	if(userFind === undefined ){
		$("#msgError").text("User not found");
	}else if(userPass !== userFind.pass){
		$("#msgError").text("Password incorrect");
	}else{
		sessionStorage.setItem("userId", userFind.id);
		window.location.href ="main.html";
	}
	
}