const express = require("express");

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log("hello anish");
  const { currentDate } = req.body;
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
  let employee = {
    hours: 10,
    minutes: 10,
  };
  //   let currentDate = "2023-01-11T08:54:39.414Z";
  const todayDate = new Date(currentDate);
  const empDate = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate(),
    employee.hours,
    employee.minutes
  );
  const late = todayDate > empDate;
  let lateDetails;
  let earlyDetails;
  if (late) {
    lateDetails = calculateTimeDifference(empDate, todayDate);
    console.log("late", lateDetails);
    lateDetails["isLate"] = true;
  } else {
    earlyDetails = calculateTimeDifference(todayDate, empDate);
    console.log("early", earlyDetails);
    earlyDetails["isLate"] = false;
  }

  // console.log(late);
  const date = new Date();
  res.status(200).json({
    success: true,
    date: date,
    todayDate,
    empDate,
    lateDetails,
    earlyDetails,
    localDetails: {
      date: date.toLocaleString(),
      todayDate: todayDate.toLocaleString(),
    },
  });
});
app.listen(3000, () => {
  console.log("listeing in 3000");
});
