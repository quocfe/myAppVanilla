export default function getCurrentDay() {
	var currentDate = new Date();

	// Get the current day, month, and year
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
	var year = currentDate.getFullYear();

	// Format the day, month, and year with leading zeros if needed
	var formattedDay = day < 10 ? '0' + day : day;
	var formattedMonth = month < 10 ? '0' + month : month;

	// Create a string representing the current date in "dd-mm-yyyy" format
	var formattedDate = formattedDay + '-' + formattedMonth + '-' + year;

	// Display the current date
	return formattedDate;
}
