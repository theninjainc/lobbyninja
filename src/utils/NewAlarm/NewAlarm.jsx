/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./NewAlarm.module.css";
import exit from "../../assets/exit.svg";
import pen from "../../assets/pen.svg";
import relogio from "../../assets/relogio.svg";
import star from "../../assets/favourites.svg";
import { Account, Client } from "appwrite";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const NewAlarm = ({ isOpen, onClose }) => {
  const [date, setDate] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [alarmName, setAlarmName] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [days, setDays] = useState({});

  useEffect(() => {
    const getFormattedDate = () => {
      const today = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return `Today: ${today.toLocaleDateString("en-US", options)}`;
    };

    setDate(getFormattedDate());
    const intervalId = setInterval(() => setDate(getFormattedDate()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleToggle = () => setIsToggled((prev) => !prev);

  const handleDayToggle = (day) => {
    setDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSubmit = async () => {

    try {
      iziToast.info({
        title: "Aguarde",
        message: "Estamos criando o lobby...",
        timeout: 1000,
        position: "topRight",
        id: "loading-toast",
      });

      const client = new Client();
      client.setProject("lobbyninja");
      const account = new Account(client);
      const user = await account.get();

      const alarmData = {
        userId: user.$id,
        nome: alarmName,
        horaAlarme: time,
        comentario: comment,
        dias: Object.keys(days).filter((day) => days[day]),
      };

      console.log(alarmData)

      console.log("Oi")
      const response = await fetch("https://ninja.lobby.ninja/api/api/alarmes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alarmData),
      });

      if (response.ok) {
        iziToast.success({
          title: "Sucesso",
          message: "Lobby criado com sucesso!",
          position: "topRight",
          timeout: 5000,
        });
        console.log("Alarme criado com sucesso!");
        onClose();
      } else {
        iziToast.error({
          title: "Erro",
          message: data.error || "Não foi possível criar o lobby.",
          position: "topRight",
          timeout: 5000,
        });
        console.error("Erro ao criar alarme");
      }
    } catch (error) {
      iziToast.error({
        title: "Erro",
        message: data.error || "Não foi possível criar o lobby.",
        position: "topRight",
        timeout: 5000,
      });
      console.error("Erro na requisição: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.newAlarm}>
      <div className={styles.title}>
        <h2>New Alarm</h2>
        <button onClick={onClose} className="close-btn">
          <img src={exit} alt="Close" />
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
          <img src={pen} alt="Edit" />
        </div>

        <div className={styles.today}>
          <p>{date}</p>
        </div>

        <div className={styles.daysBtns}>
          {["sa", "su", "mo", "tu", "we", "th", "fr"].map((day) => (
            <button
              key={day}
              onClick={() => handleDayToggle(day)}
              className={days[day] ? styles.active : ""}
            >
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
              className={`${styles.toggleButton} ${isToggled ? styles.on : styles.off
                }`}
              onClick={handleToggle}
            >
              <div
                className={`${styles.toggleCircle} ${isToggled ? styles.right : styles.left
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
          <button className={styles.favoriteBtn}>
            <img src={star} alt="" />Add to Favorites
          </button>
          <button className={styles.setAlarmBtn} onClick={() => handleSubmit()}>
            Set Alarm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAlarm;
