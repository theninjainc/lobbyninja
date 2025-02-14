import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import resetIcon from "../../assets/borracha.png"
import Order from '../../utils/Order/Order'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
  const [email, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const client = new Client();
        client.setProject("lobbyninja");

        const account = new Account(client);
        const user = await account.get();
        setUserEmail(user.email);
      } catch (error) {
        console.error("Erro ao obter o usuário:", error);
      }
    };
    fetchUser();
  }, []);

  const handleCreateLobby = async (state, priority, itemFavourite) => {
    try {
      iziToast.info({
        title: "Aguarde",
        message: "Estamos criando o lobby...",
        timeout: 5000,
        position: "topRight",
        id: "loading-toast",
      });

      const itemsToUse =
        selectedItems && selectedItems.length > 0
          ? selectedItems
          : itemHover
            ? [itemHover]
            : [itemFavourite];

      const lobbyData = {
        email,
        lobbies: itemsToUse.map((item, index) => {
          console.log(item)
          const baseLobby = {
            ...item,
            index,
            priority: undefined,
          };

          if (state === 3) baseLobby.registered = true;
          else if (state === 4) baseLobby.alarm = true;
          else if (state === 1) baseLobby.skipped = true;
          else if (state === 2) baseLobby.deleted = true;
          else if (state === 5) {
            baseLobby.favourite = true;
            baseLobby.favouriteStar = true;
          }

          if (priority) {
            baseLobby.priority = priority;
          }
          return baseLobby;
        }),
      };

      console.log("", lobbyData.lobbies)
      console.log("Enviando lobbyData:", lobbyData);

      const response = await fetch(
        "https://ninja.lobby.ninja/api/api/lobbys/lobbyCreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lobbyData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        iziToast.success({
          title: "Sucesso",
          message: "Lobby criado com sucesso!",
          position: "topRight",
          timeout: 5000,
        });
        console.log("Lobby criado com sucesso:", data);

        setOrderList(
          orderList.map((item) => {
            const updatedItem = lobbyData.lobbies.find(
              (lobby) => lobby.ID === item.ID
            );

            if (updatedItem) {
              return { ...item, Priority: priority };
            }

            return item;
          })
        );
        setOrderDate(
          orderList.map((item) => {
            const updatedItem = lobbyData.lobbies.find(
              (lobby) => lobby.ID === item.ID
            );

            if (updatedItem) {
              return { ...item, Priority: priority };
            }

            return item;
          })
        );
        

      } else {
        iziToast.error({
          title: "Erro",
          message: data.error || "Não foi possível criar o lobby.",
          position: "topRight",
          timeout: 5000,
        });
        console.error("Erro ao criar lobby:", data.error);
      }
      setSelectedItems([]);
    } catch (error) {
      iziToast.error({
        title: "Erro",
        message: "Ocorreu um erro ao criar o lobby. Tente novamente.",
        position: "topRight",
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
        setIsLoading(false);
        throw new Error("Erro ao buscar os dados");
      }

      const data = await response.json();
      console.log(data);
      const formattedData = data.map((tournament) => {
        const startDate = new Date(tournament.Start);
        const formattedStartTime = startDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return {
          ...tournament,
          Start: formattedStartTime,
          Horario: tournament.Start
        };
      });

      setOrderList(formattedData);
      setOrderDate(formattedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const fetchRegisteredLobbys = async (email, state) => {
    try {
      const updatedState = state === "favorites" ? "favourite" : state;
      console.log(state);
      const response = await fetch('https://ninja.lobby.ninja/api/api/lobbys/lobbyAllOptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          states: updatedState,
        }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Erro ao buscar os dados");
      }

      const data = await response.json();

      const updatedData = data.map(item => {
        const date = new Date(item.horarioInicio);
        const formattedTime = date.toTimeString().slice(0, 5);
        return {
          ...item,
          ID: item.$id,
          Horario: formattedTime,
          TableSize: item.jogadoresMesa,
          BuyIn: item.buyIn,
          Name: item.nome,
          PrizePool: item.premiacaoGarantida,
          Site: item.site,
          MaxReentry: item.reentrada == 0 ? "No" : "Yes",
          Priority: item.priority,
          Field: item.jogadoresInscritos
        };
      });
      console.log(updatedData)

      setOrderList(updatedData);
      setOrderDate(updatedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  };

  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = currentPage * PAGE_SIZE;
    console.log(orderList.slice(startIndex, endIndex)); // Debug para verificar
    return orderList.slice(startIndex, endIndex);
  };

  // Cálculo do total de páginas
  const totalPages = Math.ceil(orderList.length / PAGE_SIZE);

  // Função para trocar de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleTimerEnd = (id) => {
    // Remove o item da lista quando o timer chegar a 0
    setOrderList((prevList) => prevList.filter((item) => item.ID !== id));
  };

  // Função para gerar os números das páginas
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

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true)
    const path = location.pathname.split("/")[1];
    const validPaths = ["registered", "skipped", "favorites", "deleted"];

    if (validPaths.includes(path)) {
      fetchRegisteredLobbys(email, path);
    } else {
      fetchOrders();
    }
  }, [location.pathname, email]);

  const allFilters = [
    "Site",
    "Start",
    "Buy In",
    "Name",
    "Prize Pool",
    "Max Reentry",
    "Speed",
    "Field",
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
  const [isMenuLateral, setIsMenuLateralVisible] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseOver = (item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    console.log(window.scrollY);
    setHoveredItem({
      id: item.ID,
      position: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width - 340,
      },
    });
    setItemHover(item);
    setIsMenuLateralVisible(true);
  };

  const handleMouseOut = (event) => {
    console.log(event.currentTarget);
    console.log(event.relatedTarget);
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
  const [orderSpeedFilter, setOrderSpeedFilter] = useState("asc");
  const [orderPrizePoolFilter, setOrderPrizePoolFilter] = useState("asc");
  const [allowedFilters, setAllowedFilters] = useState();
  const [isLeftActive, setIsLeftActive] = useState(true); // Estado global para as setas

  const orderedListPrizePool = () => {
    const newListPrizePool = [...orderList];

    newListPrizePool.sort((a, b) => {
      // Converte para número, caso não seja válido, atribui 0
      const prizeA = isNaN(parseFloat(a.PrizePool)) ? 0 : parseFloat(a.PrizePool);
      const prizeB = isNaN(parseFloat(b.PrizePool)) ? 0 : parseFloat(b.PrizePool);

      if (orderPrizePoolFilter === "asc") {
        return prizeA - prizeB;  // Ascendente
      } else {
        return prizeB - prizeA;  // Descendente
      }
    });

    setOrderList(newListPrizePool);
    setOrderDate(newListPrizePool);
    setOrderPrizePoolFilter(orderPrizePoolFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderPrizePoolFilter === "asc" ? true : false);
  };




  const orderedListBuyIn = () => {
    const newListBuyIn = [...orderList];

    newListBuyIn.sort((a, b) => {
      // Converte para número, caso não seja válido, atribui 0
      const buyInA = isNaN(parseFloat(a.BuyIn)) ? 0 : parseFloat(a.BuyIn);
      const buyInB = isNaN(parseFloat(b.BuyIn)) ? 0 : parseFloat(b.BuyIn);

      if (orderBuyInFilter === "asc") {
        return buyInA - buyInB;  // Ascendente
      } else {
        return buyInB - buyInA;  // Descendente
      }
    });

    setOrderList(newListBuyIn);
    setOrderDate(newListBuyIn);
    setOrderBuyInFilter(orderBuyInFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderBuyInFilter === "asc" ? true : false);
  };


  const orderedListSpeed = () => {
    const newListSpeed = [...orderList];

    newListSpeed.sort((a, b) =>
      orderSpeedFilter === "asc" ? a.Speed - b.Speed : b.Speed - a.Speed
    );

    setOrderList(newListSpeed);
    setOrderDate(newListSpeed);
    setOrderSpeedFilter(orderSpeedFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderSpeedFilter == "asc" ? false : true)
  };

  const orderedListStart = () => {
    const newListStart = [...orderList];
    const newOrderStartFilter = orderStartFilter === "asc" ? "desc" : "asc";

    newListStart.sort((a, b) => {
      // Verifica se o horário está no formato "HH:mm"
      const [hoursA, minutesA] = a.Horario ? a.Horario.split(":").map(Number) : [0, 0];
      const [hoursB, minutesB] = b.Horario ? b.Horario.split(":").map(Number) : [0, 0];

      // Converte as horas e minutos para minutos totais
      const timeA = hoursA * 60 + minutesA;
      const timeB = hoursB * 60 + minutesB;
      // Ordena com base no filtro ascendente ou descendente
      return newOrderStartFilter === "asc" ? timeA - timeB : timeB - timeA;
    });

    // Atualiza os estados conforme o filtro
    setOrderStartFilter(newOrderStartFilter);
    setOrderList(newListStart);
    setOrderDate(newListStart);
    setIsLeftActive(orderStartFilter === "asc" ? false : true);
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
    setOrderDate(newListSite);
    setOrderSiteFilter(orderSiteFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderSiteFilter == "asc" ? false : true)
  };

  const orderedListField = () => {
    const newListField = [...orderList];
    newListField.sort((a, b) => {
      return orderFieldFilter === "asc" ? a.Field - b.Field : b.Field - a.Field;
    });
    setOrderList(newListField);
    setOrderDate(newListField);
    setOrderFieldFilter(orderFieldFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderFieldFilter == "asc" ? false : true)
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
    setOrderDate(newListTableSize);
    setOrderTableSizeFilter(orderTableSizeFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderTableSizeFilter == "asc" ? false : true)
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
    setOrderDate(newListPriority);
    setOrderPriorityFiter(orderPriorityFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderPriorityFilter == "asc" ? false : true)
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
    setOrderDate(newListMaxReentry);
    setOrderMaxReentryFilter(newOrderMaxReentryFilter);

    setIsLeftActive(orderMaxReentryFilter == "asc" ? false : true)
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
    setOrderDate(newList);
    setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
    setIsLeftActive(orderNameFilter == "asc" ? false : true)
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
        handleFilterClick("filterPrizePoolBtn");
        orderedListPrizePool();
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
  const [minBuyIn, setMinBuyIn] = useState("");
  const [maxBuyIn, setMaxBuyIn] = useState("");
  const [selectedSites, setSelectedSites] = useState([]);
  const [selectedSpeed, setSelectedSpeed] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const sizeRef = useRef(null);
  const speedRef = useRef(null);
  const siteRef = useRef(null);

  const resetFilters = () => {
    setSearchNameTournaments(""); // Reseta o campo de busca
    setMinBuyIn(""); // Reseta o valor mínimo
    setMaxBuyIn(""); // Reseta o valor máximo
    setSelectedSites([]); // Reseta sites selecionados
    setSelectedSpeed([]); // Reseta velocidades
    setSelectedSize([]); // Reseta tamanhos
    setSelectedPriority(null); // Reseta prioridade
    setIsPriorityOpen(false); // Fecha qualquer popup aberto
  };


  const closeAllDropdowns = () => {
    setIsOpenSize(false);
    setIsOpenSpeed(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (sizeRef.current && !sizeRef.current.contains(event.target) && isOpenSize) ||
        (speedRef.current && !speedRef.current.contains(event.target) && isOpenSpeed) ||
        (siteRef.current && !siteRef.current.contains(event.target) && isOpen)
      ) {
        closeAllDropdowns(); // Fecha todos os dropdowns, exceto o que está aberto
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenSize, isOpenSpeed, isOpen]);



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
    if (selectedSites.length > 0) {
      filteredList = filteredList.filter((item) =>
        selectedSites.some((site) => item.Site.includes(site.network))
      );
    }

    // Filtro por velocidade
    if (selectedSpeed.length > 0) {
      filteredList = filteredList.filter((item) =>
        selectedSpeed.includes(item.Speed)
      );
    }

    // Filtro por tamanho da mesa
    if (selectedSize.length > 0) {
      filteredList = filteredList.filter((item) => {
        return selectedSize.some((size) => {
          switch (size) {
            case 1:
              return item.TableSize === 2;
            case 2:
              return item.TableSize >= 3 && item.TableSize <= 5;
            case 3:
              return item.TableSize === 6;
            case 4:
              return item.TableSize >= 7 && item.TableSize <= 10;
            default:
              return false;
          }
        });
      });
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
    selectedSites,
    selectedSpeed,
    selectedSize,
    activeFilter,
    selectedPriority,
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
  const [saveFilterIsOpen, setSaveFilterIsOpen] = useState(false);

  const toggleYourFiltersOpen = () => {
    setYourFiltersIsOpen((prevState) => !prevState);
  };

  const toggleOpenSaveFilter = () => {
    setSaveFilterIsOpen((prevState) => !prevState);
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
          email={email}
        />
      )}

      {saveFilterIsOpen && (
        <SaveMoreFilters
          close={() => setSaveFilterIsOpen(false)}
          activeFilters={{
            searchNameTournaments,
            minBuyIn,
            maxBuyIn,
            selectedSites,
            selectedSpeed,
            selectedSize,
          }}
          email={email}
          origin="Main"
        />
      )}

      <CostumizeColumns
        isOpen={isOpenCostumizeColumns}
        closeModal={() => setIsOpenCostumizeColumns(false)}
        onColumnsChange={(updatedColumns) => setAllowedFilters(updatedColumns)}
      />
      {yourFiltersIsOpen && (
        <YourFilters
          closeModal={() => setYourFiltersIsOpen(false)}
          email={email}
          orderList={orderDate}
          setOrderList={setOrderList}
          siteData={siteData}
          applyFilters={applyFilters}
        />
      )}
      <div
        className={`${styles.main} ${isDarkMode ? "dark-theme" : "light-theme"
          } ${moreFiltersisOpen === true ||
            isOpenCostumizeColumns === true ||
            yourFiltersIsOpen === true ||
            saveFilterIsOpen
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
                value={searchNameTournaments || ""}
                className={styles.search}
                onChange={() => setSearchNameTournaments(event.target.value)}
                placeholder="Search tournaments..."
                id="search"
              />
            </label>
            <label htmlFor="site" className={styles.labelSelectSite} ref={siteRef}>
              <button
                name="site"
                id="site"
                className={styles.selectSite}
                onClick={() => toggleOpen(true)}
              >
                {selectedSites.length > 0 ? (
                  <div className={styles.selectedSite}>
                    {selectedSites.length === 1 ? (
                      <>
                        <img
                          src={selectedSites[0].image}
                          alt={`Site ${selectedSites[0].network}`}
                        />
                        <p>{selectedSites[0].network}</p>
                      </>
                    ) : (
                      `${selectedSites.length} sites selected`
                    )}
                  </div>
                ) : (
                  "Select Site"
                )}
              </button>
              <SelectSite
                isOpen={isOpen}
                setSelectedSites={setSelectedSites}
                siteData={siteData}
                selectedSites={selectedSites}
              />
            </label>
            <div className={styles.maxMinSearch}>
              <label htmlFor="min-value" className={styles.labelMaxMinValue}>
                <div>Min $</div>
                <input
                  type="number"
                  id="min-value"
                  name="min-value"
                  value={minBuyIn || ""}
                  placeholder=""
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
                  value={maxBuyIn || ""}
                  placeholder=""
                  onChange={(e) => {
                    setMaxBuyIn(e.target.value);
                  }}
                  className={styles.searchMaxMin}
                />
              </label>
            </div>
            <label htmlFor="speed" className={styles.labelSelectSpeed} ref={speedRef}>
              <button
                name="speed"
                id="speed"
                className={styles.selectSpeed}
                onClick={() => toggleOpenSpeed(true)}
              >
                {selectedSpeed.length > 0 ? (
                  <div className={styles.selectedSpeed}>
                    <p>{`${selectedSpeed.length} speed selected`}</p>
                  </div>
                ) : (
                  "Speed"
                )}
              </button>
              <Speed
                isOpenSpeed={isOpenSpeed}
                setSelectedSpeed={setSelectedSpeed}
                selectedSpeed={selectedSpeed}
              />
            </label>
            <label htmlFor="size" className={styles.labelSelectSize} ref={sizeRef}>
              <button
                name="size"
                id="size"
                className={styles.selectSize}
                onClick={() => toggleOpenSize(true)}
              >
                {selectedSize.length > 0 ? (
                  <p className={styles.searchSizeBtn}>
                    {`${selectedSize.length} size selected`}
                  </p>
                ) : (
                  "Size"
                )}
              </button>
              <Size
                isOpenSize={isOpenSize}
                setSelectedSize={setSelectedSize}
                selectedSize={selectedSize}
              />
            </label>

            <button
              className={styles.searchBtn}
              onClick={() => {
                handleFilter();
              }}
            >
              <img src={lupa} alt="Lupa icon" />{" "}
            </button>
            <button className={styles.saveBtn}>
              <img src={save} alt="Save icon" onClick={toggleOpenSaveFilter} />
            </button>
            <button className={styles.saveBtn} onClick={toggleYourFiltersOpen}>
              <img src={past} alt="Past Icon" width="19px" />
            </button>
            <button className={styles.saveBtn} onClick={resetFilters}>
              <img src={resetIcon} alt="Reset Filters" width="19px" />
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
                onClick={() => {
                  button.onClick();
                  toggleOrder();
                }}
              >
                {button.label}
                <Order leftFilter={isLeftActive} activeFilter={activeFilter} currentFilter={button.className} />
              </button>
            ))}
        </div>
        <table>
          <tbody>
            <tr>
              {isLoading ? (
                <div className={styles.spinnerContainer}>
                  <div className={styles.spinner}></div>
                  <p
                    style={{
                      color: "#6366f1",
                      fontSize: "16px",
                      marginTop: "10px",
                    }}
                  >
                    Carregando...
                  </p>
                </div>
              ) : getPaginatedOrders().length > 0 ? (
                getPaginatedOrders().map((item, index) => (
                  <div
                    key={index}
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

                      fontWeight:
                        index % 2 === 0 ? (isDarkMode ? "" : "600") : "normal",
                    }}
                  >
                    <td className={styles.stylesCheckboxTable}>
                      <div onClick={() => handleCreateLobby(5, null, item)}>
                        <FavouriteStar favourites={item.favourite == true} className={styles.favouriteStar} />
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.checkBoxTable}
                          checked={selectedItems.includes(item)}
                          onChange={() => toggleItem(item)}
                        />
                      </div>
                    </td>
                    {(allowedFilters || allFilters).map((filter) => (
                      <td
                        key={filter}
                        className={
                          styles[
                          `${filter.toLowerCase().replace(/ /g, "")}Table`
                          ]
                        }
                      >
                        {filter === "Site" && item.Site && (
                          <img
                            src={
                              siteData.find(
                                (site) => site.network === item.Site
                              ).image
                            }
                            alt="site logo"
                          />
                        )}

                        {filter === "Start" && (item.Horario ? item.Horario : "-")}

                        {filter === "Buy In" &&
                          (item.BuyIn ? `$${item.BuyIn}` : "-")}

                        {filter === "Name" && (item.Name ? item.Name : "-")}

                        {filter === "Prize Pool" &&
                          (item.PrizePool ? `$${item.PrizePool}` : "-")}

                        {filter === "Max Reentry" &&
                          (item.MaxReentry ? item.MaxReentry : "-")}

                        {filter === "Speed" &&
                          (item.Speed ? <SpeedMap speed={item.Speed} /> : "-")}

                        {filter === "Field" && (item.Field ? item.Field : "-")}

                        {filter === "Mlr" &&
                          (item.Start ? (
                            <Timer
                              startEvent={item.Start}
                              onTimerEnd={() => handleTimerEnd(item.ID)} // Passa o ID do item para a função
                            />
                          ) : (
                            "-"
                          ))}

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
                                  color: `${getPriorityTextColor(
                                    item.Priority
                                  )}`,
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
                    {isMenuLateral &&
                      hoveredItem?.id === item.ID &&
                      hoveredItem && (
                        <div
                          className={styles.bottomMenuLateral}
                          onMouseEnter={handleMenuMouseEnter}
                          onMouseLeave={handleMenuMouseLeave}
                          style={{
                            position: "absolute",
                            top: `${hoveredItem.position.top}px`,
                            left: `${hoveredItem.position.left}px`,
                            zIndex: 1000,
                          }}
                        >
                          <svg
                            width="19"
                            height="20"
                            viewBox="0 0 19 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleCreateLobby(1, null, null)}
                            style={{
                              cursor: "pointer",
                              transition: "fill 0.3s ease",
                              fill: "white", // Cor inicial
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
                            onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}
                          >
                            <path
                              d="M3.57925 2.90447C3.44758 2.96893 3.12441 3.17525 3.12441 3.63284V16.367C3.12441 16.8249 3.44768 17.0309 3.57895 17.0955L3.5798 17.0959C3.71035 17.1592 4.07155 17.2886 4.43373 17.0066L4.43375 17.0066L12.6083 10.64L12.6084 10.6399C12.88 10.4279 12.9208 10.1459 12.9201 9.99941C12.9201 9.85421 12.8802 9.57225 12.6083 9.36046L12.5161 9.47879L12.6083 9.36045L4.43375 2.99323L4.43358 2.99309C4.26562 2.86267 4.09357 2.81908 3.9439 2.81908C3.78141 2.81908 3.65021 2.86969 3.57925 2.90447ZM3.57925 2.90447L3.6452 3.0392L3.57917 2.90451C3.5792 2.9045 3.57922 2.90449 3.57925 2.90447ZM5.68907 18.6193L5.689 18.6193C5.17477 19.0204 4.56011 19.2251 3.93989 19.2251C3.51408 19.2251 3.08454 19.1284 2.68158 18.9318C1.69398 18.4489 1.08066 17.4666 1.08066 16.367V3.63283C1.08066 2.53315 1.69402 1.55092 2.68221 1.06826L2.68221 1.06826C3.66981 0.585881 4.82157 0.705615 5.68964 1.3811C5.68965 1.38111 5.68967 1.38113 5.68969 1.38114L13.8636 7.74832L13.8636 7.74834C14.563 8.29297 14.9639 9.11307 14.9639 9.99949V9.99958C14.9644 10.886 14.5635 11.7069 13.8641 12.2518L5.68907 18.6193Z"
                              stroke="#212344"
                              strokeWidth="0.3"
                            />
                            <path
                              d="M18.4193 1.79688V18.2031C18.4193 18.7674 17.9618 19.225 17.3975 19.225C16.8331 19.225 16.3756 18.7674 16.3756 18.2031V1.79688C16.3756 1.23256 16.8331 0.775 17.3975 0.775C17.9618 0.775 18.4193 1.23256 18.4193 1.79688Z"
                              stroke="#212344"
                              strokeWidth="0.3"
                            />
                          </svg>

                          <div className={styles.separator}></div>
                          <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleCreateLobby(4, null, null)}
                            style={{
                              cursor: "pointer",
                              transition: "fill 0.3s ease",
                              fill: "white", // Cor inicial
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
                            onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}
                          >
                            <g clipPath="url(#clip0_10033_160)">
                              <path
                                d="M4.34886 0.556444L2.27245 2.42902C1.88731 2.77546 1.85615 3.36861 2.20286 3.75351C2.54965 4.13829 3.14276 4.1689 3.52732 3.82178L5.60373 1.94437C5.9885 1.59757 6.01911 1.00443 5.67209 0.619882C5.23139 0.179166 4.65078 0.279972 4.34886 0.556444ZM15.7905 0.620026C15.4438 1.0049 15.475 1.59807 15.8601 1.94451L17.9353 3.82192C18.3199 4.16895 18.913 4.13834 19.2598 3.75365C19.6065 3.36875 19.5753 2.77561 19.1902 2.42917L17.115 0.556588C16.8448 0.312454 16.2704 0.14005 15.7905 0.620026ZM10.7331 1.32678C5.90096 1.32678 1.96361 5.26534 1.96361 10.0975C1.96361 12.6095 3.03378 14.8733 4.7346 16.4745L3.46263 18.1945C3.15602 18.6109 3.24451 19.1969 3.6604 19.5043C4.07703 19.8117 4.66402 19.7233 4.97143 19.3066L6.22754 17.6049C7.54703 18.4006 9.0848 18.8684 10.7332 18.8684C12.3911 18.8684 13.9381 18.3958 15.262 17.5915L16.5327 19.3066C16.8401 19.7233 17.4271 19.8117 17.8437 19.5043C18.2596 19.1969 18.3481 18.6109 18.0415 18.1945L16.7549 16.4525C18.4406 14.8526 19.5003 12.5977 19.5003 10.0975C19.5003 5.26534 15.5653 1.32678 10.7331 1.32678ZM10.7331 3.20426C14.552 3.20426 17.6264 6.27868 17.6264 10.0975C17.6264 13.9164 14.552 16.9897 10.7331 16.9897C6.91429 16.9897 3.83617 13.9164 3.83617 10.0975C3.83617 6.27868 6.91429 3.20426 10.7331 3.20426ZM10.7527 5.51377C10.2335 5.51377 9.81322 5.93577 9.81525 6.45496V9.6632H7.95123C7.43251 9.66119 7.01074 10.0807 7.01007 10.5995C7.00801 11.1201 7.4306 11.5426 7.95123 11.5406H10.7527C11.3697 11.5382 11.6905 11.0683 11.689 10.5995V6.45496C11.691 5.93625 11.2715 5.51446 10.7527 5.51377Z"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_10033_160">
                                <rect width="20" height="20"
                                  transform="translate(0.75 -9.15527e-05)" />
                              </clipPath>
                            </defs>
                          </svg>



                          <div className={styles.separator}></div>
                          <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleCreateLobby(3, null, null)}
                            style={{
                              cursor: "pointer",
                              transition: "fill 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              // Altera a cor de todos os paths dentro do g
                              const paths = e.currentTarget.querySelectorAll('g path');
                              paths.forEach(path => {
                                path.style.transition = "stroke 0.3s ease";
                                path.style.stroke = "red"; // Muda a cor para vermelha
                              });
                            }}
                            onMouseLeave={(e) => {
                              // Restaura a cor original dos paths
                              const paths = e.currentTarget.querySelectorAll('g path');
                              paths.forEach(path => {
                                path.style.transition = "stroke 0.3s ease";
                                path.style.stroke = "white"; // Restaura a cor original
                              });
                            }}
                          >
                            <g clipPath="url(#clip0_10378_151)">
                              <path d="M8.01453 4.76427L8.01464 4.76416C8.14447 4.63426 8.35588 4.63426 8.4857 4.76416C8.6159 4.89445 8.6159 5.10538 8.4857 5.23566L7.825 5.89636L7.47145 6.24991L7.825 6.60347L8.4857 7.26416C8.6159 7.39445 8.6159 7.60538 8.4857 7.73566L8.48537 7.736C8.42073 7.8008 8.33671 7.83325 8.25017 7.83325C8.16364 7.83325 8.07962 7.8008 8.01498 7.73599L8.01453 7.73555L7.35373 7.07475L7.00017 6.72119L6.64662 7.07475L5.98581 7.73555L5.98537 7.736C5.92073 7.8008 5.83671 7.83325 5.75017 7.83325C5.66364 7.83325 5.57962 7.8008 5.51498 7.73599L5.51464 7.73566C5.38444 7.60538 5.38444 7.39445 5.51464 7.26416L6.17534 6.60347L6.52889 6.24991L6.17534 5.89636L5.51464 5.23566C5.51461 5.23563 5.51457 5.23559 5.51453 5.23555C5.38444 5.10526 5.38448 4.89441 5.51464 4.76416C5.64447 4.63426 5.85588 4.63426 5.9857 4.76416L5.98581 4.76427L6.64662 5.42508L7.00017 5.77863L7.35373 5.42508L8.01453 4.76427Z" stroke="white" />
                              <path d="M12.083 13.7496C12.083 12.4178 13.1676 11.3329 14.4997 11.3329C15.8318 11.3329 16.9163 12.4178 16.9163 13.7496C16.9163 15.0814 15.8318 16.1663 14.4997 16.1663C13.1676 16.1663 12.083 15.0814 12.083 13.7496ZM12.7497 13.7496C12.7497 14.7148 13.5344 15.4996 14.4997 15.4996C15.4649 15.4996 16.2497 14.7148 16.2497 13.7496C16.2497 12.7844 15.4649 11.9996 14.4997 11.9996C13.5344 11.9996 12.7497 12.7844 12.7497 13.7496Z" stroke="white" />
                              <path d="M9.48085 12.441C9.47621 12.4353 9.47078 12.4284 9.46499 12.4207L9.46402 12.4194L9.44879 12.399L9.4391 12.3864C9.43728 12.3841 9.43611 12.3827 9.43551 12.382C9.43035 12.3767 9.42557 12.3716 9.42116 12.3667L8.37968 11.3248C8.37662 11.322 8.37332 11.3189 8.36982 11.3155C8.36976 11.3155 8.3697 11.3154 8.36963 11.3154L8.35817 11.3066L8.34899 11.2996L8.33755 11.291L8.33429 11.2885C8.32603 11.2821 8.31869 11.2762 8.31286 11.2714C8.30694 11.2685 8.29933 11.2647 8.29117 11.2605L8.28312 11.2564L8.28316 11.2563C8.27217 11.2504 8.26223 11.2448 8.25574 11.2412L8.24642 11.236C8.23397 11.2316 8.21711 11.2268 8.1948 11.2221L8.19368 11.2219C8.1935 11.2218 8.19331 11.2218 8.19311 11.2218L8.17588 11.2207L8.14851 11.2193L8.14517 11.2191C8.14041 11.2188 8.13589 11.2185 8.13169 11.2182C8.12411 11.219 8.11425 11.2201 8.10312 11.2211C8.09253 11.2221 8.08288 11.2229 8.07587 11.2235L8.05735 11.2251C8.056 11.2252 8.05492 11.2253 8.05407 11.2254C8.05028 11.2261 8.04674 11.2267 8.04347 11.2272C6.35636 11.5807 4.62418 11.065 3.40514 9.84205C2.4463 8.88457 1.91667 7.60689 1.91667 6.24991C1.91667 4.89275 2.44643 3.61505 3.40731 2.656C4.36521 1.69626 5.64294 1.16658 7 1.16658C8.34887 1.16658 9.61936 1.68989 10.5753 2.63867C10.5808 2.64343 10.587 2.64896 10.5936 2.6552L10.5988 2.66011L10.6039 2.66515L12.8522 4.91349L12.8615 4.92279L12.8614 4.92291L12.8612 4.92283L12.8613 4.92296L12.8685 4.92962L12.8756 4.93669L15.8985 7.95975L15.8985 7.95976L15.9053 7.96662L15.9098 7.97114C15.9114 7.9727 15.9121 7.9734 15.9122 7.97355C15.9123 7.97358 15.9123 7.97359 15.9123 7.97359L15.9216 7.98241L15.9215 7.98254L18.0835 10.1446C18.0957 10.1568 18.1059 10.1682 18.1141 10.1779C19.0613 11.1335 19.5833 12.4026 19.5833 13.7499C19.5833 15.1071 19.0536 16.3848 18.0927 17.3438C17.1348 18.3036 15.8571 18.8332 14.5 18.8332C13.143 18.8332 11.8655 18.3036 10.9062 17.3431C10.906 17.343 10.9059 17.3428 10.9058 17.3427M9.48085 12.441L11.2592 16.989L10.9054 17.3423C10.9055 17.3424 10.9057 17.3426 10.9058 17.3427M9.48085 12.441L9.48239 12.4442L9.49549 12.471L9.4961 12.4723C9.501 12.482 9.50561 12.4907 9.50934 12.4976L9.51049 12.5019L9.51844 12.5321L9.51899 12.5341C9.52108 12.5417 9.52315 12.5487 9.52502 12.5548L9.48085 12.441ZM10.9058 17.3427C9.68446 16.1245 9.16745 14.3904 9.52197 12.7033M10.9058 17.3427L9.52197 12.7033M9.52197 12.7033C9.52282 12.6982 9.52384 12.6925 9.52505 12.6865L9.52549 12.6843C9.5256 12.6836 9.52596 12.6812 9.52644 12.6764C9.5273 12.6679 9.52805 12.6576 9.52921 12.6389C9.52925 12.6383 9.52929 12.6377 9.52932 12.6371L10.0284 12.6682C10.0287 12.6611 10.0296 12.654 10.0305 12.6468C10.0317 12.6376 10.0328 12.6285 10.0328 12.6195C10.0328 12.5957 10.0299 12.5719 10.027 12.5481L9.52197 12.7033ZM19.681 0.597602L19.6811 0.597492C19.811 0.467584 20.0224 0.467584 20.1522 0.597492C20.2825 0.727898 20.2822 0.938659 20.1524 1.06836L20.1523 1.06847L17.5673 3.65352L17.2874 3.93338L17.4955 4.27001C17.8525 4.84733 17.8657 5.57776 17.4942 6.17269L17.4942 6.17281L16.767 7.33817L16.5567 7.67537L16.8377 7.95641L18.5502 9.66887C18.5543 9.67374 18.559 9.67909 18.5642 9.68475L18.5708 9.69197L18.5778 9.69892C19.6567 10.7831 20.25 12.2188 20.25 13.7499C20.25 15.2875 19.6519 16.7294 18.5646 17.8153L18.5641 17.8157C17.4796 18.9018 16.0377 19.4999 14.5 19.4999C12.9624 19.4999 11.5205 18.9018 10.4351 17.8149L10.4343 17.8141C9.14949 16.5333 8.55588 14.749 8.80146 12.9699L8.83542 12.7238L8.65986 12.5481L8.19742 12.0853L8.02184 11.9095L7.77573 11.9433C7.50405 11.9806 7.24354 12.0046 6.99125 12.0046C5.48439 12.0046 4.02826 11.4111 2.93489 10.3148L2.93416 10.314C1.84811 9.22949 1.25 7.78758 1.25 6.24991C1.25 4.71231 1.84806 3.27038 2.93538 2.18456L2.93587 2.18407C4.02042 1.09802 5.46233 0.499908 7 0.499908C8.53074 0.499908 9.96549 1.09286 11.0495 2.17102L11.0558 2.17732L11.0624 2.1834C11.0705 2.1909 11.078 2.19744 11.0846 2.20291L12.8495 3.96758L13.1394 4.25747L13.4805 4.02996L14.5571 3.31181C15.1395 2.92339 15.8894 2.91937 16.4806 3.26779L16.8142 3.46438L17.0881 3.19058L19.681 0.597602ZM18.5285 9.64182L18.5294 9.64297L18.5281 9.64128L18.5285 9.64182ZM9.49991 12.4638L9.5001 12.4641L9.49991 12.4638ZM14.1271 4.40027L13.6199 4.73864L14.051 5.16975L15.6282 6.74689L16.0731 7.19184L16.406 6.65787L16.9284 5.81993C17.2111 5.36672 17.1442 4.78318 16.7671 4.4054L16.7668 4.40506L16.3711 4.00935L16.3708 4.00902C15.9858 3.62478 15.3792 3.5644 14.9264 3.86697C14.9264 3.86701 14.9263 3.86704 14.9263 3.86708L14.1271 4.40027Z" stroke="white" />
                              <path d="M11.819 10.2357L11.8187 10.236C11.7541 10.3008 11.67 10.3333 11.5835 10.3333C11.497 10.3333 11.4129 10.3008 11.3483 10.236L11.3479 10.2356L10.5146 9.40234C10.5146 9.4023 10.5146 9.40226 10.5145 9.40222C10.3844 9.27193 10.3845 9.06108 10.5146 8.93084C10.6445 8.80093 10.8559 8.80093 10.9857 8.93084L10.9858 8.93095L11.819 9.76417C11.8191 9.76421 11.8191 9.76424 11.8191 9.76428C11.9492 9.89457 11.9492 10.1054 11.819 10.2357Z" stroke="#FEFEFF" />
                            </g>
                            <defs>
                              <clipPath id="clip0_10378_151">
                                <rect width="20" height="20" fill="white" transform="translate(0.75 -9.15527e-05)" />
                              </clipPath>
                            </defs>
                          </svg>



                          <div className={styles.separator}></div>
                          <svg width="13" height="15" viewBox="0 0 13 15" fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                            style={{
                              cursor: "pointer",
                              transition: "fill 0.3s ease",
                              fill: "white", // Cor inicial
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
                            onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}>
                            <path d="M10.5046 6.40436C10.5046 6.57723 10.3644 6.71742 10.1915 6.71742H5.18262V8.2827H10.1915C10.3644 8.2827 10.5046 8.42288 10.5046 8.59576V8.87719L12.1995 7.50007L10.5046 6.12292V6.40436Z" />
                            <path d="M0.800293 9.22185H4.557V8.59573V6.40431V5.7782H0.800293V9.22185Z" />
                            <path d="M10.5046 12.0394C10.5046 12.2123 10.3644 12.3525 10.1915 12.3525H5.18262V13.9177H10.1915C10.3644 13.9177 10.5046 14.0579 10.5046 14.2308V14.5122L12.1995 13.1351L10.5046 11.7579V12.0394Z" />
                            <path d="M0.800293 14.857H4.557C4.557 14.4438 4.557 11.9163 4.557 11.4133H0.800293V14.857Z" />
                            <path d="M0.800293 3.58684H4.557C4.557 3.26308 4.557 0.466948 4.557 0.143188H0.800293V3.58684Z" />
                            <path d="M10.5046 2.96077V3.24221L12.1995 1.86506L10.5046 0.487915V0.769351C10.5046 0.942223 10.3644 1.08241 10.1915 1.08241H5.18262V2.64769H10.1915C10.3644 2.64772 10.5046 2.78787 10.5046 2.96077Z" />
                          </svg>

                          {isPriorityOpen && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "40px",
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
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => handleCreateLobby(2, null, null)}
                            style={{
                              cursor: "pointer",
                              transition: "fill 0.3s ease",
                              fill: "white", // Cor inicial
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
                            onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69448 0.111084C5.87629 0.111084 5.213 0.774365 5.213 1.59257V3.07405H0.768555V4.55553H2.25004V14.9259C2.25004 16.5623 3.5766 17.8889 5.213 17.8889H12.9908C14.4226 17.8889 15.5834 16.7281 15.5834 15.2963V4.55553H17.0648V3.07405H12.6204V1.59257C12.6204 0.774365 11.9571 0.111084 11.1389 0.111084H6.69448ZM14.1019 4.55553H3.73152V14.9259C3.73152 15.7441 4.39481 16.4074 5.213 16.4074H12.9908C13.6044 16.4074 14.1019 15.9099 14.1019 15.2963V4.55553ZM11.1389 3.07405H6.69448V2.33331C6.69448 1.92421 7.02612 1.59257 7.43522 1.59257H10.3982C10.8073 1.59257 11.1389 1.92421 11.1389 2.33331V3.07405Z" />
                          </svg>

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
              <span style={{ 'marginLeft': 20 }}>{orderList.length} resultados encontrados.</span>
            </div>
          </tbody>
        </table>
        {isMenuVisible && (
          <div className={styles.bottomMenu}>
            <h4>{selectedItems.length} tournaments selected</h4>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleCreateLobby(1, null, null)}
              style={{
                cursor: "pointer",
                transition: "fill 0.3s ease",
                fill: "white", // Cor inicial
              }}
              onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
              onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}
            >
              <path
                d="M3.57925 2.90447C3.44758 2.96893 3.12441 3.17525 3.12441 3.63284V16.367C3.12441 16.8249 3.44768 17.0309 3.57895 17.0955L3.5798 17.0959C3.71035 17.1592 4.07155 17.2886 4.43373 17.0066L4.43375 17.0066L12.6083 10.64L12.6084 10.6399C12.88 10.4279 12.9208 10.1459 12.9201 9.99941C12.9201 9.85421 12.8802 9.57225 12.6083 9.36046L12.5161 9.47879L12.6083 9.36045L4.43375 2.99323L4.43358 2.99309C4.26562 2.86267 4.09357 2.81908 3.9439 2.81908C3.78141 2.81908 3.65021 2.86969 3.57925 2.90447ZM3.57925 2.90447L3.6452 3.0392L3.57917 2.90451C3.5792 2.9045 3.57922 2.90449 3.57925 2.90447ZM5.68907 18.6193L5.689 18.6193C5.17477 19.0204 4.56011 19.2251 3.93989 19.2251C3.51408 19.2251 3.08454 19.1284 2.68158 18.9318C1.69398 18.4489 1.08066 17.4666 1.08066 16.367V3.63283C1.08066 2.53315 1.69402 1.55092 2.68221 1.06826L2.68221 1.06826C3.66981 0.585881 4.82157 0.705615 5.68964 1.3811C5.68965 1.38111 5.68967 1.38113 5.68969 1.38114L13.8636 7.74832L13.8636 7.74834C14.563 8.29297 14.9639 9.11307 14.9639 9.99949V9.99958C14.9644 10.886 14.5635 11.7069 13.8641 12.2518L5.68907 18.6193Z"
                stroke="#212344"
                strokeWidth="0.3"
              />
              <path
                d="M18.4193 1.79688V18.2031C18.4193 18.7674 17.9618 19.225 17.3975 19.225C16.8331 19.225 16.3756 18.7674 16.3756 18.2031V1.79688C16.3756 1.23256 16.8331 0.775 17.3975 0.775C17.9618 0.775 18.4193 1.23256 18.4193 1.79688Z"
                stroke="#212344"
                strokeWidth="0.3"
              />
            </svg>

            <div className={styles.separator}></div>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleCreateLobby(4, null, null)}
              style={{
                cursor: "pointer",
                transition: "fill 0.3s ease",
                fill: "white", // Cor inicial
              }}
              onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
              onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}
            >
              <g clipPath="url(#clip0_10033_160)">
                <path
                  d="M4.34886 0.556444L2.27245 2.42902C1.88731 2.77546 1.85615 3.36861 2.20286 3.75351C2.54965 4.13829 3.14276 4.1689 3.52732 3.82178L5.60373 1.94437C5.9885 1.59757 6.01911 1.00443 5.67209 0.619882C5.23139 0.179166 4.65078 0.279972 4.34886 0.556444ZM15.7905 0.620026C15.4438 1.0049 15.475 1.59807 15.8601 1.94451L17.9353 3.82192C18.3199 4.16895 18.913 4.13834 19.2598 3.75365C19.6065 3.36875 19.5753 2.77561 19.1902 2.42917L17.115 0.556588C16.8448 0.312454 16.2704 0.14005 15.7905 0.620026ZM10.7331 1.32678C5.90096 1.32678 1.96361 5.26534 1.96361 10.0975C1.96361 12.6095 3.03378 14.8733 4.7346 16.4745L3.46263 18.1945C3.15602 18.6109 3.24451 19.1969 3.6604 19.5043C4.07703 19.8117 4.66402 19.7233 4.97143 19.3066L6.22754 17.6049C7.54703 18.4006 9.0848 18.8684 10.7332 18.8684C12.3911 18.8684 13.9381 18.3958 15.262 17.5915L16.5327 19.3066C16.8401 19.7233 17.4271 19.8117 17.8437 19.5043C18.2596 19.1969 18.3481 18.6109 18.0415 18.1945L16.7549 16.4525C18.4406 14.8526 19.5003 12.5977 19.5003 10.0975C19.5003 5.26534 15.5653 1.32678 10.7331 1.32678ZM10.7331 3.20426C14.552 3.20426 17.6264 6.27868 17.6264 10.0975C17.6264 13.9164 14.552 16.9897 10.7331 16.9897C6.91429 16.9897 3.83617 13.9164 3.83617 10.0975C3.83617 6.27868 6.91429 3.20426 10.7331 3.20426ZM10.7527 5.51377C10.2335 5.51377 9.81322 5.93577 9.81525 6.45496V9.6632H7.95123C7.43251 9.66119 7.01074 10.0807 7.01007 10.5995C7.00801 11.1201 7.4306 11.5426 7.95123 11.5406H10.7527C11.3697 11.5382 11.6905 11.0683 11.689 10.5995V6.45496C11.691 5.93625 11.2715 5.51446 10.7527 5.51377Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_10033_160">
                  <rect width="20" height="20"
                    transform="translate(0.75 -9.15527e-05)" />
                </clipPath>
              </defs>
            </svg>



            <div className={styles.separator}></div>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleCreateLobby(3, null, null)}
              style={{
                cursor: "pointer",
                transition: "fill 0.3s ease",
              }}
              onMouseEnter={(e) => {
                // Altera a cor de todos os paths dentro do g
                const paths = e.currentTarget.querySelectorAll('g path');
                paths.forEach(path => {
                  path.style.transition = "stroke 0.3s ease";
                  path.style.stroke = "red"; // Muda a cor para vermelha
                });
              }}
              onMouseLeave={(e) => {
                // Restaura a cor original dos paths
                const paths = e.currentTarget.querySelectorAll('g path');
                paths.forEach(path => {
                  path.style.transition = "stroke 0.3s ease";
                  path.style.stroke = "white"; // Restaura a cor original
                });
              }}
            >
              <g clipPath="url(#clip0_10378_151)">
                <path d="M8.01453 4.76427L8.01464 4.76416C8.14447 4.63426 8.35588 4.63426 8.4857 4.76416C8.6159 4.89445 8.6159 5.10538 8.4857 5.23566L7.825 5.89636L7.47145 6.24991L7.825 6.60347L8.4857 7.26416C8.6159 7.39445 8.6159 7.60538 8.4857 7.73566L8.48537 7.736C8.42073 7.8008 8.33671 7.83325 8.25017 7.83325C8.16364 7.83325 8.07962 7.8008 8.01498 7.73599L8.01453 7.73555L7.35373 7.07475L7.00017 6.72119L6.64662 7.07475L5.98581 7.73555L5.98537 7.736C5.92073 7.8008 5.83671 7.83325 5.75017 7.83325C5.66364 7.83325 5.57962 7.8008 5.51498 7.73599L5.51464 7.73566C5.38444 7.60538 5.38444 7.39445 5.51464 7.26416L6.17534 6.60347L6.52889 6.24991L6.17534 5.89636L5.51464 5.23566C5.51461 5.23563 5.51457 5.23559 5.51453 5.23555C5.38444 5.10526 5.38448 4.89441 5.51464 4.76416C5.64447 4.63426 5.85588 4.63426 5.9857 4.76416L5.98581 4.76427L6.64662 5.42508L7.00017 5.77863L7.35373 5.42508L8.01453 4.76427Z" stroke="white" />
                <path d="M12.083 13.7496C12.083 12.4178 13.1676 11.3329 14.4997 11.3329C15.8318 11.3329 16.9163 12.4178 16.9163 13.7496C16.9163 15.0814 15.8318 16.1663 14.4997 16.1663C13.1676 16.1663 12.083 15.0814 12.083 13.7496ZM12.7497 13.7496C12.7497 14.7148 13.5344 15.4996 14.4997 15.4996C15.4649 15.4996 16.2497 14.7148 16.2497 13.7496C16.2497 12.7844 15.4649 11.9996 14.4997 11.9996C13.5344 11.9996 12.7497 12.7844 12.7497 13.7496Z" stroke="white" />
                <path d="M9.48085 12.441C9.47621 12.4353 9.47078 12.4284 9.46499 12.4207L9.46402 12.4194L9.44879 12.399L9.4391 12.3864C9.43728 12.3841 9.43611 12.3827 9.43551 12.382C9.43035 12.3767 9.42557 12.3716 9.42116 12.3667L8.37968 11.3248C8.37662 11.322 8.37332 11.3189 8.36982 11.3155C8.36976 11.3155 8.3697 11.3154 8.36963 11.3154L8.35817 11.3066L8.34899 11.2996L8.33755 11.291L8.33429 11.2885C8.32603 11.2821 8.31869 11.2762 8.31286 11.2714C8.30694 11.2685 8.29933 11.2647 8.29117 11.2605L8.28312 11.2564L8.28316 11.2563C8.27217 11.2504 8.26223 11.2448 8.25574 11.2412L8.24642 11.236C8.23397 11.2316 8.21711 11.2268 8.1948 11.2221L8.19368 11.2219C8.1935 11.2218 8.19331 11.2218 8.19311 11.2218L8.17588 11.2207L8.14851 11.2193L8.14517 11.2191C8.14041 11.2188 8.13589 11.2185 8.13169 11.2182C8.12411 11.219 8.11425 11.2201 8.10312 11.2211C8.09253 11.2221 8.08288 11.2229 8.07587 11.2235L8.05735 11.2251C8.056 11.2252 8.05492 11.2253 8.05407 11.2254C8.05028 11.2261 8.04674 11.2267 8.04347 11.2272C6.35636 11.5807 4.62418 11.065 3.40514 9.84205C2.4463 8.88457 1.91667 7.60689 1.91667 6.24991C1.91667 4.89275 2.44643 3.61505 3.40731 2.656C4.36521 1.69626 5.64294 1.16658 7 1.16658C8.34887 1.16658 9.61936 1.68989 10.5753 2.63867C10.5808 2.64343 10.587 2.64896 10.5936 2.6552L10.5988 2.66011L10.6039 2.66515L12.8522 4.91349L12.8615 4.92279L12.8614 4.92291L12.8612 4.92283L12.8613 4.92296L12.8685 4.92962L12.8756 4.93669L15.8985 7.95975L15.8985 7.95976L15.9053 7.96662L15.9098 7.97114C15.9114 7.9727 15.9121 7.9734 15.9122 7.97355C15.9123 7.97358 15.9123 7.97359 15.9123 7.97359L15.9216 7.98241L15.9215 7.98254L18.0835 10.1446C18.0957 10.1568 18.1059 10.1682 18.1141 10.1779C19.0613 11.1335 19.5833 12.4026 19.5833 13.7499C19.5833 15.1071 19.0536 16.3848 18.0927 17.3438C17.1348 18.3036 15.8571 18.8332 14.5 18.8332C13.143 18.8332 11.8655 18.3036 10.9062 17.3431C10.906 17.343 10.9059 17.3428 10.9058 17.3427M9.48085 12.441L11.2592 16.989L10.9054 17.3423C10.9055 17.3424 10.9057 17.3426 10.9058 17.3427M9.48085 12.441L9.48239 12.4442L9.49549 12.471L9.4961 12.4723C9.501 12.482 9.50561 12.4907 9.50934 12.4976L9.51049 12.5019L9.51844 12.5321L9.51899 12.5341C9.52108 12.5417 9.52315 12.5487 9.52502 12.5548L9.48085 12.441ZM10.9058 17.3427C9.68446 16.1245 9.16745 14.3904 9.52197 12.7033M10.9058 17.3427L9.52197 12.7033M9.52197 12.7033C9.52282 12.6982 9.52384 12.6925 9.52505 12.6865L9.52549 12.6843C9.5256 12.6836 9.52596 12.6812 9.52644 12.6764C9.5273 12.6679 9.52805 12.6576 9.52921 12.6389C9.52925 12.6383 9.52929 12.6377 9.52932 12.6371L10.0284 12.6682C10.0287 12.6611 10.0296 12.654 10.0305 12.6468C10.0317 12.6376 10.0328 12.6285 10.0328 12.6195C10.0328 12.5957 10.0299 12.5719 10.027 12.5481L9.52197 12.7033ZM19.681 0.597602L19.6811 0.597492C19.811 0.467584 20.0224 0.467584 20.1522 0.597492C20.2825 0.727898 20.2822 0.938659 20.1524 1.06836L20.1523 1.06847L17.5673 3.65352L17.2874 3.93338L17.4955 4.27001C17.8525 4.84733 17.8657 5.57776 17.4942 6.17269L17.4942 6.17281L16.767 7.33817L16.5567 7.67537L16.8377 7.95641L18.5502 9.66887C18.5543 9.67374 18.559 9.67909 18.5642 9.68475L18.5708 9.69197L18.5778 9.69892C19.6567 10.7831 20.25 12.2188 20.25 13.7499C20.25 15.2875 19.6519 16.7294 18.5646 17.8153L18.5641 17.8157C17.4796 18.9018 16.0377 19.4999 14.5 19.4999C12.9624 19.4999 11.5205 18.9018 10.4351 17.8149L10.4343 17.8141C9.14949 16.5333 8.55588 14.749 8.80146 12.9699L8.83542 12.7238L8.65986 12.5481L8.19742 12.0853L8.02184 11.9095L7.77573 11.9433C7.50405 11.9806 7.24354 12.0046 6.99125 12.0046C5.48439 12.0046 4.02826 11.4111 2.93489 10.3148L2.93416 10.314C1.84811 9.22949 1.25 7.78758 1.25 6.24991C1.25 4.71231 1.84806 3.27038 2.93538 2.18456L2.93587 2.18407C4.02042 1.09802 5.46233 0.499908 7 0.499908C8.53074 0.499908 9.96549 1.09286 11.0495 2.17102L11.0558 2.17732L11.0624 2.1834C11.0705 2.1909 11.078 2.19744 11.0846 2.20291L12.8495 3.96758L13.1394 4.25747L13.4805 4.02996L14.5571 3.31181C15.1395 2.92339 15.8894 2.91937 16.4806 3.26779L16.8142 3.46438L17.0881 3.19058L19.681 0.597602ZM18.5285 9.64182L18.5294 9.64297L18.5281 9.64128L18.5285 9.64182ZM9.49991 12.4638L9.5001 12.4641L9.49991 12.4638ZM14.1271 4.40027L13.6199 4.73864L14.051 5.16975L15.6282 6.74689L16.0731 7.19184L16.406 6.65787L16.9284 5.81993C17.2111 5.36672 17.1442 4.78318 16.7671 4.4054L16.7668 4.40506L16.3711 4.00935L16.3708 4.00902C15.9858 3.62478 15.3792 3.5644 14.9264 3.86697C14.9264 3.86701 14.9263 3.86704 14.9263 3.86708L14.1271 4.40027Z" stroke="white" />
                <path d="M11.819 10.2357L11.8187 10.236C11.7541 10.3008 11.67 10.3333 11.5835 10.3333C11.497 10.3333 11.4129 10.3008 11.3483 10.236L11.3479 10.2356L10.5146 9.40234C10.5146 9.4023 10.5146 9.40226 10.5145 9.40222C10.3844 9.27193 10.3845 9.06108 10.5146 8.93084C10.6445 8.80093 10.8559 8.80093 10.9857 8.93084L10.9858 8.93095L11.819 9.76417C11.8191 9.76421 11.8191 9.76424 11.8191 9.76428C11.9492 9.89457 11.9492 10.1054 11.819 10.2357Z" stroke="#FEFEFF" />
              </g>
              <defs>
                <clipPath id="clip0_10378_151">
                  <rect width="20" height="20" fill="white" transform="translate(0.75 -9.15527e-05)" />
                </clipPath>
              </defs>
            </svg>



            <div className={styles.separator}></div>
            <svg width="13" height="15" viewBox="0 0 13 15" fill="white"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsPriorityOpen(!isPriorityOpen)}
              style={{
                cursor: "pointer",
                transition: "fill 0.3s ease",
                fill: "white", // Cor inicial
              }}
              onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
              onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}>
              <path d="M10.5046 6.40436C10.5046 6.57723 10.3644 6.71742 10.1915 6.71742H5.18262V8.2827H10.1915C10.3644 8.2827 10.5046 8.42288 10.5046 8.59576V8.87719L12.1995 7.50007L10.5046 6.12292V6.40436Z" />
              <path d="M0.800293 9.22185H4.557V8.59573V6.40431V5.7782H0.800293V9.22185Z" />
              <path d="M10.5046 12.0394C10.5046 12.2123 10.3644 12.3525 10.1915 12.3525H5.18262V13.9177H10.1915C10.3644 13.9177 10.5046 14.0579 10.5046 14.2308V14.5122L12.1995 13.1351L10.5046 11.7579V12.0394Z" />
              <path d="M0.800293 14.857H4.557C4.557 14.4438 4.557 11.9163 4.557 11.4133H0.800293V14.857Z" />
              <path d="M0.800293 3.58684H4.557C4.557 3.26308 4.557 0.466948 4.557 0.143188H0.800293V3.58684Z" />
              <path d="M10.5046 2.96077V3.24221L12.1995 1.86506L10.5046 0.487915V0.769351C10.5046 0.942223 10.3644 1.08241 10.1915 1.08241H5.18262V2.64769H10.1915C10.3644 2.64772 10.5046 2.78787 10.5046 2.96077Z" />
            </svg>

            {isPriorityOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "40px",
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="white"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => handleCreateLobby(2, null, null)}
              style={{
                cursor: "pointer",
                transition: "fill 0.3s ease",
                fill: "white", // Cor inicial
              }}
              onMouseEnter={(e) => (e.currentTarget.style.fill = "red")}
              onMouseLeave={(e) => (e.currentTarget.style.fill = "white")}>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69448 0.111084C5.87629 0.111084 5.213 0.774365 5.213 1.59257V3.07405H0.768555V4.55553H2.25004V14.9259C2.25004 16.5623 3.5766 17.8889 5.213 17.8889H12.9908C14.4226 17.8889 15.5834 16.7281 15.5834 15.2963V4.55553H17.0648V3.07405H12.6204V1.59257C12.6204 0.774365 11.9571 0.111084 11.1389 0.111084H6.69448ZM14.1019 4.55553H3.73152V14.9259C3.73152 15.7441 4.39481 16.4074 5.213 16.4074H12.9908C13.6044 16.4074 14.1019 15.9099 14.1019 15.2963V4.55553ZM11.1389 3.07405H6.69448V2.33331C6.69448 1.92421 7.02612 1.59257 7.43522 1.59257H10.3982C10.8073 1.59257 11.1389 1.92421 11.1389 2.33331V3.07405Z" />
            </svg>

          </div>
        )}
      </div>
    </body>
  );
};
export default Main;
