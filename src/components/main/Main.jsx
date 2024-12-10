import styles from "./main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <div className={styles.title}>Tournament List</div>
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
            <label htmlFor="min-value" className={styles.labelMaxMinValue}>
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
        <div className={styles.searchright}></div>
      </div>
    </div>
  );
};

export default Main;
