const calculateTimeDifference = (date1, date2) => {
  // console.log("dates", date1, date2);
  if (!date1 || !date2) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  if (date2 < date1) {
    date2.setDate(date2.getDate() + 1);
  }

  let diff = date2 - date1;
  // console.log(diff);

  let msec = diff;
  let hours = Math.floor(msec / (1000 * 60 * 60));
  msec -= hours * 1000 * 60 * 60;
  let minutes = Math.floor(msec / (1000 * 60));
  msec -= minutes * 1000 * 60;
  let seconds = Math.floor(msec / 1000);

  // console.log(`The time difference is ${hours}:${minutes}:${seconds}`);
  return { hours, minutes, seconds };
};

const empdate1 = new Date("2023-01-11T04:25:00.000Z");
const todayDate = new Date("2023-01-11T08:26:38.023Z");
console.log("empdate1", empdate1.toLocaleString());
console.log("todayDate", todayDate.toLocaleString());

console.log("a", calculateTimeDifference(empdate1, todayDate));
