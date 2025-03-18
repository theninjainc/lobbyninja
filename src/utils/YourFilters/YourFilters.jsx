import React, { useState, useEffect } from "react";
import styles from "./YourFilters.module.css";
import select from "../../assets/selectSite.svg";

// eslint-disable-next-line react/prop-types
const YourFilters = ({ closeModal, email, orderList, setOrderList, setSelectedSites, setMinBuyIn, setMaxBuyIn, setSearchNameTournaments, setSelectedSize, setSelectedSpeed, siteData }) => {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("https://lobby.ninja/api/api/torneios/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        if (response.ok) {
          setFilters(data);
          setError("");
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Erro ao carregar os filtros: " + error.message);
      }
    };

    fetchFilters();
  }, [email]);

  const handleFilterSelection = (e) => {
    const selectedFilterId = e.target.value;
    const selectedFilter = filters.find((filter) => filter.$id === selectedFilterId);

    if (selectedFilter) {
      setSelectedFilters(selectedFilter);

      const formattedSites = siteData.filter((site) =>
        selectedFilter.Site.includes(site.network)
      );

      console.log("Teste", formattedSites)
      setSelectedSites(formattedSites || []);
      setMinBuyIn(selectedFilter.MinBuyIn || "");
      setMaxBuyIn(selectedFilter.MaxBuyIn || "");
      setSelectedSpeed(selectedFilter.Speed || []);
      setSelectedSize(selectedFilter.Size || []);
      setSearchNameTournaments(selectedFilter.SearchNameTournaments || "");
    }
  };

  const handleApplyFilter = () => {
    let filteredList = orderList;

    console.log(selectedFilters)

    if (selectedFilters.Site && selectedFilters.Site.length > 0) {
      filteredList = filteredList.filter((item) =>
        selectedFilters.Site.includes(item.Site)
      );
    }

    if (selectedFilters.SearchNameTournaments) {
      filteredList = filteredList.filter(
        (item) =>
          item.Name &&
          item.Name.toLowerCase().includes(selectedFilters.SearchNameTournaments.toLowerCase())
      );
    }

    if (selectedFilters.MinBuyIn) {
      filteredList = filteredList.filter((item) => Number(item.BuyIn) >= selectedFilters.MinBuyIn);
    }
    if (selectedFilters.MaxBuyIn) {
      filteredList = filteredList.filter((item) => Number(item.BuyIn) <= selectedFilters.MaxBuyIn);
    }
    if (selectedFilters.PrizePoolMin) {
      filteredList = filteredList.filter((item) => Number(item.PrizePool) >= selectedFilters.PrizePoolMin);
    }
    if (selectedFilters.PrizePoolMax) {
      filteredList = filteredList.filter((item) => Number(item.PrizePool) <= selectedFilters.PrizePoolMax);
    }
    if (selectedFilters.Size && selectedFilters.Size.length > 0) {
      filteredList = filteredList.filter((item) => {
        // Verifica se o valor de TableSize do item está dentro dos intervalos especificados
        return selectedFilters.Size.some((size) => {
          switch (size) {
            case 1:
              return item.TableSize === 2;
            case 2:
              return item.TableSize >= 3 && item.TableSize <= 5;
            case 3:
              return item.TableSize >= 6;
            case 4:
              return item.TableSize >= 7 && item.TableSize <= 10;
            default:
              return false;
          }
        });
      });
    }
    if (selectedFilters.BlindsMin) {
      filteredList = filteredList.filter((item) => item.Blinds >= selectedFilters.BlindsMin);
    }
    if (selectedFilters.BlindsMax) {
      filteredList = filteredList.filter((item) => item.Blinds <= selectedFilters.BlindsMax);
    }
    if (selectedFilters.ReEntry === "allowed") {
      filteredList = filteredList.filter((item) => item.MaxReentry === "Yes");
    } else if (selectedFilters.ReEntry === "notAllowed") {
      filteredList = filteredList.filter((item) => item.MaxReentry === "No");
    }
    if (selectedFilters.Speed && selectedFilters.Speed.length > 0) {
      filteredList = filteredList.filter((item) =>
        selectedFilters.Speed.includes(item.Speed)
      );
    }
    if (selectedFilters.ExcludeWords) {
      filteredList = filteredList.filter(
        (item) => !item.Name.toLowerCase().includes(selectedFilters.ExcludeWords.toLowerCase())
      );
    }
    if (selectedFilters.Priority) {
      filteredList = filteredList.filter((item) => item.priority === selectedFilters.Priority);
    }

    setOrderList(filteredList);
    closeModal();
  };

  return (
    <div className={styles.yourFilters}>
      <div className={styles.head}>
        <span>Your Filters</span>
      </div>
      <div className={styles.selectFilters}>
        <label>Select your filter:</label>
        <select onChange={handleFilterSelection}>
          <option value="">Select Filter...</option>
          {Array.isArray(filters) && filters.length > 0 ? (
            filters.map((filter) => (
              <option key={filter.$id} value={filter.$id}>
                {filter.NameFilter}
              </option>
            ))
          ) : (
            <option disabled>No filters available</option>
          )}
        </select>
      </div>
      <div className={styles.btns}>
        <button className={styles.applyFilterBtn} onClick={handleApplyFilter}>
          Apply Filter
        </button>
        <button className={styles.cancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default YourFilters;
