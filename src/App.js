import { useState } from "react";
import "./App.css";
import Break from "./components/Break";
import Session from "./components/Session";

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);

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
      if(breakTime <= 60 && amount < 0){
        return;
      }
      setBreakTime((prev) => prev + amount);
    }else{
      if(sessionTime <= 60 && amount < 0){
        return;
      }
      setSessionTime((prev) => prev + amount);
    }
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
      <h1>{formatTime(displayTime)}</h1>
    </>
  );
}

export default App;
