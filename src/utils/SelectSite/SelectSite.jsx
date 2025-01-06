/* eslint-disable react/prop-types */
import styles from "./selectSite.module.css";

const SelectSite = ({ isOpen, setSelectedSite, siteData }) => {
  if (isOpen) {
    return (
      <div className={styles.selectSiteModal}>
        {siteData.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.card}
              onClick={() => setSelectedSite(item)}
            >
              <img src={item.image} alt={`Site ${item.Site}`} />
              <p>{item.network}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default SelectSite;
