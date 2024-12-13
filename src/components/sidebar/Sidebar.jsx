import styles from "./sidebar.module.css";
import lobbyNinjaLogo from "../../assets/lobbyNinjaLogo.svg";
import favourites from "../../assets/favourites.svg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={lobbyNinjaLogo} />
      </div>


      <div className={styles.bgFirstLi}>
          <a href="#section1">
           
            
          </a>
        </div>

      <ul className="">
        <li>
          <a href="#section2" className={styles.marginCorrection}>2</a>
        </li>
        <li>
          <a href="#section3">
            <img src={favourites} alt="" />
          </a>
        </li>
        <li>
          <a href="#section4">4</a>
        </li>
        <li>
          <a href="#section5">5</a>
        </li>
        <li>
          <a href="#section6">6</a>
        </li>
        <li>
          <a href="#section7">7</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
