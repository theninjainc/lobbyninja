import { useState } from "react";
import styles from "./main.module.css";
import lupa from "../../assets/Lupa.svg";
import save from "../../assets/save.svg";
import manageColumns from "../../assets/manageColumns.svg";
import moreFilters from "../../assets/moreFilters.svg";
import searchTournaments from "../../assets/searchTournaments.svg";
import teste from "../../assets/siteRed.svg";
import teste2 from "../../assets/image 1.svg";
import teste3 from "../../assets/image 2.svg"
import teste4 from "../../assets/image 3.svg"
import teste5 from "../../assets/image 4.svg"
import teste6 from "../../assets/image 5.svg";
import teste7 from "../../assets/image 6.svg";
import teste8 from "../../assets/image 7.svg"
import teste9 from "../../assets/image 8.svg"
import teste10 from "../../assets/image 9.svg"
import SelectSite from "../../utils/SelectSite/SelectSite";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";
import Speed from "../../utils/Speed/Speed";
import Size from "../../utils/Size/Size";
import notification from "../../assets/notification.svg";
import engine from "../../assets/engine.svg"; 
import ToggleThemeBtn from "../../utils/ToggleThemeBtn/ToggleThemeBtn";

const Main = () => {
  const data = [
    {
      site: teste,
      start: "16:30",
      buyIn: "$35",
      name: "I Tournament",
      prizePool: "$17k",
      maxReentry: "$125",
      blinds: "70",
      speed: "medium",
      field: "105",
      end: "18:30",
      mlr: "03:20",
      tableSize: "5",
      priority: "9",
    },
    {
      site: teste2,
      start: "12:30",
      buyIn: "$32",
      name: "B Tournament",
      prizePool: "$15k",
      maxReentry: "-",
      blinds: "50",
      speed: "fast",
      field: "100",
      end: "14:00",
      mlr: "02:59",
      tableSize: "9",
      priority: "3",
    },
    {
      site: teste3,
      start: "16:00",
      buyIn: "$45",
      name: "H Tournament",
      prizePool: "$18k",
      maxReentry: "$150",
      blinds: "60",
      speed: "fast",
      field: "110",
      end: "18:00",
      mlr: "03:45",
      tableSize: "6",
      priority: "8",
    },
    {
      site: teste4,
      start: "13:00",
      buyIn: "$40",
      name: "C Tournament",
      prizePool: "$20k",
      maxReentry: "$200",
      blinds: "100",
      speed: "medium",
      field: "120",
      end: "15:30",
      mlr: "03:10",
      tableSize: "6",
      priority: "2",
    },
    {
      site: teste5,
      start: "17:30",
      buyIn: "$30",
      name: "K Tournament",
      prizePool: "$13k",
      maxReentry: "$90",
      blinds: "40",
      speed: "fast",
      field: "95",
      end: "19:30",
      mlr: "02:55",
      tableSize: "4",
      priority: "11",
    },
    {
      site: teste6,
      start: "12:30",
      buyIn: "$32",
      name: "A Tournament",
      prizePool: "$15k",
      maxReentry: "$123",
      blinds: "50",
      speed: "slow",
      field: "100",
      end: "14:00",
      mlr: "02:59",
      tableSize: "5",
      priority: "1",
    },
    {
      site: teste7,
      start: "15:00",
      buyIn: "$60",
      name: "F Tournament",
      prizePool: "$30k",
      maxReentry: "$500",
      blinds: "200",
      speed: "medium",
      field: "200",
      end: "17:00",
      mlr: "04:00",
      tableSize: "10",
      priority: "6",
    },
    {
      site: teste8,
      start: "17:00",
      buyIn: "$55",
      name: "J Tournament",
      prizePool: "$22k",
      maxReentry: "$250",
      blinds: "80",
      speed: "slow",
      field: "130",
      end: "19:00",
      mlr: "03:50",
      tableSize: "8",
      priority: "10",
    },
    {
      site: teste9,
      start: "15:30",
      buyIn: "$25",
      name: "G Tournament",
      prizePool: "$12k",
      maxReentry: "$100",
      blinds: "50",
      speed: "slow",
      field: "90",
      end: "17:30",
      mlr: "03:15",
      tableSize: "7",
      priority: "7",
    },
    {
      site: teste10,
      start: "14:30",
      buyIn: "$20",
      name: "E Tournament",
      prizePool: "$10k",
      maxReentry: "$50",
      blinds: "25",
      speed: "slow",
      field: "80",
      end: "16:30",
      mlr: "02:45",
      tableSize: "4",
      priority: "5",
    },
    {
      site: teste2,
      start: "14:00",
      buyIn: "$50",
      name: "D Tournament",
      prizePool: "$25k",
      maxReentry: "$300",
      blinds: "75",
      speed: "fast",
      field: "150",
      end: "16:00",
      mlr: "03:30",
      tableSize: "8",
      priority: "4",
    },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSpeed, setIsOpenSpeed] = useState(false);
  const [isOpenSize, setIsOpenSize] = useState(false);


  const toggleOpen = () =>{
    setIsOpen((prevState)=> !prevState);
  }
  const toggleOpenSpeed = () =>{
    setIsOpenSpeed((prevState)=> !prevState);
  }
  const toggleOpenSize = () =>{
    setIsOpenSize((prevState)=> !prevState);
  }


  const [orderNameFilter, setOrderNameFilter] = useState("asc");
  const [orderList, setOrderList] = useState(data);

  const orderedList = () => {
    const newList = [...orderList];
    newList.sort((a, b) =>
      orderNameFilter === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setOrderList(newList);
    setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
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
              <button className={styles.navNotificationBtn}><img src={notification} alt="" /></button>
            </li>
            <li>
              <button className={styles.navEngineBtn}><img src={engine} alt="" /></button>
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
            <button name="site" id="site" className={styles.selectSite} onClick={() => toggleOpen(true)}>
              Select Site
            </button>
          </label>
          <SelectSite isOpen={isOpen}/>
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
            <button name="speed" id="speed" className={styles.selectSpeed} onClick={()=>toggleOpenSpeed(true)}>
            Speed
            </button>
          </label>
          <Speed isOpenSpeed={isOpenSpeed}/>
          <label htmlFor="size" className={styles.labelSelectSize}>
            <button name="size" id="size" className={styles.selectSize} onClick={()=>toggleOpenSize(true)}>
              Size
            </button>
          </label>
          <Size isOpenSize={isOpenSize}/>
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
        <button className={styles.filterSiteBtn}>Site</button>
        <button className={styles.filterStartBtn}>Start</button>
        <button className={styles.filterBuyInBtn}>Buy In</button>
        <button className={styles.filterNameBtn} onClick={orderedList}>
          Name
        </button>
        <button className={styles.filterPrizePoolBtn}>Prize Pool</button>
        <button className={styles.filterMaxReentryBtn}>Max Reentry</button>
        <button className={styles.filterBlindsBtn}>Blinds</button>
        <button className={styles.filterSpeedBtn}>Speed</button>
        <button className={styles.filterFieldBtn}>Field</button>
        <button className={styles.filterEndBtn}>End</button>
        <button className={styles.filterMlrBtn}>Mlr</button>
        <button className={styles.filterTableSizeBtn}>TableSize</button>
        <button className={styles.filterPriorityBtn}>Priority</button>
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
                <FavouriteStar className={styles.favouriteStar}/>
                  <input type="checkbox" className={styles.checkBoxTable} />
                </td>
                <td className={styles.siteTable}>
                  <img src={item.site} alt="svg" />
                </td>
                <td className={styles.startTable}>{item.start}</td>
                <td className={styles.buyInTable}>{item.buyIn}</td>
                <td className={styles.nameTable}>{item.name}</td>
                <td className={styles.prizePoolTable}>{item.prizePool}</td>
                <td className={styles.maxReentryTable}>{item.maxReentry}</td>
                <td className={styles.blindsTable}>{item.blinds}</td>
                <td className={styles.speedTable}>{item.speed}</td>
                <td className={styles.fieldTable}>{item.field}</td>
                <td className={styles.endTable}>{item.end}</td>
                <td className={styles.mlrTable}>{item.mlr}</td>
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
