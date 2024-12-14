import styles from "./main.module.css";
import lupa from "../../assets/Lupa.svg";
import save from "../../assets/save.svg";
import manageColumns from "../../assets/manageColumns.svg";
import moreFilters from "../../assets/moreFilters.svg";
import searchTournaments from "../../assets/searchTournaments.svg";

const Main = () => {
  const data = [
    { site: "Site 1", start: "12:30", buyIn: "$100", name: "Tournament A", prizePool: "$1000", maxReentry: "2", blinds: "5/10", speed: "1", field: "100", end: "2024-01-02", mlr: "Yes", tableSize: "10", priority: "High" },
    { site: "Site 2", start: "12:30", buyIn: "$200", name: "Tournament B", prizePool: "$2000", maxReentry: "3", blinds: "10/20", speed: "2", field: "200", end: "2024-02-02", mlr: "No", tableSize: "9", priority: "Medium" },
  ]

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <h1 className={styles.title}>Tournament List</h1>
        <div className={styles.btns}>
          <ul>
            <li>
              <button>Button1</button>
            </li>
            <li>
              <button>Button2</button>
            </li>
            <li>
              <button>Button3</button>
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
            <select name="site" id="site" className={styles.selectSite}>
              <option value="">Select site</option>
              <option value="site 1">Site 1</option>
              <option value="site 2">Site 2</option>
            </select>
          </label>
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
            <select name="speed" id="speed" className={styles.selectSpeed}>
              <option value="">Speed</option>
              <option value="site 1">1</option>
              <option value="site 2">2</option>
            </select>
          </label>
          <label htmlFor="size" className={styles.labelSelectSize}>
            <select name="size" id="size" className={styles.selectSize}>
              <option value="">Size</option>
              <option value="size 1">Size 1</option>
              <option value="size 2">Size 2</option>
            </select>
          </label>
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
        <button className={styles.filterNameBtn}>Name</button>
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
            {data.map((item, index) => (
              <div
                key={item.id}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "transparent"
                      : "rgba(255, 255, 255, 0.05)",
                }}
              >
                <td>
                  
                  <input type="checkbox"  className={styles.checkBoxTable}/>
                  <input type="checkbox"  className={styles.checkBoxTable}/>
                </td>
                <td className={styles.siteTable}>{item.site}</td>
                <td className={styles.startTable}>{item.start}</td>
                <td className={styles.buyTable}>{item.buyIn}</td>
                <td className={styles.nameTable}>{item.name}</td>
                <td>{item.prizePool}</td>
                <td>{item.maxReentry}</td>
                <td>{item.blinds}</td>
                <td>{item.speed}</td>
                <td>{item.field}</td>
                <td>{item.end}</td>
                <td>{item.mlr}</td>
                <td>{item.tableSize}</td>
                <td>{item.priority}</td>
              </div>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Main;
