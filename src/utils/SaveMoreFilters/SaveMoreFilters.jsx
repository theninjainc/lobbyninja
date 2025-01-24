import styles from "./SaveMoreFilters.module.css";
import { useState } from "react";

const SaveMoreFilters = ({ close, activeFilters, email, origin }) => {
  const stylesByOrigin = {
    MoreFilters: {
      position: "absolute",
      top: "1800px",
      left: "490px",
    },
    Main: {
      position: "absolute",
      top: "250px",
      left: "490px",
    },
  };

  const modalStyle = stylesByOrigin[origin] || {};

  const [nameFilter, setNameFilter] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!nameFilter.trim()) {
      alert("Por favor, insira um nome para o filtro.");
      return;
    }

    setIsSaving(true);
    console.log(activeFilters);
    const filterData = {
      NameFilter: nameFilter,
      SearchNameTournaments: activeFilters.searchNameTournaments,
      MinBuyIn: Number(activeFilters.buyInMin) || Number(activeFilters.minBuyIn),
      MaxBuyIn: Number(activeFilters.buyInMax) || Number(activeFilters.maxBuyIn),
      Site: activeFilters.selectedSite,
      Speed: activeFilters.selectedSpeed,
      Size: activeFilters.selectedSize,
      BlindsMin: activeFilters.blindsMin,
      BlindsMax: activeFilters.blindsMax,
      ExcludeWords: activeFilters.excludeWords,
      ReEntry: activeFilters.reentry,
      PrizePoolMin: activeFilters.prizePoolMin,
      PrizePoolMax: activeFilters.prizePoolMax,
    };
    console.log(filterData)

    try {
      const response = await fetch("https://ninja.lobby.ninja/api/api/torneios/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, filters: filterData }),
      });

      if (!response.ok) throw new Error("Erro ao salvar o filtro.");

      alert("Filtro salvo com sucesso!");
      close();
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao salvar o filtro. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.saveMoreFilters}  style={modalStyle}>
      <div className={styles.head}>
        <span>Save Filter</span>
      </div>
      <div className={styles.filterName}>
        <label>Filter Name:</label>
        <input
          type="text"
          placeholder="Type here..."
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>
      <div className={styles.btns}>
        <button
          className={styles.saveFilterBtn}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Filter"}
        </button>
        <button className={styles.cancelBtn} onClick={close}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SaveMoreFilters;
