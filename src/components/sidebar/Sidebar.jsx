import { useState } from "react";

import styles from "./sidebar.module.css";
import lobbyNinjaLogo from "../../assets/lobbyNinjaLogo.svg";
import lobbyNinjaFinal from "../../assets/lobyNinjaFinal.svg";
import favourites from "../../assets/favourites.svg";
import tornauments from "../../assets/tournaments.svg";
import planner from "../../assets/planner.svg";
import registered from "../../assets/Frame.png";
import skipped from "../../assets/skipped.svg";
import alarm from "../../assets/alarm.svg";
import deleted from "../../assets/deleted.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`${isOpen ? styles.logoOpened : styles.logo}`}>
        <img src={`${isOpen ? lobbyNinjaFinal : lobbyNinjaLogo}`} />
      </div>

      <ul className="">
        <li>
          <a href="#section1" className={styles.bgHoverFirst}>
            <div className={styles.bgHoverIconFirst}>
              <img src={tornauments} alt="Tournaments" />
            </div>

            {isOpen && <span className={styles.bgHoverTextFirst}>Tournaments</span>}
          </a>
        </li>
        <li>
          <a href="#section2" className={styles.bgHover}>
            <div className={styles.bgHoverIcon}>
              <img src={planner} alt="Planner" />
            </div>
            {isOpen && <span>Planner</span>}
          </a>
        </li>
        <li>
          <a href="#section3" className={styles.bgHover}>
            <div className={styles.bgHoverIcon}>
              <img src={favourites} alt="Favourites" />
            </div>
            {isOpen && <span>Favourites</span>}
          </a>
        </li>
        <li>
          <a href="#section4" className={styles.bgHover}>
            <div className={styles.bgHoverIcon}>
              <img src={registered} alt="Registered" />
            </div>
            {isOpen && <span>Registered</span>}
          </a>
        </li>
        <li>
          <a href="#section5" className={styles.bgHover}>
            <div className={styles.bgHoverIcon}>
              <img src={skipped} alt="Skipped" />
            </div>
            {isOpen && <span>Skipped</span>}
          </a>
        </li>
        <li>
          <a href="#section6" className={styles.bgHover}>
            <div className={styles.bgHoverIcon}>
              <img src={alarm} alt="Alarm" />
            </div>
            {isOpen && <span>Alarm</span>}
          </a>
        </li>
        <li>
          <a href="#section7" className={styles.bgHover}>
            <div className={styles.bgHoverIcon}>
              <img src={deleted} alt="Deleted" />
            </div>
            {isOpen && <span>Deleted</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
