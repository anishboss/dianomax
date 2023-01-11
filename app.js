const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/", (req, res) => {
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
  const serverDate = new Date();
  let employeeDbDate = "2023-01-11T04:25:19.285Z";
  let empDateLocal = new Date(employeeDbDate);
  let empDate1 = new Date(
    serverDate.getFullYear(),
    serverDate.getMonth(),
    serverDate.getDate(),
    empDateLocal.getHours(),
    empDateLocal.getMinutes()
  );
  console.log("empDate1", empDate1);
  //   console.log("employee", employee);
  //   let currentDate = "2023-01-11T08:54:39.414Z";
  const todayDate = new Date(currentDate);
  console.log("todayDate", todayDate);
  const empDate = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate(),
    employee.hours,
    employee.minutes
  );
  console.log("empDate", empDate);
  const late = todayDate > empDate1;
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

  const date = new Date(
    serverDate.getFullYear(),
    serverDate.getMonth(),
    serverDate.getDate()
  );
  console.log("server Date", date);
  res.status(200).json({
    success: true,
    date: date,
    todayDate,
    empDate1,
    lateDetails,
    earlyDetails,
    localDetails: {
      date: date.toLocaleString(),
      todayDate: todayDate.toLocaleString(),
      empDate: empDate.toLocaleString(),
    },
  });
});
app.listen(PORT, () => {
  console.log(`listeing in ${PORT}`);
});
