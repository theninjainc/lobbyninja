import styles from "./size.module.css";

// eslint-disable-next-line react/prop-types
const Size = ({ isOpenSize }) => {
  if (isOpenSize) {
    return (
      <div className={styles.size}>
        <div>
          <button className={styles.firstButton}>2</button>
          <button className={styles.secondButton}>3-5</button>
          <button className={styles.thirdButton}>6</button>
          <button className={styles.fourthButton}>7 to 10</button>
        </div>
      </div>
    );
  }
};

export default Size;
