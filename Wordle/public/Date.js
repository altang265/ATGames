const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();
var month = months[date.getMonth()];
var day = date.getDate();
var year = date.getFullYear();
const currentDate = month + " " + day + ", " + year;
window.onload = () => {
    document.getElementById("DateSpan").innerHTML = currentDate;
}
