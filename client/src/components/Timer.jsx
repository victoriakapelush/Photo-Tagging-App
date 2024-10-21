/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Timer = ({ isTimerRunning, setSeconds, setGameOver, intervalRef }) => {
  useEffect(() => {
    if (isTimerRunning) {
      setSeconds(180);
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(intervalRef.current);
            setGameOver(true);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isTimerRunning, setSeconds, setGameOver, intervalRef]);

  return null;
};

export default Timer;
