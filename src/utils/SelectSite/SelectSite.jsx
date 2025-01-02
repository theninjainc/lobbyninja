/* eslint-disable react/prop-types */
import styles from "./selectSite.module.css";

const SelectSite = ({ isOpen, orderList, setSelectedSite }) => {
  if (isOpen) {
    return (
      <div className={styles.selectSiteModal}>
        {orderList.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => setSelectedSite(item)}
          >
            <img src={item.site} alt={`Site ${item.name}`} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default SelectSite;
