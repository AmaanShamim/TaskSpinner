import React from "react";

export default function Break({ title, changeTime, type, time, formatTime }) {
  return (
    <>
      <h3>{title}</h3>
      <div className="handler">
        <button onClick={() => changeTime(-60, type)}>-</button>
        <h4>{formatTime(time)}</h4>
        <button onClick={() => changeTime(60, type)}>+</button>
      </div>
    </>
  );
}
