import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="../../assets/logo-temporary.png" alt="temporary" />
      </div>

    
      <ul className="">
          <li>
            <a href="#section1">1</a>
          </li>
        <li>
          <a href="#section2">2</a>
        </li>
        <li>
          <a href="#section3">3</a>
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
