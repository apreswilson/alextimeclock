import { FC, useState, useEffect } from 'react';
import "./clock.css";

interface Props {
  onUpdatePeriodStatus: (newStatus: boolean) => void;
}

const Clock: FC<Props> = ({ onUpdatePeriodStatus }) => {
  const getSeconds = Number(localStorage.getItem("secondsPassed"));
  const getMinutes = Number(localStorage.getItem("minutesPassed"));
  const getHours = Number(localStorage.getItem("hoursPassed"));
  const [clockedInStatus, setClockedInStatus] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(getSeconds);
  const [minutesPassed, setMinutesPassed] = useState(getMinutes);
  const [hoursPassed, setHoursPassed] = useState(getHours);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (minutesPassed % 60 === 0 && minutesPassed !== 0) {
      setHoursPassed(hoursPassed + 1);
      localStorage.setItem("hoursPassed", String(hoursPassed + 1));
      setMinutesPassed(0);
    }
  }, [secondsPassed, minutesPassed, hoursPassed]);

  useEffect(() => {
    if (secondsPassed % 60 === 0 && secondsPassed !== 0) {
      setMinutesPassed(minutesPassed + 1);
      localStorage.setItem("minutesPassed", String(minutesPassed + 1));
      setSecondsPassed(0);
    }
  }, [secondsPassed, minutesPassed]);

  useEffect(() => {
    if (clockedInStatus) {
      const timer = setInterval(() => {
        setSecondsPassed(secondsPassed + 1);
        localStorage.setItem("secondsPassed", String(secondsPassed + 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  });

  function updateStatusText(textPassed: string) {
    setStatusText(textPassed);
    setTimeout(() => {
      setStatusText("");
    }, 2000);
  }

  function clockIn() {
    if (!clockedInStatus) {
      setClockedInStatus(true);
      updateStatusText("Clocked In");
      const clockInTime = new Date();
      const clockInSeconds = clockInTime.getSeconds();
      const clockInMinutes = clockInTime.getMinutes();
      const clockInHours = clockInTime.getHours();

      const clockInString = `${clockInSeconds},${clockInMinutes},${clockInHours}`;
      localStorage.setItem("clockInTime", clockInString);

    } else {
      updateStatusText("Already clocked in");
    }
  }

  function clockOut() {
    if (clockedInStatus) {
      setClockedInStatus(false);
      updateStatusText("Clocked Out");
      const clockOutTime = new Date();
      const clockOutSeconds = clockOutTime.getSeconds();
      const clockOutMinutes = clockOutTime.getMinutes();
      const clockOutHours = clockOutTime.getHours();

      const getClockInTime = localStorage.getItem("clockInTime");
      const getAccumulatedTime = localStorage.getItem("accumulatedTime");
      if (getClockInTime && getAccumulatedTime) {
        const [clockInSeconds, clockInMinutes, clockInHours] = getClockInTime.split(',').map(Number);

        let secondsClockedIn = clockOutSeconds - clockInSeconds;
        let minutesClockedIn = clockOutMinutes - clockInMinutes;
        let hoursClockedIn = clockOutHours - clockInHours;

        //Troubleshoot type conversion errors
        if (secondsClockedIn < 0) {
          secondsClockedIn += 60;
          minutesClockedIn -= 1;
        }
        if (minutesClockedIn < 0) {
          minutesClockedIn += 60;
          hoursClockedIn -= 1;
        }
        if (hoursClockedIn < 0) {
          hoursClockedIn = Math.abs(hoursClockedIn);
        }

        const [accumulatedSeconds, accumulatedMinutes, accumulatedHours] = getAccumulatedTime.split(',').map(Number);

        const updateAccumHours = accumulatedHours + hoursClockedIn;
        const updateAccumMinutes = accumulatedMinutes + minutesClockedIn;
        const updateAccumSeconds = accumulatedSeconds + secondsClockedIn - 1; //To match the setInterval time passed for seconds, -1 is necessary.

        const increaseTime = `${updateAccumSeconds},${updateAccumMinutes},${updateAccumHours}`;

        localStorage.setItem("accumulatedTime", increaseTime);

      } else {
        updateStatusText("Can't find clock time or accumulated time. End period and start a new one.");
      }
    } else {
      updateStatusText("Already clocked out");
    }
  }

  const endPeriod = () => {
    if (!clockedInStatus) {
      onUpdatePeriodStatus(false);
      localStorage.setItem("periodStatus", "false");

      const periodEndDate = new Date();
      const endYear = periodEndDate.getFullYear();
      const endMonth = periodEndDate.getMonth() + 1;
      const endDay = periodEndDate.getDate();

      const periodEndString = `${endMonth}/${endDay}/${endYear}`;
      localStorage.setItem("periodEnd", periodEndString);

      //localStorage.clear();

    } else {
      updateStatusText("Can't end period while clocked in.")
    }

  };


  return (
    <div className="timer">
      <div className="clock">
        <div className="hours-section">
          <h1 className="hours">{hoursPassed}</h1>
          <p>Hours</p>
        </div>
        <div className="minutes-section">
          <h1 className="minutes">{minutesPassed}</h1>
          <p>Minutes</p>
        </div>
        <div className="seconds-section">
          <h1 className="seconds">{secondsPassed}</h1>
          <p>Seconds</p>
        </div>
      </div>

      <div className="clock-buttons">
        <button type="button" className="clock-in" onClick={clockIn}>Clock In</button>
        <button type="button" className="clock-out" onClick={clockOut}>Clock Out</button>

        <button type="button" className="end-period" onClick={endPeriod}>End Period</button>
        <br />
        <p className="status-text">{statusText}</p>
      </div>
    </div>
  );
}

export default Clock;