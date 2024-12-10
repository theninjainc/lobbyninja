import styles from "./main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <div className={styles.title}>Tournament List</div>
        <div className={styles.btns}>
          <ul>
            <li>
              <button>Button1</button>
            </li>
            <li>
              <button>Button2</button>
            </li>
            <li>
              <button>Button3</button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.searchbar}></div>
    </div>
  );
};

export default Main;
