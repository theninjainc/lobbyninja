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
  }, [startEvent]); // Recalcula quando startEvent muda

  useEffect(() => {
    if (time <= 0) return;

    // Inicia o intervalo para diminuir o tempo a cada segundo
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const updatedTime = prevTime - 1; // Diminui 1 segundo
        return updatedTime;
      });
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado ou o tempo acabar
    return () => clearInterval(interval);
  }, [time]); // Executa a cada mudança no 'time'

  // Função para converter segundos em minutos:segundos
  function convertSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return <>{convertSeconds(time)}</>;
}

export default Timer;
