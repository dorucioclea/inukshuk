// Array of months as strings
var monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Convert a month index to a month name
export function toMonth(index, isShort) {
  return (isShort ? monthArray[index].substring(0,3) : monthArray[index]);
}

// Array of weekdays as strings
var weekdayArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Convert a day index to a weekday name
export function toWeekday(index, isShort) {
  return (isShort ? weekdayArray[index].substring(0,3) : weekdayArray[index]);
}

// Format time with zeros where needed
export function padTime(num) {
  return "00".substring(0, 2 - num.toString().length) + num.toString();
}

// Return array of hours and minutes given a string formatted AM/PM time
export function toTwentyFour(time) {
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if(AMPM == "PM" && hours<12) hours = hours+12;
  if(AMPM == "AM" && hours==12) hours = hours-12;
  return [hours, minutes];
}

// Return true if given date is in a given number of minutes into the future
export function isInFutureByXMins(date, mins) {
  let now = new Date();
  let xMinutesFromNow = new Date(now.getTime() + (mins * 60000));
  return date > xMinutesFromNow;
}

// Return a string saying how much time is left until a given date
// Given time has passed, retun zeros
export function getTimeRemaining(endtime) {
  if (new Date() > endtime) {
    return "0d 0h 0m 0s";
  } else {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }
}
