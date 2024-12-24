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

const Main = () => {
  const data = [
    {
      site: teste,
      start: "16:30",
      buyIn: 350,
      name: "I Tournament",
      prizePool: "$17k",
      maxReentry: 125,
      blinds: "70",
      speed: "medium",
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
      prizePool: "$15k",
      maxReentry: null,
      blinds: "50",
      speed: "fast",
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
      prizePool: "$18k",
      maxReentry: 150,
      blinds: "60",
      speed: "fast",
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
      prizePool: "$20k",
      maxReentry: 200,
      blinds: "100",
      speed: "medium",
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
      prizePool: "$13k",
      maxReentry: 90,
      blinds: "40",
      speed: "fast",
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
      prizePool: "$15k",
      maxReentry: 123,
      blinds: "50",
      speed: "slow",
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
      prizePool: "$30k",
      maxReentry: 500,
      blinds: "200",
      speed: "medium",
      field: 200,
      end: "17:00",
      mlr: 200,
      tableSize: 10,
      priority: 6,
    },
    {
      site: h,
      start: "17:00",
      buyIn: 55,
      name: "J Tournament",
      prizePool: "$22k",
      maxReentry: 250,
      blinds: "80",
      speed: "slow",
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
      prizePool: "$12k",
      maxReentry: 100,
      blinds: "50",
      speed: "slow",
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
      prizePool: "$10k",
      maxReentry: 50,
      blinds: "25",
      speed: "slow",
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
      prizePool: "$25k",
      maxReentry: 300,
      blinds: "75",
      speed: "fast",
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
  const [orderList, setOrderList] = useState(data);



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

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <p className={styles.title}>Tournament List</p>
        <div className={styles.btns}>
          <ul>
            <li>
              <ToggleThemeBtn />
            </li>
            <li>
              <button
                className={styles.navNotificationBtn}
                onClick={() => toggleOpenNotifications(true)}
              >
                <img src={notification} alt="" />
              </button>
            </li>
            <Notifications isOpenNotifications={isOpenNotifications} />
            <li>
              <button className={styles.navEngineBtn}>
                <img src={engine} alt="" />
              </button>
            </li>
          </ul>
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
            {" "}
            <img src={lupa} alt="Lupa icon" />{" "}
          </button>
          <button className={styles.saveBtn}>
            <img src={save} alt="Save icon" />
          </button>
        </div>
        <div className={styles.searchRight}>
          <button className={styles.manageColumnsBtn}>
            <div>
              <img src={manageColumns} alt="Manage Columns" />
            </div>
            Manage Columns
          </button>
          <button className={styles.moreFiltersBtn}>
            <div>
              <img src={moreFilters} alt="More Filters" />
            </div>
            More Filters
          </button>
        </div>
      </div>
      <div className={styles.filterbar}>
        <input type="checkbox" className={styles.filterCheckbox} />
        <button className={styles.filterSiteBtn} onClick={orderedListSite}>
          Site
        </button>
        <button className={styles.filterStartBtn} onClick={orderedListStart}>
          Start
        </button>
        <button
          className={styles.filterBuyInBtn}
          onClick={() => orderedListBuyIn()}
        >
          Buy In
        </button>
        <button className={styles.filterNameBtn} onClick={orderedListName}>
          Name
        </button>
        <button className={styles.filterPrizePoolBtn}>Prize Pool</button>
        <button
          className={styles.filterMaxReentryBtn}
          onClick={orderedListMaxReentry}
        >
          Max Reentry
        </button>
        <button className={styles.filterBlindsBtn} onClick={orderedBlinds}>
          Blinds
        </button>
        <button className={styles.filterSpeedBtn}>Speed</button>
        <button className={styles.filterFieldBtn} onClick={orderedListField}>
          Field
        </button>
        <button className={styles.filterEndBtn} onClick={orderedListEnd}>
          End
        </button>
        <button className={styles.filterMlrBtn} onClick={orderedListStart}>
          Mlr
        </button>
        <button
          className={styles.filterTableSizeBtn}
          onClick={orderedListTableSize}
        >
          TableSize
        </button>
        <button
          className={styles.filterPriorityBtn}
          onClick={orderedListPriority}
        >
          Priority
        </button>
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
                <td className={styles.stylesCheckboxTable}>
                  <FavouriteStar className={styles.favouriteStar} />
                  <input type="checkbox" className={styles.checkBoxTable} />
                </td>
                <td className={styles.siteTable}>
                  <img src={item.site} alt="svg" />
                </td>
                <td className={styles.startTable}>{item.start}</td>
                <td className={styles.buyInTable}>${item.buyIn}</td>
                <td className={styles.nameTable}>{item.name}</td>
                <td className={styles.prizePoolTable}>{item.prizePool}</td>
                <td
                  className={styles.maxReentryTable}
                  onClick={orderedListMaxReentry}
                >
                  {item.maxReentry}
                </td>
                <td className={styles.blindsTable}>{item.blinds}</td>
                <td className={styles.speedTable}>{item.speed}</td>
                <td className={styles.fieldTable}>{item.field}</td>
                <td className={styles.endTable}>{item.end}</td>
                <td className={styles.mlrTable}>
                  <Timer startEvent={item.start} />
                </td>
                <td className={styles.tableSizeTable}>{item.tableSize}</td>
                <td className={styles.priorityTable}>{item.priority}</td>
              </div>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Main;
