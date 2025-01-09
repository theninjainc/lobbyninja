import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ startEvent }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Obtém a hora atual
    const now = new Date();

    // Divide a hora e os minutos de startEvent
    // eslint-disable-next-line react/prop-types
    const [hours, minutes] = startEvent.split(":").map(Number);

    // Cria um novo objeto Date para o evento
    const eventTime = new Date();
    eventTime.setHours(hours, minutes, 0, 0);

    // Calcula a diferença em milissegundos
    const diffInMilliseconds = eventTime - now;

    // Converte para segundos
    const diffInSeconds = Math.max(0, Math.floor(diffInMilliseconds / 1000));

    // Define o tempo inicial
    setTime(diffInSeconds);
  }, [startEvent]);

  useEffect(() => {
    if (time <= 0) return;

    // Inicia o intervalo para diminuir o tempo a cada segundo
    const interval = setInterval(() => {
      setTime((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado ou o tempo acabar
    return () => clearInterval(interval);
  }, [time]);

  // Função para converter segundos em HH:MM:SS
  function convertToHoursMinutesSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return <>{convertToHoursMinutesSeconds(time)}</>;
}

export default Timer;
