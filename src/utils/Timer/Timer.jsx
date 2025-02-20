import { useEffect, useState } from "react";
import alert from "../../assets/alert.svg"; // Certifique-se de importar o ícone

// eslint-disable-next-line react/prop-types
function Timer({ startEvent, onTimerEnd }) {
  const [time, setTime] = useState(1);
  const [isAlert, setIsAlert] = useState(false); // Estado para controlar o alerta

  useEffect(() => {
    const now = new Date();
    const [hours, minutes] = startEvent.split(":").map(Number);
    const eventTime = new Date();
    eventTime.setHours(hours, minutes, 0, 0);

    const diffInMilliseconds = eventTime - now;
    const diffInSeconds = Math.max(0, Math.floor(diffInMilliseconds / 1000));
    setTime(diffInSeconds);
    console.log("será", diffInSeconds)
  }, [startEvent]);

  useEffect(() => {
    if (time <= 0) {
      onTimerEnd && onTimerEnd();
      return; // Evita que o intervalo continue depois que o tempo chega a zero
    }

    // Verificar se faltam menos de 3 minutos
    if (time <= 180) { // 180 segundos = 3 minutos
      setIsAlert(true);
    } else {
      setIsAlert(false);
    }

    const interval = setInterval(() => {
      setTime((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo quando o tempo for 0
  }, [time]);

  // Função para converter segundos em formato HH:MM:SS ou MM:SS
  function convertToHoursMinutesSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Se tiver menos de 1 hora, retornar no formato MM:SS
    if (hours === 0) {
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    // Caso contrário, retornar no formato HH:MM:SS
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return (
    <div style={{ color: isAlert ? 'yellow' : 'white' }}>
      {isAlert && (
        <img
          src={alert}
          alt="Alerta"
          style={{ width: "20px", marginRight: "5px" }}
        />
      )}
      {time > 0 ? convertToHoursMinutesSeconds(time) : "00:00"}
    </div>
  );
}

export default Timer;
