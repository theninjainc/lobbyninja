import styles from "./size.module.css";

// eslint-disable-next-line react/prop-types
const Size = ({ isOpenSize, setSelectedSize }) => {
  if (isOpenSize) {
    return (
      <div className={styles.size}>
        <div>
          <button className={styles.firstButton} onClick={()=>setSelectedSize(1)}>2</button>
          <button className={styles.secondButton} onClick={()=>setSelectedSize(2)}>3-5</button>
          <button className={styles.thirdButton} onClick={()=>setSelectedSize(3)}>6</button>
          <button className={styles.fourthButton} onClick={()=>setSelectedSize(4)}>7 to 10</button>
        </div>
      </div>
    );
  }
};

export default Size;
