import { useState, useEffect } from "react";
import Timer from "../../utils/Timer/Timer";
import styles from "./main.module.css";
import lupa from "../../assets/Lupa.svg";
import save from "../../assets/save.svg";
import manageColumns from "../../assets/manageColumns.svg";
import moreFilters from "../../assets/moreFilters.svg";
import searchTournaments from "../../assets/searchTournaments.svg";
import poker888 from "../../assets/888poker.svg";
import siteWpn from "../../assets/wpn.svg";
import siteWinamax from "../../assets/siteWinamax.svg";
import sitePokerStars from "../../assets/sitePokerStars.svg";
import sitePartyPoker from "../../assets/sitePartyPoker.svg";
import siteiPoker from "../../assets/siteiPoker.svg";
import siteGGNetwork from "../../assets/siteGGNetwork.svg";
import siteChico from "../../assets/siteChico.svg";
import siteBodog from "../../assets/siteBodog.svg";
import { Account, Client } from "appwrite";
import SelectSite from "../../utils/SelectSite/SelectSite";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";
import Speed from "../../utils/Speed/Speed";
import Size from "../../utils/Size/Size";
import engine from "../../assets/engine.svg";
import ToggleThemeBtn from "../../utils/ToggleThemeBtn/ToggleThemeBtn";
import SpeedMap from "../../utils/SpeedMap/SpeedMap";
import CostumizeColumns from "../../utils/CostumizeColumns/CostumizeColumns";
import MoreFilters from "../../utils/MoreFilters/MoreFilters";
import { Link } from "react-router-dom";
import skipped from "../../assets/skipped.svg";
import alarm from "../../assets/alarm.svg";
import deleted from "../../assets/deleted.svg";
import registered from "../../assets/Frame.png";
import priority from "../../assets/priority.svg";
import { useTheme } from "../../utils/ThemeContext/ThemeContext.jsx";
import SaveMoreFilters from "../../utils/SaveMoreFilters/SaveMoreFilters.jsx";
import YourFilters from "../../utils/YourFilters/YourFilters.jsx";
import past from "../../assets/past.png";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const PAGE_SIZE = 20;

