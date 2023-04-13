
import moment from "moment";

export function getStartEnd(firstTimestamp, timeFormat) {
  let first = moment(firstTimestamp);
  let end;
  let substractTime;
  let format;

  switch (timeFormat) {
    case "Week":
      substractTime = "day";
      format = "dddd";
      end = first.subtract(1, "week").endOf("day");
      break;
    case "Month":
      substractTime = "day";
      format = "M/DD";
      end = first.subtract(1, "month").endOf("day");
      break;
    case "Year":
      substractTime = "month";
      format = "MMMM";
      end = first.subtract(1, "year").endOf("day");
      break;

    default:
      substractTime = "hour";
      format = "HH";
      end = first.subtract(1, "days");
  }
  let data = [];
  let counter = 1;
  let current = moment(firstTimestamp);
  while (current.valueOf() > end.valueOf()) {
    data.push({
      text: moment(current).format(format),
      numberOfTempTimestamps: 0,
      totalTemp: 0
    });
    current = moment(firstTimestamp).subtract(counter, substractTime);
    counter++;
  }

  return { data, end: end.valueOf() };
}

export function getFormattedTime(time, timeFormat) {
  let currentTime;
  switch (timeFormat) {
    case "Week":
      currentTime = moment(time).format("dddd");
      break;
    case "Month":
      currentTime = moment(time).format("M/DD");
      break;
    case "Year":
      currentTime = moment(time).format("MMMM");
      break;

    default:
      currentTime = moment(time).format("HH");
  }

  return currentTime;
}

export function getSortByKey(optionSelected) {
  let key = "";

  switch (optionSelected) {
    case "Activity":
      key = "steps";
      break;
    case "High PH":
      key = "ph";
      break;

    case "High Temp":
      key = "temp";
      break;

    default:
      key = "name";
  }

  return key;
}

export function compareCows(a, b, key) {
  // Use toUpperCase() to ignore character casing
  let bandA = a[key];
  let bandB = b[key];

  if (key === "name") {
    bandA = bandA.toUpperCase();
    bandB = bandB.toUpperCase();
  }

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }

  if (key !== "name") {
    comparison *= -1;
  }

  return comparison;
}

export function convertToCelcius(temp) {
  return temp - 273.15;
}

export function convertToFarenheit(temp) {
  return (1.8 * temp) - 459.67;
}

export function getTempUnitString(unit){
  if(isCelcius(unit)){
    return `°C`;
  }
  return `°F`;
}

export function isCelcius(unit){
  return unit === 'Celcius'
}
