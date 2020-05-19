class Frase{
	constructor(message,autor){
		this.message = message;
		this.autor = autor;
	}
}
const frases =[
new Frase("Meditation is a battle against your mind","Budda"),
new Frase("Whatever we put our attention on will grow stronger in our life","Maharishi"),
new Frase("Whatever we put our attention on will grow stronger in our life","Maharishi"),
new Frase("Whatever we put our attention on will grow stronger in our life","Maharishi"),
];
class Role{
	constructor(id,name){
		this.id = id;
		this.name = name;
	}
}
let roles=[
new Role(1,"Admin"),
new Role(2,"Checker"),
new Role(3,"Student")
];
function findRole(roleId){
	return roles.find( curr => curr.id === parseInt(roleId) );
}
class User{
	constructor(id,name,user,pass,roleId){
		this.id = id;
		this.name = name;
		this.user = user;
		this.pass = pass;
		this.role = findRole(roleId);
	}
}

let users = [
new User(1,"Mr. John","user.checker1","123",2),
new User(2,"Ms. Jane","user.checker2","123",2),
new User(3,"Big John","user.admin","123",1),
new User(4,"Little Jhon","user.student1","123",3),
new User(5,"Studen Three","user.student2","123",3),
new User(6,"Studen Four","user.student2","123",3),
new User(7,"Young Sheldon","user.student2","123",3),
];
function findUser(userId){
	return users.find( curr => curr.id === parseInt(userId) );
}
class Appointment{
	constructor(id,date,userCheckerName){
		this.id = id;
		this.date = date;
		this.userCheckerName = userCheckerName;
	}
	calcUsersConfirmed(){
		return bookings.filter( curr => curr.appointment.id === this.id && curr.typeConfirmed.id === 1).length;
	}
	calcUsersTotal(){
		return bookings.filter( curr => curr.appointment.id === this.id ).length;
	}
}
let appointments = [
new Appointment(1,new Date(2020,04,18,23,30),"Mr. John"),
new Appointment(2,new Date(2020,04,19,12,30),"Mr. John"),
new Appointment(3,new Date(2020,04,19,12,30),"Ms. Jane"),
new Appointment(4,new Date(2020,04,19,12,30),"Mr. John"),
new Appointment(5,new Date(2020,04,19,12,30),"Mr. John"),
new Appointment(6,new Date(2020,04,19,12,30),"Ms. Jane"),
new Appointment(7,new Date(2020,04,19,12,30),"Mr. John"),
new Appointment(8,new Date(2020,04,19,12,30),"Mr. John"),
new Appointment(9,new Date(2020,04,19,12,30),"Ms. Jane"),
	 
	];
function findAppointment(id){
	return appointments.find( curr => curr.id === parseInt(id) );
}
class TypeConfirmed{
	constructor(id,name,icon,color){
		this.id = id;
		this.name = name;
		this.icon = icon;
		this.color = color;
	}
}
let typesConfirmed=[
new TypeConfirmed(1,"Confirmed","fa-check","#698a50"),
new TypeConfirmed(2,"Declined","fa-times","#a70d0d"),
new TypeConfirmed(3,"Pending","fa-eye","#ce650c")
];
function findTypeConfirmed(id){
	return typesConfirmed.find( curr => curr.id === parseInt(id) );
}
class Booking{
	constructor(id,userStudentId,appointmentId,typeConfirmedId){
		this.id = id;
		this.student = findUser(userStudentId);
		this.appointment = findAppointment(appointmentId);
		this.typeConfirmed = findTypeConfirmed(typeConfirmedId)
	}
}
let bookings=[
new Booking(1,4,1,3),
new Booking(2,4,9,1),
new Booking(3,4,3,2),
new Booking(4,4,5,2),

new Booking(5,5,1,3),
new Booking(6,6,1,1),
new Booking(7,7,1,1),

]
function findBooking(studentId,appointmentId){
	return bookings.find( curr => curr.student.id === parseInt(studentId) && curr.appointment.id === parseInt(appointmentId) );
}
function findBookingById(id){
	return bookings.find( curr => curr.id === parseInt(id) );
}