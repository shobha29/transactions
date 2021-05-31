var queryString = location.search.substring(1);

var a = queryString.split("|");

const direction = ["Sent", "Received"];
const type = ["Pay", "Collect"];
const status = ["Pending", "Confirmed", "Expired", "Reject", "Cancel"];

const amount = a[0];
const dIndex = a[1];
const tIndex = a[2];
const sIndex = a[3];
const startTimestamp = new Date(a[4]).getTime();
const endTimestamp = new Date(a[5]).getTime();
const description = a[6];
const cId = a[7];
const cPay = a[8];
const pId = a[9];
const pPay = a[10];

// for start date

const startNewDate = new Date(startTimestamp);
const startDateString =
  startNewDate.getDate() +
  " " +
  startNewDate.toDateString().slice(4, 7) +
  " " +
  startNewDate.getFullYear();

const startHour = startNewDate.getHours();
const startMinute =
  startNewDate.getMinutes() == "0" ? "00" : startNewDate.getMinutes();
const startNewHour =
  startHour == "0" ? "12" : startHour > "12" ? startHour % "12" : startHour;
const startZone = startHour > 12 ? "PM" : "AM";

const startTimeString = `${startNewHour}:${startMinute} ${startZone}`;

// For end date

const endNewDate = new Date(endTimestamp);
const endDateString =
  endNewDate.getDate() +
  " " +
  endNewDate.toDateString().slice(4, 7) +
  " " +
  endNewDate.getFullYear();

const endHour = endNewDate.getHours();
const endMinute =
  endNewDate.getMinutes() == "0" ? "00" : endNewDate.getMinutes();
const endNewHour =
  endHour == "0" ? "12" : endHour > "12" ? endHour % "12" : endHour;
const endZone = endHour > 12 ? "PM" : "AM";

const endTimeString = `${endNewHour}:${endMinute} ${endZone}`;

document.querySelector("#amount").textContent = `₹ ${amount}`;
document.querySelector("#direction").textContent = direction[dIndex - 1];
document.querySelector("#type").textContent = type[tIndex - 1];
document.querySelector("#status").textContent = status[sIndex - 1];
document.querySelector(
  "#start-date"
).textContent = `${startDateString}, ${startTimeString}`;
document.querySelector(
  "#end-date"
).textContent = `${endDateString}, ${endTimeString}`;
if (description === "") {
  document.querySelector("#description-container").style.display = "none";
} else {
  document.querySelector("#description").textContent = description;
}
document.querySelector("#c-id").textContent = cId;
document.querySelector("#c-pay").textContent = cPay;
document.querySelector("#p-id").textContent = pId;
document.querySelector("#p-pay").textContent = pPay;
