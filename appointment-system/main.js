let modules = [
	{id:1,nombre:"Appointments",icon:"fa-calendar",clickFunction : loadAppointments},
	//{id:2,nombre:"Checkings",icon:"fa-check-square-o",clickFunction :loadCheckings},
	{id:3,nombre:"My appointments",icon:"fa-star",clickFunction :loadMyAppointments},
];
let currentAppointment = {};
let userNow = {};

let usersCheckers = users.filter(curr => curr.role.id === 2);
let usersStudent = users.filter(curr => curr.role.id === 3);

$(function(){
	userNow = findUser(sessionStorage.getItem("userId"));
	$("#containerUsuario")
	.on("click",function(){ toggleOpcionesUsuario() } )
	.html("<i class='fa  fa-user-circle'></i><a>"+  ""+userNow.name+"</a> ");
	
	switch(userNow.role.id){
	/*Logic for student*/
		case 3:
		addFraseTop();
		 modules = modules.filter( curr => [1,3].indexOf(curr.id) > -1 );
		break;
		case 2:
		usersCheckers = usersCheckers.filter( curr => curr.id === userNow.id);
		 modules = modules.filter( curr => [1,2].indexOf(curr.id) > -1 );
		  
		addAcctionsButton();
		break;
		
		case 1:
		  modules = modules.filter( curr => [1,2].indexOf(curr.id) > -1 );
		addAcctionsButton();
		break;
	}
	$("#containerLeft").html(
			modules.reduce( (total,current) => total+"<div class='liModulo' id='liModulo"+current.id+"' onclick='verSeccion("+current.id+")'><i class='fa "+current.icon+"'></i>"+current.nombre+"</div>","")
		);
	verSeccion(1);
	addOpcionesUsuario();
})
function toggleOpcionesUsuario(){
	$("#divOpcionesUsuario").toggle();
}
function addOpcionesUsuario(){
	let innerText ="";
	innerText+="<div id='divMyAccount'> "+"My Account"+" </div>";
	innerText+="<div>"+userNow.name+"</div>";
	innerText+="<div>"+userNow.role.name+"</div>";
	innerText+="<div>"+userNow.user+"</div>";
	innerText+="<div onclick='goLogin()' id='divCloseSession'><i class='fa fa-sign-out'></i>"+"Close session"+"</div>";
	$("#containerActions").append($("<div>",{id:"divOpcionesUsuario",html:innerText } ) );
}
function goLogin(){
	window.location.href="login.html"
}

