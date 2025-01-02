import styles from "./ChoosePriority.module.css";
const ChoosePriority = () => {
  return (
    <div className={styles.choosePriority}>
      <div className={styles.title}>
        <span>Priority</span>
      </div>
      <div className={styles.select}>
        <label htmlFor="">Choose priority</label>
        <select>
          <option value="">Click Here!</option>
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChoosePriority;
