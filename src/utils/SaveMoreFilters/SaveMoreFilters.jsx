import styles from "./SaveMoreFilters.module.css";
import { useState } from "react";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
      iziToast.error({
        title: "Erro",
        message: "Por favor, insira um nome para o filtro.",
        position: "topRight",
        timeout: 5000,
      });
      return;
    }

    setIsSaving(true);
    iziToast.info({
      title: "Aguarde",
      message: "Estamos salvando o filtro...",
      timeout: 5000,
      position: "topRight",
      id: "loading-toast",
    });
    console.log("tubaru", activeFilters);
    const filterData = {
      NameFilter: nameFilter,
      SearchNameTournaments: activeFilters.searchNameTournaments,
      MinBuyIn: Number(activeFilters.buyInMin) || Number(activeFilters.minBuyIn),
      MaxBuyIn: Number(activeFilters.buyInMax) || Number(activeFilters.maxBuyIn),
      Site: activeFilters.selectedSites,
      Speed: activeFilters.selectedSpeed,
      Size: activeFilters.selectedSize,
      BlindsMin: activeFilters.blindsMin,
      BlindsMax: activeFilters.blindsMax,
      ExcludeWords: activeFilters.excludeWords,
      ReEntry: activeFilters.reentry,
      PrizePoolMin: activeFilters.prizePoolMin,
      PrizePoolMax: activeFilters.prizePoolMax,
    };
    console.log(filterData);

    try {
      const response = await fetch("https://ninja.lobby.ninja/api/api/torneios/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, filters: filterData }),
      });

      if (!response.ok) throw new Error("Erro ao salvar o filtro.");

      iziToast.success({
        title: "Sucesso",
        message: "Filtro salvo com sucesso!",
        position: "topRight",
        timeout: 5000,
      });

      close();
    } catch (error) {
      console.error(error);
      iziToast.error({
        title: "Erro",
        message: "Houve um erro ao salvar o filtro. Tente novamente.",
        position: "topRight",
        timeout: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.saveMoreFilters} style={modalStyle}>
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
