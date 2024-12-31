import { useState } from "react";
import Timer from "../../utils/Timer/Timer";
import styles from "./main.module.css";
import lupa from "../../assets/Lupa.svg";
import save from "../../assets/save.svg";
import manageColumns from "../../assets/manageColumns.svg";
import moreFilters from "../../assets/moreFilters.svg";
import searchTournaments from "../../assets/searchTournaments.svg";
import teste from "../../assets/siteRed.svg";
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
import notification from "../../assets/notification.svg";
import engine from "../../assets/engine.svg";
import ToggleThemeBtn from "../../utils/ToggleThemeBtn/ToggleThemeBtn";
import Notifications from "../../utils/Notifications/Notifications";
import SpeedMap from "../../utils/SpeedMap/SpeedMap";
import FormatNumber from "../../utils/FormatNumber/FormatValue";
import CostumizeColumns from "../../utils/CostumizeColumns/CostumizeColumns";

const Main = () => {
  const data = [
    {
      site: teste,
      start: "16:30",
      buyIn: 350,
      name: "I Tournament",
      prizePool: 12348,
      maxReentry: 125,
      blinds: "70",
      speed: 2,
      field: 105,
      end: "18:30",
      mlr: 200,
      tableSize: 5,
      priority: 9,
    },
    {
      site: b,
      start: "12:30",
      buyIn: 320,
      name: "B Tournament",
      prizePool: 500,
      maxReentry: null,
      blinds: "50",
      speed: 3,
      field: 100,
      end: "14:00",
      mlr: 120,
      tableSize: 9,
      priority: 3,
    },
    {
      site: c,
      start: "16:00",
      buyIn: 450,
      name: "H Tournament",
      prizePool: 1000,
      maxReentry: 150,
      blinds: "60",
      speed: 3,
      field: 110,
      end: "18:00",
      mlr: 1000,
      tableSize: 6,
      priority: 8,
    },
    {
      site: d,
      start: "13:00",
      buyIn: 422,
      name: "C Tournament",
      prizePool: 15000,
      maxReentry: 200,
      blinds: "100",
      speed: 2,
      field: 120,
      end: "15:59",
      mlr: 850,
      tableSize: 6,
      priority: 2,
    },
    {
      site: e,
      start: "17:30",
      buyIn: 30,
      name: "K Tournament",
      prizePool: 50000,
      maxReentry: 90,
      blinds: "40",
      speed: 3,
      field: 95,
      end: "19:30",
      mlr: 320,
      tableSize: 4,
      priority: 10,
    },
    {
      site: f,
      start: "12:30",
      buyIn: 32,
      name: "A Tournament",
      prizePool: 7000,
      maxReentry: 123,
      blinds: "50",
      speed: 1,
      field: 100,
      end: "14:00",
      mlr: 540,
      tableSize: 5,
      priority: 1,
    },
    {
      site: g,
      start: "15:00",
      buyIn: 60,
      name: "F Tournament",
      prizePool: 9000,
      maxReentry: 500,
      blinds: "200",
      speed: 2,
      field: 200,
      end: "17:00",
      mlr: 200,
      tableSize: 10,
      priority: 6,
    },
    {
      site: h,
      start: "23:00",
      buyIn: 55,
      name: "J Tournament",
      prizePool: 15000,
      maxReentry: 250,
      blinds: "80",
      speed: 1,
      field: 130,
      end: "19:00",
      mlr: 100,
      tableSize: 8,
      priority: 9,
    },
    {
      site: i,
      start: "15:30",
      buyIn: 25,
      name: "G Tournament",
      prizePool: 250000,
      maxReentry: 100,
      blinds: "50",
      speed: 1,
      field: 90,
      end: "17:30",
      mlr: 450,
      tableSize: 7,
      priority: 7,
    },
    {
      site: j,
      start: "14:30",
      buyIn: 20,
      name: "E Tournament",
      prizePool: 14500,
      maxReentry: 50,
      blinds: "25",
      speed: 4,
      field: 80,
      end: "16:30",
      mlr: 150,
      tableSize: 4,
      priority: 5,
    },
    {
      site: b,
      start: "14:00",
      buyIn: 50,
      name: "D Tournament",
      prizePool: 40000,
      maxReentry: 300,
      blinds: "75",
      speed: 4,
      field: 150,
      end: "00:10",
      mlr: 340,
      tableSize: 8,
      priority: 4,
    },
  ];

  //Modals
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSpeed, setIsOpenSpeed] = useState(false);
  const [isOpenSize, setIsOpenSize] = useState(false);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const [isOpenCostumizeColumns, setIsOpenCostumizeColumns] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };
  const toggleOpenSpeed = () => {
    setIsOpenSpeed((prevState) => !prevState);
  };
  const toggleOpenSize = () => {
    setIsOpenSize((prevState) => !prevState);
  };
  const toggleOpenNotifications = () => {
    setIsOpenNotifications((prevState) => !prevState);
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
  const [orderList, setOrderList] = useState(data);
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
        ? a.maxReentry - b.maxReentry
        : b.maxReentry - a.maxReentry
    );
    setOrderList(newListMaxReentry);
    setOrderMaxReentryFilter(orderMaxReentryFilter === "asc" ? "desc" : "asc");
  };

  const orderedListName = () => {
    const newList = [...orderList];
    newList.sort((a, b) =>
      orderNameFilter === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setOrderList(newList);
    setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
  };

  const orderedListBuyIn = () => {
    const newListBuyIn = [...orderList];
    newListBuyIn.sort((a, b) =>
      orderBuyInFilter === "asc" ? a.buyIn - b.buyIn : b.buyIn - a.buyIn
    );
    setOrderList(newListBuyIn);
    setOrderBuyInFilter(orderBuyInFilter === "asc" ? "desc" : "asc");
  };

  const orderedBlinds = () => {
    const newListBlinds = [...orderList];
    newListBlinds.sort((a, b) =>
      orderBlindsFilter === "asc" ? a.blinds - b.blinds : b.blinds - a.blinds
    );
    setOrderList(newListBlinds);
    setOrderBlindsFilter(orderBlindsFilter === "asc" ? "desc" : "asc");
  };

  //SelecionedFilters
  const [activeFilter, setActiveFilter] = useState(null);
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  //FilterBar Btns
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

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <div className={styles.titlef}>Tournament List</div>
        <div className={styles.btns}>
          <div className={styles.btns}>
            <div>
              <ToggleThemeBtn />
            </div>
            <div>
              <button
                className={styles.navNotificationBtn}
                onClick={() => toggleOpenNotifications(true)}
              >
                <img src={notification} alt="" />
              </button>
            </div>
            <Notifications isOpenNotifications={isOpenNotifications} />
            <div>
              <button className={styles.navEngineBtn}>
                <img src={engine} alt="" />
              </button>
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
              Select Site
            </button>
          </label>
          <SelectSite isOpen={isOpen} />
          <div className={styles.maxMinSearch}>
            <label htmlFor="min-value" className={styles.labelMaxMinValue}>
              <div>Min $</div>
              <input
                type="number"
                id="min-value"
                name="min-value"
                placeholder="Type..."
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
              Speed
            </button>
          </label>
          <Speed isOpenSpeed={isOpenSpeed} />
          <label htmlFor="size" className={styles.labelSelectSize}>
            <button
              name="size"
              id="size"
              className={styles.selectSize}
              onClick={() => toggleOpenSize(true)}
            >
              Size
            </button>
          </label>
          <Size isOpenSize={isOpenSize} />
          <button className={styles.searchBtn}>
            <img src={lupa} alt="Lupa icon" />{" "}
          </button>
          <button className={styles.saveBtn}>
            <img src={save} alt="Save icon" />
          </button>
        </div>
        <div className={styles.searchRight}>
          <button className={styles.manageColumnsBtn} onClick={() => setIsOpenCostumizeColumns(true)}>
            <div>
              <img src={manageColumns} alt="Manage Columns" />
            </div>
            Manage Columns
          </button>
          <button className={styles.moreFiltersBtn} >
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
          .map((button, index) => (
            <button
              key={index}
              className={`${button.className} ${button.isActive ? styles.active : ""}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
      </div>
      <table>
        <tbody>
          <tr>
            {orderList.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "transparent"
                      : "rgba(255, 255, 255, 0.05)",
                }}
              >
                {allowedFilters && allowedFilters.includes("Site") && (
                  <td className={styles.siteTable}>
                    <img src={item.site} alt="svg" />
                  </td>
                )}
                {allowedFilters && allowedFilters.includes("Start") && (
                  <td className={styles.startTable}>{item.start}</td>
                )}
                {allowedFilters && allowedFilters.includes("Buy In") && (
                  <td className={styles.buyInTable}>${item.buyIn}</td>
                )}
                {allowedFilters && allowedFilters.includes("Name") && (
                  <td className={styles.nameTable}>{item.name}</td>
                )}
                {allowedFilters && allowedFilters.includes("Prize Pool") && (
                  <td className={styles.prizePoolTable}>
                    ${item.prizePool}
                  </td>
                )}
                {allowedFilters && allowedFilters.includes("Max Reentry") && (
                  <td className={styles.maxReentryTable}>
                    {item.maxReentry === null ? "-" : item.maxReentry}
                  </td>
                )}
                {allowedFilters && allowedFilters.includes("Blinds") && (
                  <td className={styles.blindsTable}>{item.blinds}</td>
                )}
                {allowedFilters && allowedFilters.includes("Speed") && (
                  <td className={styles.speedTable}>
                    <SpeedMap speed={item.speed} />
                  </td>
                )}
                {allowedFilters && allowedFilters.includes("Field") && (
                  <td className={styles.fieldTable}>{item.field}</td>
                )}
                {allowedFilters && allowedFilters.includes("End") && (
                  <td className={styles.endTable}>{item.end}</td>
                )}
                {allowedFilters && allowedFilters.includes("MLR") && (
                  <td className={styles.mlrTable}>
                    <Timer startEvent={item.start} />
                  </td>
                )}
                {allowedFilters && allowedFilters.includes("Table Size") && (
                  <td className={styles.tableSizeTable}>{item.tableSize}</td>
                )}
                {allowedFilters && allowedFilters.includes("Priority") && (
                  <td className={styles.priorityTable}>{item.priority}</td>
                )}
              </div>
            ))}
          </tr>
        </tbody>
      </table>
      <CostumizeColumns
        isOpen={isOpenCostumizeColumns}
        closeModal={() => setIsOpenCostumizeColumns(false)}
        onColumnsChange={(updatedColumns) => setAllowedFilters(updatedColumns)}
      />
    </div>
  );
};

export default Main;
