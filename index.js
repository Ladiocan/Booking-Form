let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

document.getElementById("checkIn").setAttribute("min", today);
document.getElementById("checkOut").setAttribute("min", today);

document.getElementById("checkIn").addEventListener("change", function() {
  document.getElementById("checkOut").value = "";
  document.getElementById("checkOut").removeAttribute("min");

let checkInDate = new Date(document.getElementById("checkIn").value);
let oneDayLater = new Date(checkInDate);
oneDayLater.setDate(checkInDate.getDate() + 1);

let dd = String(oneDayLater.getDate()).padStart(2, '0');
let mm = String(oneDayLater.getMonth() + 1).padStart(2, '0'); 
let yyyy = oneDayLater.getFullYear();
oneDayLater = yyyy + '-' + mm + '-' + dd;

document.getElementById("checkOut").setAttribute("min", oneDayLater);
})

function submitForm() {
    const clientName = document.getElementById("name").value
    document.getElementById("client-name").innerHTML = clientName

    var checkIn = document.forms["bookingForm"]["checkIn"].value;
    var checkOut = document.forms["bookingForm"]["checkOut"].value;
    var guests = document.forms["bookingForm"]["guests"].value;
    var children = document.forms["bookingForm"]["children"].value;
    var room = document.forms["bookingForm"]["room"].value;

    var checkInDate = new Date(checkIn);
    var checkOutDate = new Date(checkOut);
    var numberOfDays = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
  
    var pricePerPerson = 0;
    var pricePerChild = 0;
    if (room == "standard") {
      pricePerPerson = 50;
      pricePerChild = 25;
    } else if (room == "deluxe") {
      pricePerPerson = 60;
      pricePerChild = 35;
    } else if (room == "suite") {
      pricePerPerson = 70;
      pricePerChild = 45;
    }
  
    var totalPrice = (guests * pricePerPerson + children * pricePerChild) * numberOfDays;
    document.getElementById("result").innerHTML = "Total price for your stay: $" + totalPrice;
  
    return false;
}