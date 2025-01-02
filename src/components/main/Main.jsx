import { useState, useEffect } from "react";
import Timer from "../../utils/Timer/Timer";
import styles from "./main.module.css";
import lupa from "../../assets/Lupa.svg";
import save from "../../assets/save.svg";
import manageColumns from "../../assets/manageColumns.svg";
import moreFilters from "../../assets/moreFilters.svg";
import searchTournaments from "../../assets/searchTournaments.svg";
import poker888 from "../../assets/siteRed.svg";
import b from "../../assets/image 1.svg";
import c from "../../assets/image 2.svg";
import d from "../../assets/image 3.svg";
import e from "../../assets/image 4.svg";
import f from "../../assets/image 5.svg";
import g from "../../assets/image 6.svg";
import h from "../../assets/image 7.svg";
import i from "../../assets/image 8.svg";
import j from "../../assets/image 9.svg";
import SelectSite from "../../utils/SelectSite/SelectSite";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";
import Speed from "../../utils/Speed/Speed";
import Size from "../../utils/Size/Size";
import engine from "../../assets/engine.svg";
import ToggleThemeBtn from "../../utils/ToggleThemeBtn/ToggleThemeBtn";
import SpeedMap from "../../utils/SpeedMap/SpeedMap";
import FormatNumber from "../../utils/FormatNumber/FormatValue";
import CostumizeColumns from "../../utils/CostumizeColumns/CostumizeColumns";
import MoreFilters from "../../utils/MoreFilters/MoreFilters";
import NewAlarm from "../../utils/NewAlarm/NewAlarm";
import Options from "../../utils/Options/Options";
import ChoosePriority from "../../utils/ChoosePriority/ChoosePriority";

const PAGE_SIZE = 20;