function getInputDate(date){
	return date.getFullYear()+"/"+( (date.getMonth()+1)<10?"0":"")+(date.getMonth()+1)+"/"+(date.getDate()<10?"0":"")+date.getDate();
}	
function getInputHour(date){
	return date.getHours()+":"+date.getMinutes();
}
function addFraseTop(){
	let randomIndex =Math.floor( Math.random()*frases.length );
	let frase = frases[randomIndex];
	$("#containerActions").css({"font-size":"13px","justify-content":"center","color":"white"}).html("'"+frase.message+"'    ("+frase.autor+")");
	addOpcionesUsuario();
}
function addAcctionsButton(){
	$("#containerActions").append($("<button>",{click:seeAddAppointment,html:"<i class='fa fa-plus'></i>New Appointment"  }) );
}
function seeAddAppointment(){
	createDescriptionAppointment({date : new Date(),usersConfirmed:0,usersTotal:0 },"add");
}
function saveAddAppointment(){
	
	const dateInput = $("#inputDateAppointment").val().split("/");
	const timeInput = $("#inputTimeAppointment").val().split(":");
	const userChecker = $("#selectCheckerAppointment option:selected").text();
	const newAppointment = {};
	let maxIdAppointmen = appointments.reduce( (total,curr) => Math.max(total,curr.id) ,0);
	newAppointment.id = maxIdAppointmen+1;
	newAppointment.date = (new Date(dateInput[0],dateInput[1]-1,dateInput[2],timeInput[0],timeInput[1]));
	newAppointment.userCheckerName = userChecker;
	newAppointment.usersConfirmed = 0;
	newAppointment.usersTotal = 0;
	currentAppointment = new Appointment(maxIdAppointmen+1,newAppointment.date,userChecker);
	appointments.push(currentAppointment);
	
	loadAppointments();
	createDescriptionAppointment(currentAppointment,"read");
}
function cancelAddAppointment(){
	$("#containerRight").html("");
}
function verSeccion(id){
	$(".liModulo").each(function(index,elem){
		$(elem).removeClass("liModuloActive");
	});
	$("#liModulo"+id).addClass("liModuloActive");
	let currentLi = modules.find( (curr) => curr.id === parseInt(id) );
	currentLi.clickFunction();
	
}
function loadMyAppointments(){
	loadAppointments(appointments.filter( curr => findBooking(userNow.id ,curr.id) ));
}
function loadAppointments(customAppointments){
	$("#containerCenter").html("");
	$("#containerCenter")
	.append($("<div>",{class:"divSectionAppointment",id:"divToday",text:"Today"}) )
	.append($("<div>",{class:"divSectionAppointment",id:"divPending",text:"Coming soon"}))
	.append($("<div>",{class:"divSectionAppointment",id:"divCompleted",text:"Completed"}) );
	if(customAppointments === undefined){
		customAppointments = appointments;
		
			
	}
	for(current of customAppointments){
		if( (userNow.role.id === 2 && current.userCheckerName === userNow.name) || userNow.role.id !==2 ){
			const textAppointment = "<div id='liAppointment"+current.id+"' onclick='seeDetailsAppointment("+current.id+")' class='liAppointment'>"+
			"<p class='pUserName'>"+current.userCheckerName+"</p>"+
			"<p>"+getInputDate(current.date)+"</p>"+
			"<p>"+getInputHour(current.date)+"</p>"+
			"</div>";
			const today = new Date();
			if(today > current.date){
				$("#divCompleted").after(textAppointment);
			}else if(sameDay(today,current.date)){
				$("#divToday").after(textAppointment);
			}else{
				$("#divPending").after(textAppointment);
			}
		}
	}
}
function sameDay(day1,day2){
	return day1.getMonth() ===  day2.getMonth() && day1.getYear() ===  day2.getYear() && day1.getDate() ===  day2.getDate() 
}
function seeDetailsAppointment(id){
	$(".liAppointment").each(function(index,elem){
		$(elem).removeClass("liAppointmentActive");
	});
	$("#liAppointment"+id).addClass("liAppointmentActive");
	currentAppointment = appointments.find( (curr) => curr.id === parseInt(id) );
	createDescriptionAppointment(currentAppointment,"read");
	;
	
}
function addBookingStudent(){
	let maxIdBooking = bookings.reduce((total,curr) => Math.max(total,curr.id) ,0);
	bookings.push( new Booking(maxIdBooking+1,userNow.id,currentAppointment.id,3) );
	createDescriptionAppointment(currentAppointment,"read");
	addFraseTop();
}
function deleteBookingStudent(){
	const booking = findBooking(userNow.id,currentAppointment.id);
	bookings = bookings.filter( curr => curr.id !==booking.id );
	createDescriptionAppointment(currentAppointment,"read");
	addFraseTop();
}
function createDescriptionAppointment(appointmentObj,action){
	$("#containerRight").html("");
	appointmentObj.dateText = getInputDate(appointmentObj.date);
	appointmentObj.timeText = getInputHour(appointmentObj.date);
	$("#liAppointment"+appointmentObj.id).removeClass("liAppointmentActive");
	$("#liAppointment"+appointmentObj.id).addClass("liAppointmentActive");
	
	if(action === "read"){
		const right = $("#containerRight");
		right.append($("<div>",{class:"descriptionTitle",text :"Appointment "+ appointmentObj.dateText+" "+appointmentObj.timeText}));
		const booking = findBooking(userNow.id,appointmentObj.id);
		if(userNow.role.id === 3  ){
			if(   new Date() < appointmentObj.date ) {
				if( booking === undefined){
					right 
					.append($("<button>",{class:"buttonTitle",click:addBookingStudent,html:"<i class='fa fa-check'></i>Apply booking"  }))
				}else{
					right
					.append($("<button>",{class:"buttonTitle",click:deleteBookingStudent,html:"<i class='fa fa-times'></i>Cancel Booking"  })) 
				}
			}
			
			
		}else{
			if(   new Date() < appointmentObj.date 
			//&& userNow.role.id === 2 
			) {
			right
			.append($("<button>",{class:"buttonTitle",click:checklistAppointment,html:"<i class='fa fa-check-square-o'></i>Checklist"  }))	
			}
			right
			.append($("<button>",{class:"buttonTitle",click:updateAppointment,html:"<i class='fa fa-pencil-square-o'></i>Update"  }))
			.append($("<button>",{class:"buttonTitle",click:deleteAppointment,html:"<i class='fa fa-trash'></i>Delete"  }))
		}
		let containerRight = $("<div>",{class:"gridDescription" ,id:"gridAppointmentDescription" });
		right.append(containerRight);
		
		containerRight
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Checker "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:appointmentObj.userCheckerName}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:appointmentObj.dateText}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Time "}))
		.append($("<div>",{class:"divDescriptionInfo" ,text:appointmentObj.timeText}))
		if(userNow.role.id === 3 ){
			containerRight.append($("<div>",{class:"divDescriptionLabel" ,html:" Booking status "}))
			.append($("<div>",{class:"divDescriptionInfo" ,html:(booking === undefined?"Not applied":"<i class='fa "+booking.typeConfirmed.icon+"' "+
				"style='color : "+booking.typeConfirmed.color+"'></i> "+booking.typeConfirmed.name)  } ))
		}else{
			containerRight.append($("<div>",{class:"divDescriptionLabel" ,html:" Users Confirmed "}))
			.append($("<div>",{class:"divDescriptionInfo" ,text:appointmentObj.calcUsersConfirmed()+" / "+appointmentObj.calcUsersTotal()}));
		}
		
	}
	if(action === "update"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Appointment "+ appointmentObj.dateText+" "+appointmentObj.timeText}))
		.append($("<button>",{class:"buttonTitle",click:saveUpdateAppointment,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelUpdateAppointment,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridAppointmentDescription" }));
		let optionsSelect = usersCheckers.reduce( (total,current) => total+"<option value='"+current.id+"'> "+current.name+"</option>","")
		$("#gridAppointmentDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Checker "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<select>",{id:"selectCheckerAppointment",html:optionsSelect})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date (YYYY/MM/DD)"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{id:"inputDateAppointment",type:"text",value:getInputDate(appointmentObj.date)})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Time (HH:MM)"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{id:"inputTimeAppointment",type:"text",value:getInputHour(appointmentObj.date)})}))
		;
	}
	if(action === "add"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"New Appointment " }))
		.append($("<button>",{class:"buttonTitle",click:saveAddAppointment,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelAddAppointment,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridAppointmentDescription" }));
		let optionsSelect = usersCheckers.reduce( (total,current) => total+"<option value='"+current.id+"'> "+current.name+"</option>","")
		$("#gridAppointmentDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Checker "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<select>",{id:"selectCheckerAppointment",html:optionsSelect})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Date (YYYY/MM/DD)"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{placeholder:"",id:"inputDateAppointment",type:"text",value:appointmentObj.dateText})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Time (HH:MM)"}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{id:"inputTimeAppointment",type:"text",value:appointmentObj.timeText})}))
		;
	}
	if(action === "delete"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Appointment "+ appointmentObj.dateText+" "+appointmentObj.timeText+" (Deleted)"}))
	}
	if(action === "checklist"){
		let right = $("#containerRight");
		right
		.append($("<div>",{class:"descriptionTitle",text :"Appointment "+ appointmentObj.dateText+" "+appointmentObj.timeText}))
		.append($("<button>",{class:"buttonTitle",click:cancelBookingAppointment,html:"<i class='fa fa-sign-out fa-rotate-180'></i>Return"  }));
		if(userNow.role.id === 2){
			right
			.append($("<button>",{class:"buttonTitle",click:addBookingAppointment,html:"<i class='fa fa-plus'></i>Add booking"  }))
		}
		
		right.append($("<table>",{class:"tableDescription" ,id:"tableAppointmentDescription" }));
		let bookingsAppointment = bookings.filter( curr => curr.appointment.id === appointmentObj.id);
		if(bookingsAppointment.length > 0){
			let innerTextTable = bookingsAppointment
									.reduce( (total,curr) => total+"<tr><td>"+curr.student.name+"</td>"+
										"<td><input onchange='updateBooking("+curr.id+")' value='1' "+(curr.typeConfirmed.id ===1?"checked":"")+" name='checkStuden"+curr.id+"' type='radio'></td>"+
										"<td><input onchange='updateBooking("+curr.id+")' value='2' "+(curr.typeConfirmed.id ===2?"checked":"")+" name='checkStuden"+curr.id+"'  type='radio'></td>"+
										"<td><input onchange='updateBooking("+curr.id+")' value='3' "+(curr.typeConfirmed.id ===3?"checked":"")+" name='checkStuden"+curr.id+"'  type='radio'></td>"+
										"<td><button onclick='deleteBooking("+curr.id+")''><i class='fa fa-trash'></i> </button></td>"+
										"</tr> ","")
			$("#tableAppointmentDescription")
			.append($("<thead>",{  html:" <tr><td style='min-width : 200px'> </td>"+
					"<td style='max-width : 90px'>Approved</td><td style='max-width : 90px'>Declined</td><td style='max-width : 90px'>Pending</td></tr> "}))
			.append($("<tbody>",{  html:""+innerTextTable}));
		}
	}
	if(action === "add-booking"){
		$("#containerRight").append($("<div>",{class:"descriptionTitle",text :"Appointment "+ appointmentObj.dateText+" "+appointmentObj.timeText}))
		.append($("<button>",{class:"buttonTitle",click:saveBookingAppointment,html:"<i class='fa fa-floppy-o'></i>Save"  }))
		.append($("<button>",{class:"buttonTitle",click:cancelBookingAppointment,html:"<i class='fa fa-times'></i>Cancel"  }))
		.append($("<div>",{class:"gridDescription" ,id:"gridBookingDescription" }));
		let optionsSelect = usersStudent
							.filter ( curr => !findBooking(curr.id,currentAppointment.id) )
							.reduce( (total,current) => total+"<option value='"+current.id+"'> "+current.name+"</option>","")
		$("#gridBookingDescription")
		.append($("<div>",{class:"divDescriptionLabel" ,html:" <i class='fa fa-search'></i> "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<input>",{id:"searchStudentAppointment",html:"",keyup:filterStudentsSearch})}))
		.append($("<div>",{class:"divDescriptionLabel" ,html:" Student "}))
		.append($("<div>",{class:"divDescriptionInfo" ,html:$("<select>",{id:"selectStudentAppointment",html:optionsSelect})}))
		 
		;
	}
}
function filterStudentsSearch(){
	const studentName = $("#searchStudentAppointment").val().trim().toUpperCase();
	let optionsSelect = usersStudent
						.filter ( curr => !findBooking(curr.id,currentAppointment.id) )
						.filter( curr => curr.name.toUpperCase().indexOf(studentName) > -1 )
						.reduce( (total,current) => total+"<option value='"+current.id+"'> "+current.name+"</option>","");
	$("#selectStudentAppointment").html(optionsSelect);
}
function addBookingAppointment(){
	createDescriptionAppointment(currentAppointment,"add-booking");
}
function saveBookingAppointment(){
	const studentId = $("#selectStudentAppointment").val();
	let maxBookingId = bookings.reduce( (total,curr) => Math.max(total,curr.id) ,0);
	bookings.push(new Booking(maxBookingId+1,studentId,currentAppointment.id,1) );
	createDescriptionAppointment(currentAppointment,"checklist");
}
function cancelBookingAppointment(){
	createDescriptionAppointment(currentAppointment,"read");
}
function updateBooking(bookingId){
	for(booking of bookings){
		if(booking.id === parseInt(bookingId) ){
			let newTypeConfirmed = findTypeConfirmed($("input[name='checkStuden"+booking.id+"']:checked"). val() );
			booking.typeConfirmed = newTypeConfirmed
		}
	}
}
function deleteBooking(bookingId){
	bookings = bookings.filter( curr => curr.id !== parseInt(bookingId) );
	createDescriptionAppointment(currentAppointment,"checklist");
}
function checklistAppointment(){
	createDescriptionAppointment(currentAppointment,"checklist");
}
function saveUpdateAppointment(){
	appointments.forEach(function(val){
		if(val.id === currentAppointment.id){
			const dateInput = $("#inputDateAppointment").val().split("/");
			const timeInput = $("#inputTimeAppointment").val().split(":");
			const userChecker = $("#selectCheckerAppointment option:selected").text();
			val.date = (new Date(dateInput[0],dateInput[1]-1,dateInput[2],timeInput[0],timeInput[1]));
			val.userCheckerName = userChecker;
			currentAppointment = val;
			return false;
		}
	});
	loadAppointments();
	createDescriptionAppointment(currentAppointment,"read");
}
function cancelUpdateAppointment(){
	createDescriptionAppointment(currentAppointment,"read");
}
function updateAppointment(){
	createDescriptionAppointment(currentAppointment,"update");
}
function deleteAppointment(){
	createDescriptionAppointment(currentAppointment,"delete");
	appointments = appointments.filter( (curr) => curr.id !== currentAppointment.id );
	loadAppointments();
}
function loadCheckings(){
	$("#containerCenter").html(
		appointments.reduce( (total,current) => total+"<div class='liAppointment'>"+
		"<p class='pUserName'>"+current.userCheckerName+"</p>"+ 
		"</div>","")
	);
}