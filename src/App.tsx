import { useState, useEffect } from 'react';

import './App.css'
import Clock from './components/clock/clock';
import Period from './components/period/period';

function App() {
  const [periodStatus, setPeriodStatus] = useState<boolean>(false);

  useEffect(() => {
    const storedStatus = localStorage.getItem("periodStatus");
    if (storedStatus !== "false" && storedStatus !== null) {
      setPeriodStatus(true);
      console.log("Currently true");
    } else {
      setPeriodStatus(false)
      console.log("Currently false");
    }
  }, []);


  const updatePeriodStatus = (newStatus: boolean) => {
    setPeriodStatus(newStatus);
  };

  return (
    <>
      {periodStatus ? <Clock onUpdatePeriodStatus={updatePeriodStatus} /> : <Period onUpdatePeriodStatus={updatePeriodStatus} />}
    </>
  );
}

export default App;