const Main = () => {
  const { isDarkMode } = useTheme();

  const siteData = [
    { network: "888Poker", image: poker888 },
    { network: "WPN", image: siteWpn },
    { network: "Winamax", image: siteWinamax },
    { network: "Winamax.fr", image: siteWinamax },
    { network: "PokerStars", image: sitePokerStars },
    { network: "PartyPoker", image: sitePartyPoker },
    { network: "iPoker", image: siteiPoker },
    { network: "GGNetwork", image: siteGGNetwork },
    { network: "Chico", image: siteChico },
    { network: "Bodog", image: siteBodog },
  ];
  const getPriorityBackgroundColor = (priority) => {
    const colors = {
      1: "rgba(76, 104, 244, 0.2)",
      2: "rgba(0, 144, 255, 0.2)",
      3: "rgba(0, 255, 255, 0.2)",
      4: "rgba(0, 255, 144, 0.2)",
      5: "rgba(0, 255, 42, 0.2)",
      6: "rgba(144, 255, 0, 0.2)",
      7: "rgba(255, 255, 0, 0.2)",
      8: "rgba(255, 144, 0, 0.2)",
      9: "rgba(255, 91, 0, 0.2)",
      10: "rgba(255, 0, 0, 0.2)",
    };
    return colors[priority] || "rgba(0, 0, 0, 0.1)";
  };

  const getPriorityTextColor = (priority) => {
    const colors = {
      1: "#4C68F4",
      2: "#0090FF",
      3: "#00FFFF",
      4: "#00FF90",
      5: "#00FF2A",
      6: "#90FF00",
      7: "#FFFF00",
      8: "#FF9000",
      9: "#FF5B00",
      10: "#FF0000",
    };
    return colors[priority] || "#000";
  };


  const [orderList, setOrderList] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCreateLobby = async (state, priority, itemFavourite) => {
    const client = new Client();
    const account = new Account(client);
    client.setProject("lobbyninja");


    try {
      iziToast.info({
        title: 'Aguarde',
        message: 'Estamos criando o lobby...',
        timeout: 5000,
        position: 'topRight',
        id: 'loading-toast',
      });

      const user = await account.get();
      const email = user.email;

      const itemsToUse = (selectedItems && selectedItems.length > 0)
        ? selectedItems
        : (itemHover ? [itemHover] : [itemFavourite]);

      const lobbyData = {
        email,
        lobbies: itemsToUse.map((item) => ({
          ...item,
          priority,
          registered: state === 3,
          alarm: state === 4,
          skipped: state === 1,
          deleted: state === 2,
          favourite: state === 5,
        })),
      };

      console.log("Enviando lobbyData:", lobbyData);

      const response = await fetch(
        "https://ninja.lobby.ninja/api/api/lobbys/lobbyCreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lobbyData),
        });

      const data = await response.json();

      if (response.ok) {
        // Exibe sucesso
        iziToast.success({
          title: 'Sucesso',
          message: 'Lobby criado com sucesso!',
          position: 'topRight',
          timeout: 5000,
        });
        console.log("Lobby criado com sucesso:", data);
      } else {
        // Exibe erro
        iziToast.error({
          title: 'Erro',
          message: data.error || 'Não foi possível criar o lobby.',
          position: 'topRight',
          timeout: 5000,
        });
        console.error("Erro ao criar lobby:", data.error);
      }
    } catch (error) {

      iziToast.error({
        title: 'Erro',
        message: 'Ocorreu um erro ao criar o lobby. Tente novamente.',
        position: 'topRight',
        timeout: 5000,
      });
      console.error("Erro ao fazer a requisição:", error);
    }
  };



  const toggleItem = (item) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const toggleAllItems = (isChecked) => {
    if (isChecked) {
      setSelectedItems(getPaginatedOrders());
    } else {
      setSelectedItems([]);
    }
  };

  const isMenuVisible = selectedItems.length > 0;

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

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://ninja.lobby.ninja/api/api/torneios/api/activeTournaments"
      );
      if (!response.ok) {
        setIsLoading(false)
        throw new Error("Erro ao buscar os dados");
      }

      const data = await response.json();
      console.log(data)
      const formattedData = data.map(tournament => {
        const startDate = new Date(tournament.Start);
        const formattedStartTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...tournament,
          Start: formattedStartTime,
        };
      });

      setOrderList(formattedData);
      setOrderDate(formattedData);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message);
    }
  };

  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = currentPage * PAGE_SIZE;
    console.log(orderList[0]);
    return orderList.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(orderList.length / PAGE_SIZE);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(1, currentPage - 5);
    let end = Math.min(totalPages, currentPage + 4);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (start > 1) pageNumbers.unshift("...");
    if (end < totalPages) pageNumbers.push("...");

    return pageNumbers;
  };

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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [itemHover, setItemHover] = useState([]);
  const [isMenuLateral, setIsMenuLateralVisible] = useState(false)
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const handleMouseOver = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    console.log(window.scrollY)
    setHoveredItem({
      id: item.ID,
      position: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width - 340,
      },
    });
    setItemHover(item)
    setIsMenuLateralVisible(true);
  };


  const handleMouseOut = (event) => {
    console.log(event.currentTarget)
    console.log(event.relatedTarget)
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsMenuLateralVisible(false);
      setHoveredItem(null);
    }
  };

  const handleMenuMouseEnter = () => {
    setIsMenuHovered(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMenuHovered(false);
    setIsMenuLateralVisible(false);
  };



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
        ? a.PrizePool - b.PrizePool
        : b.PrizePool - a.PrizePool
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
      const timeA = a.Start;
      const timeB = b.Start;

      if (newOrderStartFilter === "asc") {
        return timeA > timeB ? 1 : timeA < timeB ? -1 : 0;
      } else {
        return timeB > timeA ? 1 : timeB < timeA ? -1 : 0;
      }
    });

    setOrderStartFilter(newOrderStartFilter);
    setOrderList(newListStart);
  };



  const orderedListSite = () => {
    const newListSite = [...orderList];
    newListSite.sort((a, b) => {
      const siteA = a.Site || "";
      const siteB = b.Site || "";
      return orderSiteFilter === "asc"
        ? siteA.localeCompare(siteB)
        : siteB.localeCompare(siteA);
    });
    setOrderList(newListSite);
    setOrderSiteFilter(orderSiteFilter === "asc" ? "desc" : "asc");
  };

  const orderedListField = () => {
    const newListField = [...orderList];
    newListField.sort((a, b) => {
      return orderFieldFilter === "asc" ? a.Field - b.Field : b.Field - a.Field;
    });
    setOrderList(newListField);
    setOrderFieldFilter(orderFieldFilter === "asc" ? "desc" : "asc");
  };

  const orderedListTableSize = () => {
    const newListTableSize = [...orderList];
    newListTableSize.sort((a, b) => {
      const tableSizeA = a.TableSize ?? 0;
      const tableSizeB = b.TableSize ?? 0;
      return orderTableSizeFilter === "asc"
        ? tableSizeA - tableSizeB
        : tableSizeB - tableSizeA;
    });
    setOrderList(newListTableSize);
    setOrderTableSizeFilter(orderTableSizeFilter === "asc" ? "desc" : "asc");
  };

  const orderedListPriority = () => {
    const newListPriority = [...orderList];
    newListPriority.sort((a, b) => {
      const priorityA = a.Priority ?? 0;
      const priorityB = b.Priority ?? 0;
      return orderPriorityFilter === "asc"
        ? priorityA - priorityB
        : priorityB - priorityA;
    });
    setOrderList(newListPriority);
    setOrderPriorityFiter(orderPriorityFilter === "asc" ? "desc" : "asc");
  };

  const orderedListMaxReentry = () => {
    const newListMaxReentry = [...orderList];

    const newOrderMaxReentryFilter =
      orderMaxReentryFilter === "asc" ? "desc" : "asc";

    newListMaxReentry.sort((a, b) => {
      const maxReentryA =
        a.MaxReentry === "Yes" ? 1 : a.MaxReentry === "No" ? 0 : 0;
      const maxReentryB =
        b.MaxReentry === "Yes" ? 1 : b.MaxReentry === "No" ? 0 : 0;

      return newOrderMaxReentryFilter === "asc"
        ? maxReentryA - maxReentryB
        : maxReentryB - maxReentryA;
    });

    setOrderList(newListMaxReentry);
    setOrderMaxReentryFilter(newOrderMaxReentryFilter);
  };

  const orderedListName = () => {
    if (!orderList || orderList.length === 0) return;

    const newList = [...orderList];
    console.log("Antes de ordenar:", newList[0]);

    newList.sort((a, b) => {
      const nameA = a.Name || "";
      const nameB = b.Name || "";

      return orderNameFilter === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    console.log("Depois de ordenar:", newList[0]);
    setOrderList(newList);
    setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
  };

  const orderedListBuyIn = () => {
    const newListBuyIn = [...orderList];
    newListBuyIn.sort((a, b) =>
      orderBuyInFilter === "asc" ? a.BuyIn - b.BuyIn : b.BuyIn - a.BuyIn
    );

    newListBuyIn[0];

    setOrderList(newListBuyIn);
    setOrderBuyInFilter(orderBuyInFilter === "asc" ? "desc" : "asc");
  };

  const orderedBlinds = () => {
    const newListBlinds = [...orderList];

    const newOrderBlindsFilter = orderBlindsFilter === "asc" ? "desc" : "asc";

    newListBlinds.sort((a, b) => {
      const blindsA = a.Blinds ? a.Blinds.toString().toLowerCase() : "";
      const blindsB = b.Blinds ? b.Blinds.toString().toLowerCase() : "";
      console.log(blindsA);
      console.log(blindsB);
      return newOrderBlindsFilter === "asc"
        ? blindsA.localeCompare(blindsB)
        : blindsB.localeCompare(blindsA);
    });

    setOrderList(newListBlinds);
    setOrderBlindsFilter(newOrderBlindsFilter);
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
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);

  const handleFilter = () => {
    let filteredList = orderDate;

    console.log(filteredList);

    // Filtro por nome do torneio
    if (searchNameTournaments) {
      filteredList = filteredList.filter(
        (item) =>
          item.Name &&
          item.Name.toLowerCase().includes(searchNameTournaments.toLowerCase())
      );
    }

    // Filtro pelo valor mínimo do BuyIn
    if (minBuyIn) {
      filteredList = filteredList.filter(
        (item) => item.BuyIn >= Number(minBuyIn)
      );
    }

    // Filtro pelo valor máximo do BuyIn
    if (maxBuyIn) {
      filteredList = filteredList.filter(
        (item) => item.BuyIn <= Number(maxBuyIn)
      );
    }

    // Filtro por site
    if (selectedSite) {
      filteredList = filteredList.filter((item) =>
        item.Site.includes(selectedSite.network)
      );
    }

    // Filtro por velocidade
    if (selectedSpeed) {
      filteredList = filteredList.filter(
        (item) => item.Speed === selectedSpeed
      );
    }

    // Filtro por tamanho da mesa
    if (selectedSize) {
      switch (selectedSize) {
        case 1:
          filteredList = filteredList.filter((item) => item.TableSize == 2);
          break;
        case 2:
          filteredList = filteredList.filter(
            (item) => item.TableSize >= 3 && item.TableSize <= 5
          );
          break;
        case 3:
          filteredList = filteredList.filter((item) => item.TableSize == 6);
          break;
        case 4:
          filteredList = filteredList.filter(
            (item) => item.TableSize >= 7 && item.TableSize <= 10
          );
          break;
        default:
          break;
      }
    }

    console.log("Lista final filtrada:", filteredList);

    setOrderList(filteredList);
  };

  useEffect(() => {
    handleFilter();
  }, [
    searchNameTournaments,
    minBuyIn,
    maxBuyIn,
    selectedSite,
    selectedSpeed,
    selectedSize,
    activeFilter,
    selectedPriority
  ]);

  const isAllSelected =
    getPaginatedOrders().length > 0 &&
    selectedItems.length === getPaginatedOrders().length;
  const applyFilters = () => { };

  if (isDarkMode) {
    document.body.style.backgroundColor = "#02061e";
    document.body.style.color = "#ffffff";
  } else {
    document.body.style.backgroundColor = "#f9fafc";
    document.body.style.color = "#2c3e50";
  }
  const [yourFiltersIsOpen, setYourFiltersIsOpen] = useState(false);

  const toggleYourFiltersOpen = () => {
    setYourFiltersIsOpen((prevState) => !prevState);
  };

  return (
    <body className={`${isDarkMode ? "dark-theme" : "light-theme"}`}>
      {moreFiltersisOpen && (
        <MoreFilters
          closeModal={() => setMoreFiltersisOpen(false)}
          orderList={orderDate}
          setOrderList={setOrderList}
          siteData={siteData}
          applyFilters={applyFilters}
        />
      )}
      <CostumizeColumns
        isOpen={isOpenCostumizeColumns}
        closeModal={() => setIsOpenCostumizeColumns(false)}
        onColumnsChange={(updatedColumns) => setAllowedFilters(updatedColumns)}
      />
      {yourFiltersIsOpen && (
        <YourFilters closeModal={() => setYourFiltersIsOpen(false)} />
      )}
      <div
        className={`${styles.main} ${isDarkMode ? "dark-theme" : "light-theme"
          } ${moreFiltersisOpen === true ||
            isOpenCostumizeColumns === true ||
            yourFiltersIsOpen
            ? styles.blur
            : styles.noBlur
          }`}
      >
        <div className={styles.navbar}>
          <div
            className={`${styles.titlef} ${isDarkMode ? styles.darkTitle : styles.lightTitle
              }`}
          >
            Tournament List
          </div>
          <div className={styles.btns}>
            <div className={styles.btns}>
              <div>
                <ToggleThemeBtn />
              </div>
              <div>
                <Link to="/config">
                  <button className={styles.navEngineBtn}>
                    <img src={engine} alt="" />
                  </button>
                </Link>
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
                      src={selectedSite.image}
                      alt={`Site ${selectedSite.network}`}
                    />
                    <p>{selectedSite.network}</p>
                  </div>
                ) : (
                  "Select Site"
                )}
              </button>
            </label>
            <SelectSite
              isOpen={isOpen}
              setSelectedSite={setSelectedSite}
              siteData={siteData}
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
            <button className={styles.saveBtn} onClick={toggleYourFiltersOpen}>
              <img src={past} alt="Past Icon" width="19px" />
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
          <input
            type="checkbox"
            className={styles.filterCheckbox}
            checked={isAllSelected}
            onChange={(e) => toggleAllItems(e.target.checked)}
          />

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
                className={`${button.className} ${button.isActive ? styles.active : ""
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
              {isLoading ? (
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                  <p style={{ color: "#6366f1", fontSize: "16px", marginTop: "10px" }}>
                    Carregando...
                  </p>
                </div>
              ) : getPaginatedOrders().length > 0 ? (
                getPaginatedOrders().map((item, index) => (
                  <div
                    key={item.ID}
                    onMouseOver={(event) => handleMouseOver(item, event)}
                    onMouseOut={handleMouseOut}
                    style={{
                      backgroundColor: isDarkMode
                        ? index % 2 === 0
                          ? "transparent"
                          : "rgba(255, 255, 255, 0.05)"
                        : index % 2 === 0
                          ? "transparent"
                          : "#30397D", // cor para modo claro

                      color: isDarkMode
                        ? index % 2 === 0
                          ? "#fff"
                          : "#fff"
                        : index % 2 === 0
                          ? "#404040"
                          : "#fff",

                      fontWeight: index % 2 === 0
                        ? isDarkMode
                          ? ""
                          : "600"
                        : "normal",
                    }}
                  >
                    <td className={styles.stylesCheckboxTable}>
                      <div onClick={() => handleCreateLobby(5, null, item)}>
                        <FavouriteStar className={styles.favouriteStar} />
                      </div>
                      <input
                        type="checkbox"
                        className={styles.checkBoxTable}
                        checked={selectedItems.includes(item)}
                        onChange={() => toggleItem(item)}
                      />
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
                              siteData.find((site) => site.network === item.Site).image
                            }
                            alt="site logo"
                          />
                        )}

                        {filter === "Start" && (item.Start ? item.Start : "-")}

                        {filter === "Buy In" && (item.BuyIn ? `$${item.BuyIn}` : "-")}

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
                          (item.Start ? <Timer startEvent={item.Start} /> : "-")}

                        {filter === "TableSize" &&
                          (item.TableSize ? item.TableSize : "-")}

                        {filter === "Priority" && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {item.Priority ? (
                              <div
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: `${getPriorityBackgroundColor(
                                    item.Priority
                                  )}`,
                                  color: `${getPriorityTextColor(item.Priority)}`,
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                {item.Priority}
                              </div>
                            ) : (
                              "-"
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                    {isMenuLateral && hoveredItem?.id === item.ID && hoveredItem && (
                      <div
                        className={styles.bottomMenuLateral}
                        onMouseEnter={handleMenuMouseEnter}
                        onMouseLeave={handleMenuMouseLeave}
                        style={{
                          position: "absolute",
                          top: `${hoveredItem.position.top}px`,
                          left: `${hoveredItem.position.left}px`,
                          zIndex: 1000, // Garantir que o menu principal esteja no topo
                        }}
                      >
                        <img
                          src={skipped}
                          alt="Criar Lobby"
                          onClick={() => handleCreateLobby(1, null, null)}
                          style={{ cursor: "pointer" }}
                        />
                        <div className={styles.separator}></div>
                        <img
                          src={alarm}
                          alt="Alarme"
                          onClick={() => handleCreateLobby(4, null, null)}
                          style={{ cursor: "pointer" }}
                        />
                        <div className={styles.separator}></div>
                        <img
                          src={registered}
                          alt="Registrado"
                          onClick={() => handleCreateLobby(3, null, null)}
                          style={{ cursor: "pointer" }}
                        />
                        <div className={styles.separator}></div>
                        <img
                          src={priority}
                          alt="Selecionar Prioridade"
                          onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                          style={{ cursor: "pointer" }}
                        />
                        {isPriorityOpen && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "50px",
                              left: "100px",
                              background: "#2c2f48",
                              padding: "20px",
                              borderRadius: "8px",
                              display: "grid",
                              gridTemplateColumns: "repeat(4, 1fr)",
                              gap: "10px",
                              zIndex: 1001,
                            }}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                              <button
                                key={number}
                                onClick={async () => {
                                  setSelectedPriority(number);
                                  setIsPriorityOpen(false);
                                  await handleCreateLobby(null, number, null);
                                }}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  background: "#4a4e69",
                                  color: "#fff",
                                  fontSize: "16px",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                {number}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className={styles.separator}></div>
                        <img
                          src={deleted}
                          alt="Deletar"
                          onClick={() => handleCreateLobby(2)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Nenhum item encontrado.</p>
              )}


            </tr>
            <div className="pagination">
              <span
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                style={{
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  color: currentPage === 1 ? "#ccc" : "white",
                }}
              >
                Anterior
              </span>

              {getPageNumbers().map((page, index) => (
                <span
                  key={index}
                  onClick={() => page !== "..." && handlePageChange(page)}
                  className={page === currentPage ? "active" : ""}
                  style={{
                    cursor: page !== "..." ? "pointer" : "default",
                    margin: "0 5px",
                    color: page === currentPage ? "#007bff" : "white",
                  }}
                >
                  {page}
                </span>
              ))}

              <span
                onClick={() => handlePageChange(currentPage + 1)}
                style={{
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  color: currentPage === totalPages ? "#ccc" : "white",
                }}
              >
                Próxima
              </span>
            </div>
          </tbody>
        </table>
        {isMenuVisible && (
          <div className={styles.bottomMenu}>
            <h4>{selectedItems.length} tournaments selected</h4>
            <img
              src={skipped}
              alt="Criar Lobby"
              onClick={() => handleCreateLobby(1, null, null)}
              style={{ cursor: "pointer" }}
            />{" "}
            <div className={styles.separator}></div>
            <img src={alarm} onClick={() => handleCreateLobby(4, null, null)} />
            <div className={styles.separator}></div>
            <img src={registered} onClick={() => handleCreateLobby(3, null, null)} />
            <div className={styles.separator}></div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={priority}
                alt="Selecionar Prioridade"
                onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                style={{ cursor: "pointer" }}
              />
              {isPriorityOpen && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "-90px",
                    background: "#2c2f48",
                    padding: "20px",
                    borderRadius: "8px",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                    zIndex: 10,
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <button
                      key={number}
                      onClick={async () => {
                        setSelectedPriority(number);
                        setIsPriorityOpen(false);

                        await handleCreateLobby(null, number, null);
                      }}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#4a4e69",
                        color: "#fff",
                        fontSize: "16px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.separator}></div>
            <img src={deleted} onClick={() => handleCreateLobby(2)} />
          </div>
        )}
      </div>
    </body>
  );
};

export default Main;
