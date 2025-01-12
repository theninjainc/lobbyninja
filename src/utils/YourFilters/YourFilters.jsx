import styles from "./YourFilters.module.css";
import select from "../../assets/selectSite.svg";
// eslint-disable-next-line react/prop-types
const YourFilters = ({ closeModal }) => {
  return (
    <div className={styles.yourFilters}>
      <div className={styles.head}>
        <span>Your Filters</span>
      </div>
      <div className={styles.selectFilters}>
        <label>Select your filter:</label>
        <select>
          <option value="">Your Filters...</option>
          <option value=""></option>
          <option value=""></option>
        </select>
        <img src={select} className={styles.selectIcon} />
      </div>
      <div className={styles.btns}>
        <button className={styles.applyFilterBtn}>Apply Filter</button>
        <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};
export default YourFilters;
