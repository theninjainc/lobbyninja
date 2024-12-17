import { useState } from "react";
import styles from "./toggleThemeBtn.module.css";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";

const ToggleThemeBtn = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`${styles.toggleBtn} ${
        isDarkMode ? styles.dark : styles.light
      }`}
      onClick={handleToggle}
    >
      <div
        className={`${styles.toggleBall} ${
          isDarkMode ? styles.moveRight : styles.moveLeft
        }`}
      />
      <div
        className={styles.sol}
      >
        <img src={sun} alt="" />
      </div>
      <div
        className={styles.lua}
      >
        <img src={moon} alt="" />
      </div>
    </div>
  );
};

export default ToggleThemeBtn;
