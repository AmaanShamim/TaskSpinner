import { useState } from "react";
import "./App.css";
import Break from "./components/Break";
import Session from "./components/Session";
import breakSoundFile from "./BreakAlarm.mp3";

function App() {
  const [displayTime, setDisplayTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [sessionTime, setSessionTime] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio] = useState(new Audio(breakSoundFile));
  
  const playBreakSound = () =>{
    breakAudio.currentTime = 0;
    breakAudio.play();
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const playpause = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVar = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVar) {
              playBreakSound();
              onBreakVar = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVar) {
              playBreakSound();
              onBreakVar = false;
              setOnBreak(true);
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  const resetTIme = () => {
    setDisplayTime(1500);
    sessionTime(1500);
    setBreakTime(300);
  };

  return (
    <>
      <Break
        title={"Break Length"}
        changeTime={changeTime}
        type={"break"}
        time={breakTime}
        formatTime={formatTime}
      />
      <Session
        title={"Session Length"}
        changeTime={changeTime}
        type={"session"}
        time={sessionTime}
        formatTime={formatTime}
      />
      <h3>{onBreak ? "Break" : "Session"}</h3>
      <h1>{formatTime(displayTime)}</h1>
      <button onClick={playpause}>{timerOn ? "Pause" : "Play"}</button>
      <button onClick={resetTIme}>reset</button>
    </>
  );
}

export default App;
