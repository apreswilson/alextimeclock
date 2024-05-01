import { FC } from 'react';
import "./period.css";

interface Props {
  onUpdatePeriodStatus: (newStatus: boolean) => void;
}

const Period: FC<Props> = ({ onUpdatePeriodStatus }) => {

  //Getting things from local storage
  const getPeriodStateDate = localStorage.getItem("periodStart");
  const getPeriodEndDate = localStorage.getItem("periodEnd");
  const displayAccumulatedTime = String(localStorage.getItem("accumulatedTime"));
  const [clockInSeconds, clockInMinutes, clockInHours] = displayAccumulatedTime.split(',').map(Number);

  const startPeriod = () => {

    localStorage.clear()
    onUpdatePeriodStatus(true);
    localStorage.setItem("periodStatus", "true");

    const periodStartDate = new Date();
    const startYear = periodStartDate.getFullYear();
    const startMonth = periodStartDate.getMonth();
    const startDay = periodStartDate.getDate();

    const periodStartString = `${startMonth + 1}/${startDay}/${startYear}`;
    localStorage.setItem("periodStart", periodStartString);
    localStorage.setItem("accumulatedTime", "0,0,0");
  };

  return (
    <>
      <div className="details">
        <h1>TIME CLOCK</h1>
        <button type="button" className="start-period" onClick={startPeriod}>Start Period</button>
        <br />

        <p>How this time clock works: </p>
        <ul>
          <li>Click "Start Period" to start a new working period</li>
          <li>Once in a period, the actual time clock will be displayed</li>
          <li>When you clock in, the timer will perform a live count of the time passed</li>
          <li>When you clock out, the time passed will be accumulated to the total time of the period</li>
          <li>When you end a period, the data for that period will be displayed below. It will only display the last period's data.</li>
        </ul>
        <p>Disclaimer: The live counter clock may not match the total time clocked in due to usage of the setInterval function.</p>
      </div>

      <div className="period-data">
        <h1>PAST PERIOD</h1>
        <p>Period Start Date: {getPeriodStateDate}</p>
        <p>Period End Date: {getPeriodEndDate}</p>
        <p>Total Time Clocked In: {clockInHours} hours {clockInMinutes} minutes {clockInSeconds} seconds</p>
      </div>
    </>
  );
}

export default Period;