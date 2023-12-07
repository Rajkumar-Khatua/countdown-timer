import React, { useState, useEffect } from "react";
import {
  AccessTime,
  PlayArrow,
  Stop,
  Restore,
  Edit,
  Save,
} from "@mui/icons-material";
import "./Countdown.scss";

const Countdown = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [initialMinutes, setInitialMinutes] = useState(5);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    let interval;

    if (running && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setRunning(false);
            clearInterval(interval);
            return;
          }
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, minutes, seconds]);

  const handleStartStop = () => {
    setRunning((prevRunning) => !prevRunning);
  };

const handleReset = () => {
  setMinutes(initialMinutes);
  setSeconds(initialSeconds);
  setRunning(false);
};


  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setInitialMinutes(minutes);
    setInitialSeconds(seconds);
    setEditMode(false);
  };

  const formatTime = () => {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="countdown">
      <h1>Countdown Timer</h1>

      {editMode ? (
        <div className="edit-mode">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
            min="0"
            step="1"
          />
          <span>min</span>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
            min="0"
            max="59"
            step="1"
          />
          <span>sec</span>
          <button onClick={handleSave}>
            <Save />
            Save
          </button>
        </div>
      ) : (
        <div className="time">
          <AccessTime fontSize="large" />
          {formatTime()}
        </div>
      )}

      <div className="controls">
        {editMode ? null : (
          <button onClick={handleEdit}>
            <Edit />
            Edit
          </button>
        )}
        <button onClick={handleStartStop}>
          {running ? <Stop /> : <PlayArrow />}
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset}>
          <Restore />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
