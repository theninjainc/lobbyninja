import { useTheme } from "../ThemeContext/ThemeContext.jsx";
import styles from "./toggleThemeBtn.module.css";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";

const ToggleThemeBtn = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles.toggleBtn} ${
        isDarkMode ? styles.dark : styles.light
      }`}
      onClick={toggleTheme}
    >
      <div
        className={`${styles.toggleBall} ${
          isDarkMode ? styles.moveRight : styles.moveLeft
        }`}
      />
      <div className={styles.sol}>
        <img src={sun} alt="Sun Icon" />
      </div>
      <div className={styles.lua}>
        <img src={moon} alt="Moon Icon" />
      </div>
    </div>
  );
};

export default ToggleThemeBtn;
