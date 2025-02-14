import styles from "./speed.module.css";
import slow from "../../assets/Slow.svg";
import regular from "../../assets/regular.svg";
import hyper from "../../assets/hyper.svg";
import turbo from "../../assets/turbo.svg";

// eslint-disable-next-line react/prop-types
const Speed = ({ isOpenSpeed, setSelectedSpeed, selectedSpeed }) => {
  if (isOpenSpeed) {
    const data = [
      { speed: 1, label: "Slow", image: slow },
      { speed: 2, label: "Regular", image: regular },
      { speed: 3, label: "Turbo", image: turbo },
      { speed: 4, label: "Hyper", image: hyper },
    ];

    const toggleSpeedSelection = (speed) => {
      setSelectedSpeed((prev) => {
        // Se o speed já estiver selecionado, removemos, senão adicionamos
        if (prev.includes(speed)) {
          return prev.filter((item) => item !== speed);
        } else {
          return [...prev, speed];
        }
      });
    };

    return (
      <div className={styles.speed}>
        {data.map((item) => (
          <button
            key={item.speed}
            className={`${styles.cardSpeed} ${selectedSpeed.includes(item.speed) ? styles.selected : ""}`}
            onClick={() => toggleSpeedSelection(item.speed)}
          >
            <img src={item.image} alt={item.label} />
            <p>{item.label}</p>
          </button>
        ))}
      </div>
    );
  }
};

export default Speed;
