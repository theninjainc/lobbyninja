import styles from "./main.module.css";


const Main = () => {
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
            <i className="fas fa-search"></i>
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
          <button className={styles.searchBtn}></button>
          <button className={styles.saveBtn}></button>
        </div>
        <div className={styles.searchRight}>
          <button className={styles.manageColumnsBtn}>
            <div>
              <i className="fas fa-search"></i>
            </div>
            Manage Columns
          </button>
          <button className={styles.moreFiltersBtn}>
            <div>
              <i className="fas fa-search"></i>
            </div>
            More Filters
          </button>
        </div>
      </div>
      <div className={styles.filterbar}>
        <input type="checkbox" className={styles.filterCheckbox}/>
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
    </div>
  );
};

export default Main;
