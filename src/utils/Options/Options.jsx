import styles from "./Options.module.css";
import skipped from "../../assets/skipped.svg"
import alarm from "../../assets/alarm.svg";
import threeLine from "../../assets/threeLine.svg";
import star from "../../assets/favourites.svg";
import deleted from "../../assets/delete.svg";

const Options = () => {
  return (
    <div className={styles.options}>
      <div className={styles.selectedTournaments}> x Tournaments Selected</div>
      <div className={styles.skipped}><button><img src={skipped} alt="" /></button></div>
      <div className={styles.border}></div>
      <div className={styles.alarm}><button><img src={alarm} alt="" /></button></div>
      <div className={styles.border}></div>
      <div className={styles.threeLine}><button><img src={threeLine} alt="" /></button></div>
      <div className={styles.border}></div>
      <div className={styles.star}><button><img src={star} alt="" /></button></div>
      <div className={styles.border}></div>
      <div className={styles.delete}><button><img src={deleted} alt="" /></button></div>
    </div>
  );
};

export default Options;