const Main = () => {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  // Função para buscar os itens da API
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/torneios/api/activeTournaments"
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados");
      }

      const data = await response.json(); // Essa linha é importante
      console.log(data); // Para conferir se os dados estão chegando corretamente
      setOrderList(data); // Atualize o estado com os dados
    } catch (error) {
      setError(error.message); // Atualiza o estado com o erro
    }
  };

  // Função para obter os itens da página atual
  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = currentPage * PAGE_SIZE;
    console.log(orderList[0]);
    return orderList.slice(startIndex, endIndex);
  };

  // Chama a função de buscar os dados ao carregar o componente
  useEffect(() => {
    fetchOrders();
  }, []);

  const allFilters = [
    "Site",
    "Start",
    "Buy In",
    "Name",
    "Prize Pool",
    "Max Reentry",
    "Blinds",
    "Speed",
    "Field",
    "End",
    "Mlr",
    "TableSize",
    "Priority",
  ];

  //Modals
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSpeed, setIsOpenSpeed] = useState(false);
  const [isOpenSize, setIsOpenSize] = useState(false);
  const [isOpenCostumizeColumns, setIsOpenCostumizeColumns] = useState(false);
  const [moreFiltersisOpen, setMoreFiltersisOpen] = useState(false);
  const [isOpenNewAlarm, setIsOpenNewAlarm] = useState(false);

  const openNewAlarm = () => {
    setIsOpenNewAlarm(true);
  };

  const closeNewAlarm = () => {
    setIsOpenNewAlarm(false);
  };

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };
  const toggleOpenSpeed = () => {
    setIsOpenSpeed((prevState) => !prevState);
  };
  const toggleOpenSize = () => {
    setIsOpenSize((prevState) => !prevState);
  };

  //Filter Buttons
  const [orderNameFilter, setOrderNameFilter] = useState("asc");
  const [orderBuyInFilter, setOrderBuyInFilter] = useState("asc");
  const [orderBlindsFilter, setOrderBlindsFilter] = useState("asc");
  const [orderMaxReentryFilter, setOrderMaxReentryFilter] = useState("asc");
  const [orderPriorityFilter, setOrderPriorityFiter] = useState("asc");
  const [orderTableSizeFilter, setOrderTableSizeFilter] = useState("asc");
  const [orderFieldFilter, setOrderFieldFilter] = useState("asc");
  const [orderSiteFilter, setOrderSiteFilter] = useState("asc");
  const [orderStartFilter, setOrderStartFilter] = useState("asc");
  const [orderEndFilter, setOrderEndFilter] = useState("asc");
  const [orderSpeedFilter, setOrderSpeedFilter] = useState("asc");
  const [orderPrizePool, setOrderPrizePool] = useState("asc");
  const [allowedFilters, setAllowedFilters] = useState();

  const orderedListPrizePool = () => {
    const newListPrizePool = [...orderList];
    newListPrizePool.sort((a, b) =>
      orderPrizePool === "asc"
        ? a.prizePool - b.prizePool
        : b.prizePool - a.prizePool
    );

    setOrderList(newListPrizePool);
    setOrderPrizePool(orderPrizePool === "asc" ? "desc" : "asc");
  };

  const orderedListSpeed = () => {
    const newListSpeed = [...orderList];

    newListSpeed.sort((a, b) =>
      orderSpeedFilter === "asc" ? a.speed - b.speed : b.speed - a.speed
    );

    setOrderList(newListSpeed);
    setOrderSpeedFilter(orderSpeedFilter === "asc" ? "desc" : "asc");
  };

  const orderedListEnd = () => {
    const newListEnd = [...orderList];
    const newOrderEndFilter = orderEndFilter === "asc" ? "desc" : "asc";

    newListEnd.sort((a, b) => {
      const hoursA = a.end.split(":").map(Number);
      const hoursB = b.end.split(":").map(Number);

      const minutesA = hoursA[0] * 60 + hoursA[1];
      const minutesB = hoursB[0] * 60 + hoursB[1];

      return newOrderEndFilter === "asc"
        ? minutesA - minutesB
        : minutesB - minutesA;
    });

    setOrderEndFilter(newOrderEndFilter);
    setOrderList(newListEnd);
  };

  const orderedListStart = () => {
    const newListStart = [...orderList];
    const newOrderStartFilter = orderStartFilter === "asc" ? "desc" : "asc";

    newListStart.sort((a, b) => {
      const hoursA = a.start.split(":").map(Number);
      const hoursB = b.start.split(":").map(Number);

      const minutesA = hoursA[0] * 60 + hoursA[1];
      const minutesB = hoursB[0] * 60 + hoursB[1];

      return newOrderStartFilter === "asc"
        ? minutesA - minutesB
        : minutesB - minutesA;
    });

    setOrderStartFilter(newOrderStartFilter);
    setOrderList(newListStart);
  };

  const orderedListSite = () => {
    const newListSite = [...orderList];
    newListSite.sort((a, b) =>
      orderSiteFilter === "asc"
        ? a.site.localeCompare(b.site)
        : b.site.localeCompare(a.site)
    );
    setOrderList(newListSite);
    setOrderSiteFilter(orderSiteFilter === "asc" ? "desc" : "asc");
  };

  const orderedListField = () => {
    const newListField = [...orderList];
    newListField.sort((a, b) =>
      orderFieldFilter === "asc" ? a.field - b.field : b.field - a.field
    );
    setOrderList(newListField);
    setOrderFieldFilter(orderFieldFilter === "asc" ? "desc" : "asc");
  };

  const orderedListTableSize = () => {
    const newListTableSize = [...orderList];
    newListTableSize.sort((a, b) =>
      orderTableSizeFilter === "asc"
        ? a.tableSize - b.tableSize
        : b.tableSize - a.tableSize
    );
    setOrderList(newListTableSize);
    setOrderTableSizeFilter(orderTableSizeFilter === "asc" ? "desc" : "asc");
  };

  const orderedListPriority = () => {
    const newListPriority = [...orderList];
    newListPriority.sort((a, b) =>
      orderPriorityFilter === "asc"
        ? a.priority - b.priority
        : b.priority - a.priority
    );
    setOrderList(newListPriority);
    setOrderPriorityFiter(orderPriorityFilter === "asc" ? "desc" : "asc");
  };

  const orderedListMaxReentry = () => {
    const newListMaxReentry = [...orderList];
    newListMaxReentry.sort((a, b) =>
      orderMaxReentryFilter === "asc"
        ? a.MaxReentry - b.MaxReentry
        : b.MaxReentry - a.MaxReentry
    );
    setOrderList(newListMaxReentry);
    setOrderMaxReentryFilter(orderMaxReentryFilter === "asc" ? "desc" : "asc");
  };

  const orderedListName = () => {
    const newList = [...orderList];
    console.log(newList[0].Name);
    newList.sort((a, b) =>
      orderNameFilter === "asc"
        ? a.Name.localeCompare(b.Name)
        : b.Name.localeCompare(a.Name)
    );
    setOrderList(newList);
    setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
  };

  const orderedListBuyIn = () => {
    const newListBuyIn = [...orderList];
    newListBuyIn.sort((a, b) =>
      orderBuyInFilter === "asc" ? a.BuyIn - b.BuyIn : b.BuyIn - a.BuyIn
    );
    setOrderList(newListBuyIn);
    setOrderBuyInFilter(orderBuyInFilter === "asc" ? "desc" : "asc");
  };

  const orderedBlinds = () => {
    const newListBlinds = [...orderList];
    newListBlinds.sort((a, b) =>
      orderBlindsFilter === "asc" ? a.Blinds - b.Blinds : b.Blinds - a.Blinds
    );
    setOrderList(newListBlinds);
    setOrderBlindsFilter(orderBlindsFilter === "asc" ? "desc" : "asc");
  };

  //SelecionedFilters
  const [activeFilter, setActiveFilter] = useState(null);
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filterButtons = [
    {
      label: "Site",
      className: styles.filterSiteBtn,
      isActive: activeFilter === "filterSiteBtn",
      onClick: () => {
        orderedListSite();
        handleFilterClick("filterSiteBtn");
      },
    },
    {
      label: "Start",
      className: styles.filterStartBtn,
      isActive: activeFilter === "filterStartBtn",
      onClick: () => {
        orderedListStart();
        handleFilterClick("filterStartBtn");
      },
    },
    {
      label: "Buy In",
      className: styles.filterBuyInBtn,
      isActive: activeFilter === "filterBuyInBtn",
      onClick: () => {
        orderedListBuyIn();
        handleFilterClick("filterBuyInBtn");
      },
    },
    {
      label: "Name",
      className: styles.filterNameBtn,
      isActive: activeFilter === "filterNameBtn",
      onClick: () => {
        orderedListName();
        handleFilterClick("filterNameBtn");
      },
    },
    {
      label: "Prize Pool",
      className: styles.filterPrizePoolBtn,
      isActive: activeFilter === "filterPrizePoolBtn",
      onClick: () => {
        orderedListPrizePool();
        handleFilterClick("filterPrizePoolBtn");
      },
    },
    {
      label: "Max Reentry",
      className: styles.filterMaxReentryBtn,
      isActive: activeFilter === "filterMaxReentryBtn",
      onClick: () => {
        orderedListMaxReentry();
        handleFilterClick("filterMaxReentryBtn");
      },
    },
    {
      label: "Blinds",
      className: styles.filterBlindsBtn,
      isActive: activeFilter === "filterBlindsBtn",
      onClick: () => {
        orderedBlinds();
        handleFilterClick("filterBlindsBtn");
      },
    },
    {
      label: "Speed",
      className: styles.filterSpeedBtn,
      isActive: activeFilter === "filterSpeedBtn",
      onClick: () => {
        orderedListSpeed();
        handleFilterClick("filterSpeedBtn");
      },
    },
    {
      label: "Field",
      className: styles.filterFieldBtn,
      isActive: activeFilter === "filterFieldBtn",
      onClick: () => {
        orderedListField();
        handleFilterClick("filterFieldBtn");
      },
    },
    {
      label: "End",
      className: styles.filterEndBtn,
      isActive: activeFilter === "filterEndBtn",
      onClick: () => {
        orderedListEnd();
        handleFilterClick("filterEndBtn");
      },
    },
    {
      label: "Mlr",
      className: styles.filterMlrBtn,
      isActive: activeFilter === "filterMlrBtn",
      onClick: () => {
        orderedListStart();
        handleFilterClick("filterMlrBtn");
      },
    },
    {
      label: "TableSize",
      className: styles.filterTableSizeBtn,
      isActive: activeFilter === "filterTableSizeBtn",
      onClick: () => {
        orderedListTableSize();
        handleFilterClick("filterTableSizeBtn");
      },
    },
    {
      label: "Priority",
      className: styles.filterPriorityBtn,
      isActive: activeFilter === "filterPriorityBtn",
      onClick: () => {
        orderedListPriority();
        handleFilterClick("filterPriorityBtn");
      },
    },
  ];

  const [searchNameTournaments, setSearchNameTournaments] = useState("");
  const [minBuyIn, setMinBuyIn] = useState();
  const [maxBuyIn, setMaxBuyIn] = useState();
  const [selectedSite, setSelectedSite] = useState();
  const [selectedSpeed, setSelectedSpeed] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const handleFilter = () => {
    let filteredList = orderList;

    if (searchNameTournaments) {
      filteredList = filteredList.filter((item) =>
        item.Name.toLowerCase().includes(searchNameTournaments.toLowerCase())
      );
    }

    if (minBuyIn) {
      filteredList = filteredList.filter(
        (item) => item.BuyIn >= Number(minBuyIn)
      );
    }

    if (maxBuyIn) {
      filteredList = filteredList.filter(
        (item) => item.buyIn <= Number(maxBuyIn)
      );
    }

    if (selectedSite) {
      filteredList = filteredList.filter((item) =>
        item.site.includes(selectedSite.site)
      );
    }

    if (selectedSpeed) {
      filteredList = filteredList.filter(
        (item) => item.speed === selectedSpeed
      );
    }

    if (selectedSize) {
      switch (selectedSize) {
        case 1:
          filteredList = filteredList.filter((item) => item.tableSizeize === 2);
          break;
        case 2:
          filteredList = filteredList.filter(
            (item) => item.tableSize >= 3 && item.tableSize <= 5
          );
          break;
        case 3:
          filteredList = filteredList.filter((item) => item.tableSize === 6);
          break;
        case 4:
          filteredList = filteredList.filter(
            (item) => item.tableSize >= 7 && item.tableSize <= 10
          );
          break;
        default:
          filteredList;
      }
    }
    setOrderList(filteredList);
  };
  const applyFilters = () => {};
  return (
    <>
      <div className={styles.main}>
        {moreFiltersisOpen && (
          <MoreFilters
            closeModal={() => setMoreFiltersisOpen(false)}
            orderList={orderList}
            setOrderList={setOrderList}
            applyFilters={applyFilters}
          />
        )}
        <CostumizeColumns
          isOpen={isOpenCostumizeColumns}
          closeModal={() => setIsOpenCostumizeColumns(false)}
          onColumnsChange={(updatedColumns) =>
            setAllowedFilters(updatedColumns)
          }
        />

        <div
          className={`${styles.main} ${
            moreFiltersisOpen === true || isOpenCostumizeColumns === true
              ? styles.blur
              : styles.noBlur
          }`}
        >
          <div className={styles.navbar}>
            <div className={styles.titlef}>Tournament List</div>
            <div className={styles.btns}>
              <div className={styles.btns}>
                <div>
                  <ToggleThemeBtn />
                </div>
                <div>
                  <button className={styles.navEngineBtn}>
                    <img src={engine} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.searchbar}>
          <div className={styles.searchleft}>
            <label htmlFor="search" className={styles.label}>
              <img src={searchTournaments} alt="Search Tournaments" />
              <input
                type="search"
                className={styles.search}
                onChange={() => setSearchNameTournaments(event.target.value)}
                placeholder="Search tournaments..."
                id="search"
              />
            </label>
            <label htmlFor="site" className={styles.labelSelectSite}>
              <button
                name="site"
                id="site"
                className={styles.selectSite}
                onClick={() => toggleOpen(true)}
              >
                {selectedSite ? (
                  <div className={styles.selectedSite}>
                    <img
                      src={selectedSite.site}
                      alt={`Site ${selectedSite.name}`}
                    />
                    <p>{selectedSite.name}</p>
                  </div>
                ) : (
                  "Select Site"
                )}
              </button>
            </label>
            <SelectSite
              isOpen={isOpen}
              orderList={orderList}
              setSelectedSite={setSelectedSite}
            />
            <div className={styles.maxMinSearch}>
              <label htmlFor="min-value" className={styles.labelMaxMinValue}>
                <div>Min $</div>
                <input
                  type="number"
                  id="min-value"
                  name="min-value"
                  placeholder="Type..."
                  onChange={(e) => {
                    setMinBuyIn(e.target.value);
                  }}
                  className={styles.searchMaxMin}
                />
              </label>
            </div>
            <div className={styles.maxMinSearch}>
              <label htmlFor="max-value" className={styles.labelMaxMinValue}>
                <div>Max $</div>
                <input
                  type="number"
                  id="max-value"
                  name="max-value"
                  placeholder="Type..."
                  onChange={(e) => {
                    setMaxBuyIn(e.target.value);
                  }}
                  className={styles.searchMaxMin}
                />
              </label>
            </div>
            <label htmlFor="speed" className={styles.labelSelectSpeed}>
              <button
                name="speed"
                id="speed"
                className={styles.selectSpeed}
                onClick={() => toggleOpenSpeed(true)}
              >
                {selectedSpeed ? (
                  <div className={styles.selectedSpeed}>
                    <img
                      src={
                        selectedSpeed === 1
                          ? slow
                          : selectedSpeed === 2
                          ? regular
                          : selectedSpeed === 3
                          ? turbo
                          : selectedSpeed === 4
                          ? hyper
                          : null
                      }
                    ></img>
                    <p>
                      {selectedSpeed === 1
                        ? "Slow"
                        : selectedSpeed === 2
                        ? "Regular"
                        : selectedSpeed === 3
                        ? "Turbo"
                        : selectedSpeed === 4
                        ? "Hyper"
                        : null}
                    </p>
                  </div>
                ) : (
                  "Speed"
                )}
              </button>
            </label>
            <Speed
              isOpenSpeed={isOpenSpeed}
              setSelectedSpeed={setSelectedSpeed}
            />
            <label htmlFor="size" className={styles.labelSelectSize}>
              <button
                name="size"
                id="size"
                className={styles.selectSize}
                onClick={() => toggleOpenSize(true)}
              >
                {selectedSize ? (
                  <p className={styles.searchSizeBtn}>
                    {selectedSize === 1
                      ? "2"
                      : selectedSize === 2
                      ? "3-5"
                      : selectedSize === 3
                      ? "6"
                      : selectedSize === 4
                      ? "7 to 10"
                      : null}
                  </p>
                ) : (
                  "Size"
                )}
              </button>
            </label>
            <Size isOpenSize={isOpenSize} setSelectedSize={setSelectedSize} />
            {console.log(selectedSize)}
            <button
              className={styles.searchBtn}
              onClick={() => {
                handleFilter();
              }}
            >
              <img src={lupa} alt="Lupa icon" />{" "}
            </button>
            <button className={styles.saveBtn}>
              <img src={save} alt="Save icon" />
            </button>
          </div>
          <div className={styles.searchRight}>
            <button
              className={styles.manageColumnsBtn}
              onClick={() => setIsOpenCostumizeColumns(true)}
            >
              <div>
                <img src={manageColumns} alt="Manage Columns" />
              </div>
              Manage Columns
            </button>
            <button
              className={styles.moreFiltersBtn}
              onClick={() => setMoreFiltersisOpen(true)}
            >
              <div>
                <img src={moreFilters} alt="More Filters" />
              </div>
              More Filters
            </button>
          </div>
        </div>
        <div className={styles.filterbar}>
          <input type="checkbox" className={styles.filterCheckbox} />
          {filterButtons
            .filter(
              (button) =>
                !allowedFilters || allowedFilters.includes(button.label)
            )
            .sort((a, b) => {
              if (!allowedFilters) return 0;
              return (
                allowedFilters.indexOf(a.label) -
                allowedFilters.indexOf(b.label)
              );
            })
            .map((button, index) => (
              <button
                key={index}
                className={`${button.className} ${
                  button.isActive ? styles.active : ""
                }`}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
        </div>
        <table>
          <tbody>
            <tr>
              {getPaginatedOrders().map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "transparent"
                        : "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <td className={styles.stylesCheckboxTable}>
                    <FavouriteStar className={styles.favouriteStar} />
                    <input type="checkbox" className={styles.checkBoxTable} />
                  </td>
                  {(allowedFilters || allFilters).map((filter) => (
                    <td
                      key={filter}
                      className={
                        styles[`${filter.toLowerCase().replace(/ /g, "")}Table`]
                      }
                    >
                      {filter === "Site" && item.Site && (
                        <img
                          src={
                            item.Site === "888Poker" ? "poker888" : item.Site
                          }
                          alt="site logo"
                        />
                      )}

                      {filter === "Start" &&
                        (item.Start
                          ? new Date(item.Start).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-")}

                      {filter === "Buy In" &&
                        (item.BuyIn ? `$${item.BuyIn}` : "-")}

                      {filter === "Name" && (item.Name ? item.Name : "-")}

                      {filter === "Prize Pool" &&
                        (item.PrizePool ? `$${item.PrizePool}` : "-")}

                      {filter === "Max Reentry" &&
                        (item.MaxReentry ? item.MaxReentry : "-")}

                      {filter === "Blinds" && (item.Blinds ? item.Blinds : "-")}

                      {filter === "Speed" &&
                        (item.Speed ? <SpeedMap speed={item.Speed} /> : "-")}

                      {filter === "Field" && (item.Field ? item.Field : "-")}

                      {filter === "End" && (item.End ? item.End : "-")}

                      {filter === "Mlr" &&
                        (item.Start ? (
                          <Timer
                            startEvent={new Date(item.Start).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          />
                        ) : (
                          "-"
                        ))}

                      {filter === "TableSize" &&
                        (item.TableSize ? item.TableSize : "-")}

                      {filter === "Priority" &&
                        (item.Priority ? item.Priority : "-")}
                    </td>
                  ))}
                </div>
              ))}
            </tr>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span>Página {currentPage}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * PAGE_SIZE >= orderList.length}
              >
                Próxima
              </button>
            </div>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Main;
