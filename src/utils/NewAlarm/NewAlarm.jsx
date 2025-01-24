/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./NewAlarm.module.css";
import exit from "../../assets/exit.svg";
import pen from "../../assets/pen.svg";
import relogio from "../../assets/relogio.svg";
import star from "../../assets/favourites.svg";

const NewAlarm = ({ isOpen, onClose }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const getFormattedDate = () => {
      const today = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = today.toLocaleDateString("en-US", options);
      return `Today: ${formattedDate}`;
    };

    setDate(getFormattedDate());
    const intervalId = setInterval(() => {
      setDate(getFormattedDate());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };
  const [alarmName, setAlarmName] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [days, setDays] = useState({
    all: false,
    sa: false,
    su: false,
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
  });

  const handleDayToggle = (day) => {
    setDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log({
      alarmName,
      time,
      comment,
      days,
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.newAlarm}>
      <div className={styles.title}>
        <h2>New Alarm</h2>
        <button onClick={onClose} className="close-btn">
          <img src={exit} alt="" />
        </button>
      </div>
      <div className="modal-body">
        <div className={styles.alarmName}>
          <input
            type="text"
            placeholder="Alarm Name"
            value={alarmName}
            onChange={(e) => setAlarmName(e.target.value)}
          />
          <img src={pen} alt="" />
        </div>

        <div className={styles.today}>
          <p>{date}</p>
        </div>
        <div className={styles.daysBtns}>
          {["all", "sa", "su", "mo", "tu", "we", "th", "fr"].map((day) => (
            <button key={day} onClick={() => handleDayToggle(day)}>
              {day.toUpperCase()}
            </button>
          ))}
        </div>
        <div className={styles.setTime}>
          <div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <img src={relogio} alt="ClockIcon" className={styles.relogio} />
          </div>
          <div>
            Snooze
            <button
              className={`${styles.toggleButton} ${
                isToggled ? styles.on : styles.off
              }`}
              onClick={handleToggle}
            >
              <div
                className={`${styles.toggleCircle} ${
                  isToggled ? styles.right : styles.left
                }`}
              />
            </button>
          </div>
        </div>
        <div className={styles.moreOptions}>
        <button onClick={() => setShowMoreOptions(!showMoreOptions)}>
          + More options
        </button>
        </div>
        {showMoreOptions && (
          <div className="more-options">
            <div className={styles.comment}>
              <label>Comment</label>
              <textarea
              placeholder="Type comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className={styles.modalActions}>
          <button className={styles.favoriteBtn}><img src={star} alt="" />Add to Favorites</button>
          <button className={styles.setAlarmBtn} onClick={handleSubmit}>
            Set Alarm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAlarm;
