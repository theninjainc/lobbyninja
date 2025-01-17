import React, { useState, useEffect } from "react";
import styles from "./YourFilters.module.css";
import select from "../../assets/selectSite.svg";

// eslint-disable-next-line react/prop-types
const YourFilters = ({ closeModal, email, orderList, setOrderList }) => {
  const [filters, setFilters] = useState([]); // Estado para armazenar os filtros
  const [selectedFilters, setSelectedFilters] = useState({}); // Estado para armazenar o filtro selecionado
  const [error, setError] = useState(""); // Para exibir erros

  useEffect(() => {
    // Função para buscar os filtros ao carregar o componente
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/torneios/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        if (response.ok) {
          setFilters(data); // Atualiza o estado com os filtros recebidos
          setError(""); // Limpa o erro
        } else {
          setError(data.error); // Exibe o erro se algo der errado
        }
      } catch (error) {
        setError("Erro ao carregar os filtros: " + error.message); // Erro de rede ou outro
      }
    };

    fetchFilters(); // Chama a função para buscar os filtros
  }, [email]); // Só chama isso novamente se o email mudar

  const handleFilterSelection = (e) => {
    const selectedFilterId = e.target.value; // ID do filtro selecionado
    const selectedFilter = filters.find((filter) => filter.$id === selectedFilterId); // Busca no array de filtros

    if (selectedFilter) {
      setSelectedFilters(selectedFilter); // Atualiza o estado com todos os dados do filtro selecionado
    }
  };

  const handleApplyFilter = () => {
    // Filtrando a lista de torneios com base nos filtros selecionados
    let filteredList = orderList;

    if (selectedFilters.Site) {
      filteredList = filteredList.filter((item) => item.Site === selectedFilters.Site);
    }

    if (selectedFilters.SearchNameTournaments) {
      filteredList = filteredList.filter(
        (item) =>
          item.Name &&
          item.Name.toLowerCase().includes(selectedFilters.SearchNameTournaments.toLowerCase())
      );
    }

    if (selectedFilters.BuyInMin) {
      filteredList = filteredList.filter((item) => Number(item.BuyIn) >= selectedFilters.BuyInMin);
    }
    if (selectedFilters.BuyInMax) {
      filteredList = filteredList.filter((item) => Number(item.BuyIn) <= selectedFilters.bByInMax);
    }
    if (selectedFilters.PrizePoolMin) {
      filteredList = filteredList.filter((item) => Number(item.PrizePool) >= selectedFilters.prizePoolMin);
    }
    if (selectedFilters.PrizePoolMax) {
      filteredList = filteredList.filter((item) => Number(item.PrizePool) <= selectedFilters.PrizePoolMax);
    }
    if (selectedFilters.Size) {
      filteredList = filteredList.filter((item) => item.TableSize === selectedFilters.Size);
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
    if (selectedFilters.Speed) {
      filteredList = filteredList.filter((item) => item.Speed === selectedFilters.Speed);
    }
    if (selectedFilters.ExcludeWords) {
      filteredList = filteredList.filter(
        (item) => !item.Name.toLowerCase().includes(selectedFilters.ExcludeWords.toLowerCase())
      );
    }
    if (selectedFilters.EndTime) {
      filteredList = filteredList.filter((item) => item.end === selectedFilters.EndTime);
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
                {filter.NameFilter} {/* Exibe o nome do filtro */}
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
      {error && <div className={styles.error}>{error}</div>} {/* Exibe o erro, se houver */}
    </div>
  );
};

export default YourFilters;
