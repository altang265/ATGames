const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const currentDate = () => {
    var date = Date();
    var month = date.getMonth();
    var day = date.getDay();
    var year = date.getFullYear();
    return (month + " ," + " " + day + " " + year);
}

export default currentDate;
