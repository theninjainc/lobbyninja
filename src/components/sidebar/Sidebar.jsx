import styles from "./sidebar.module.css";
import lobbyNinjaLogo from "../../assets/lobbyNinjaLogo.svg";
import favourites from "../../assets/favourites.svg";
import tornauments from "../../assets/tournaments.svg";
import planner from "../../assets/planner.svg";
import registered from "../../assets/registered.svg";
import skipped from "../../assets/skipped.svg";
import alarm from "../../assets/alarm.svg";
import deleted from "../../assets/deleted.svg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={lobbyNinjaLogo} />
      </div>

      <ul className="">
        <li className={styles.bgFirstLi}>
          <a href="#section1">
            <img src={tornauments} alt="Tournaments" />
          </a>
        </li>
        <li>
          <a href="#section2">
            <img src={planner} alt="Planner" />
          </a>
        </li>
        <li>
          <a href="#section3">
            <img src={favourites} alt="" />
          </a>
        </li>
        <li>
          <a href="#section4">
            <img src={registered} alt="Registered" />
          </a>
        </li>
        <li>
          <a href="#section5">
            <img src={skipped} alt="Skipped" />
          </a>
        </li>
        <li>
          <a href="#section6">
            <img src={alarm} alt="Alarm" />
          </a>
        </li>
        <li>
          <a href="#section7">
            <img src={deleted} alt="Deleted" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
