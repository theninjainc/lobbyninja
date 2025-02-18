/* eslint-disable react/prop-types */
import styles from "./selectSite.module.css";

const SelectSite = ({ isOpen, setSelectedSites, siteData, selectedSites }) => {
  console.log("Lindo", selectedSites)
  if (isOpen) {
  const toggleSiteSelection = (site) => {
    setSelectedSites((prev) => {
      if (prev.some((selected) => selected.network === site.network)) {
        // Se já estiver selecionado, remove
        return prev.filter((selected) => selected.network !== site.network);
      } else {
        // Adiciona o site à seleção
        return [...prev, site];
      }
    });
  };

    return (
      <div className={styles.selectSiteModal}>
        {siteData.map((item, index) => {
          const isSelected = selectedSites.some(
            (selected) => selected.network === item.network
          );

          return (
            <div
              key={index}
              className={`${styles.card} ${isSelected ? styles.selected : ""
                }`}
              onClick={() => toggleSiteSelection(item)}
            >
              <img src={item.image} alt={`Site ${item.network}`} />
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
