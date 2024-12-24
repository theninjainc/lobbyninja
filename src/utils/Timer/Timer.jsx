import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ mlr }) {
  const [time, setTime] = useState(mlr);

  function convertSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return <>{convertSeconds(time)}</>;
}

export default Timer;
