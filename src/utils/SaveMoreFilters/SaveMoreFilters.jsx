import styles from "./SaveMoreFilters.module.css";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SaveMoreFilters = ({close}) => {
  const [nameFilter, setNameFilter] = useState();

  return (
    <div className={styles.saveMoreFilters}>
      <div className={styles.head}>
        <span>Save Filter</span>
      </div>
      <div className={styles.filterName}>
        <label>Filter Name:</label>
        <input
          type="text"
          placeholder="Type here..."
          onChange={(e) => {
            setNameFilter(e.target.value);
          }}
        />
      </div>
      <div className={styles.btns}>
        <button className={styles.saveFilterBtn}>Save Filter</button>
        <button className={styles.cancelBtn} onClick={close}>Cancel</button>
      </div>
      {console.log(nameFilter)}
    </div>
  );
};

export default SaveMoreFilters;
