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
import { Link } from "react-router-dom";

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
          <Link to="/dashboard">
            <div className={styles.bgHoverIconFirst}>
              <img src={tornauments} alt="Tournaments" />
            </div>

            {isOpen && <span className={styles.bgHoverTextFirst}>Tournaments</span>}
          </Link>
        </li>
        {/* <li>
          <a href="#section2" className={styles.bgHover}>
            <div className={styles.bgHoverIcon}>
              <img src={planner} alt="Planner" />
            </div>
            {isOpen && <span>Planner</span>}
          </a>
        </li> */}
        <li>
          <Link to="/favourites">
            <div className={styles.bgHoverIcon}>
              <img src={favourites} alt="Favourites" />
            </div>
            {isOpen && <span>Favourites</span>}
          </Link>
        </li>
        <li>
          <Link to="/registered">
            <div className={styles.bgHoverIcon}>
              <img src={registered} alt="Registered" />
            </div>
            {isOpen && <span>Registered</span>}
          </Link>
        </li>
        <li>
          <Link to="/skipped">
            <div className={styles.bgHoverIcon}>
              <img src={skipped} alt="Skipped" />
            </div>
            {isOpen && <span>Skipped</span>}
          </Link>
        </li>
        <li>
          <Link to="/alarm">
            <div className={styles.bgHoverIcon}>
              <img src={alarm} alt="Alarm" />
            </div>
            {isOpen && <span>Alarm</span>}
          </Link>
        </li>
        <li>
          <Link to="/deleted">
            <div className={styles.bgHoverIcon}>
              <img src={deleted} alt="Deleted" />
            </div>
            {isOpen && <span>Deleted</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
