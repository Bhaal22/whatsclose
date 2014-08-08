/**
 * New node file
 */

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate_MMMDDYYYY(date) {
	var dateStr = "";
	
	dateStr += months[date.getMonth()];
	dateStr += " ";
	dateStr += date.getDate();
	dateStr += " ";
	dateStr += date.getFullYear();
	
	return dateStr;
	
}