import { useState } from "react";
import styles from "./MoreFilter.module.css";
import exit from "../../assets/exit.svg";
import relogio from "../../assets/relogio.svg";
import select from "../../assets/selectSite.svg";
import save from "../../assets/save.svg";
// eslint-disable-next-line react/prop-types
const MoreFilters = ({ applyFilters, closeModal }) => {
  // Estados para todos os filtros
  const [buyInMin, setBuyInMin] = useState("");
  const [buyInMax, setBuyInMax] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [registeringFromTime, setRegisteringFromTime] = useState("");
  const [registeringToTime, setRegisteringToTime] = useState("");
  const [prizePoolMin, setPrizePoolMin] = useState("");
  const [prizePoolMax, setPrizePoolMax] = useState("");
  const [excludeWords, setExcludeWords] = useState("");
  const [participantsMin, setParticipantsMin] = useState("");
  const [participantsMax, setParticipantsMax] = useState("");
  const [tableSize, setTableSize] = useState("Any");
  const [blindsMin, setBlindsMin] = useState("");
  const [blindsMax, setBlindsMax] = useState("");
  const [priority, setPriority] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("All");
  const [reEntry, setReEntry] = useState("allowed");
  const [speed, setSpeed] = useState("any");
  const [game, setGame] = useState("any");
  const [variant, setVariant] = useState("any");
  const [maxAbility, setMaxAbility] = useState("20");
  const [maxLate, setMaxLate] = useState(false);
  const [includeClosed, setIncludeClosed] = useState(false);

  const handleApplyFilters = () => {
    applyFilters({
      buyInMin,
      buyInMax,
      fromTime,
      toTime,
      registeringFromTime,
      registeringToTime,
      prizePoolMin,
      prizePoolMax,
      excludeWords,
      participantsMin,
      participantsMax,
      tableSize,
      blindsMin,
      blindsMax,
      priority,
      endTime,
      dayOfWeek,
      reEntry,
      speed,
      game,
      variant,
      maxAbility,
      maxLate,
      includeClosed,
    });
  };

  return (
    <div className={styles.moreFilters}>
      <div className={styles.title}>
        <p>Filters</p>{" "}
        <button onClick={closeModal}>
          <img src={exit} alt="Exit" />
        </button>
      </div>

      <div className={styles.network}>
        <label htmlFor="">Network</label>
        <input type="text" placeholder="Network" />
      </div>

      <div className={styles.buyIn}>
        <label>Buy In</label>
        <div>
          <input
            type="number"
            value={buyInMin}
            onChange={(e) => setBuyInMin(e.target.value)}
            placeholder="Min"
          />
          <input
            type="number"
            value={buyInMax}
            onChange={(e) => setBuyInMax(e.target.value)}
            placeholder="Max"
          />
        </div>
      </div>

      <div className={styles.fromToTime}>
        <div className={styles.fromTime}>
          <label>From Time</label>
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
          <img src={relogio} alt="Clock icon" className={styles.relogio} />
        </div>
        <div className={styles.toTime}>
          <label>To Time</label>
          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
          <img src={relogio} alt="Clock icon" className={styles.relogio} />
        </div>
      </div>

      <div className={styles.registering}>
        <label>Registering</label>
        <div className={styles.orderInputs}>
          <div className={styles.registeringFromTime}>
            <span>From</span>
            <input
              type="time"
              value={registeringFromTime}
              onChange={(e) => setRegisteringFromTime(e.target.value)}
            />
            <img src={relogio} alt="Clock icon" className={styles.relogio} />
          </div>
          <div className={styles.registeringToTime}>
            <span>To</span>
            <input
              type="time"
              value={registeringToTime}
              onChange={(e) => setRegisteringToTime(e.target.value)}
            />
            <img src={relogio} alt="Clock icon" className={styles.relogio} />
          </div>
        </div>
      </div>

      <div className={styles.prizePool}>
        <label>Prize Pool</label>
        <div>
          <input
            type="number"
            value={prizePoolMin}
            onChange={(e) => setPrizePoolMin(e.target.value)}
            placeholder="Min"
          />
          <span className={styles.$}>$</span>
          <input
            type="number"
            value={prizePoolMax}
            onChange={(e) => setPrizePoolMax(e.target.value)}
            placeholder="Max"
          />
          <span className={styles.$}>$</span>
        </div>
      </div>

      <div className={styles.excludeWords}>
        <label>Exclude Words</label>
        <input
          type="text"
          value={excludeWords}
          onChange={(e) => setExcludeWords(e.target.value)}
          placeholder="Type here..."
        />
      </div>

      <div className={styles.participants}>
        <label>Participants</label>
        <div>
          <input
            type="number"
            value={participantsMin}
            onChange={(e) => setParticipantsMin(e.target.value)}
            placeholder="Min"
          />
          <input
            type="number"
            value={participantsMax}
            onChange={(e) => setParticipantsMax(e.target.value)}
            placeholder="Max"
          />
        </div>
      </div>

      <div className={styles.tableSize}>
        <label>Table Size</label>
        <div>
          <button onClick={() => setTableSize("any")}>Any</button>
          <button onClick={() => setTableSize("7to10")}>
            7to10(Full Ring)
          </button>
          <button onClick={() => setTableSize("6-Max")}>6-Max</button>
          <button onClick={() => setTableSize("3-5")}>3-5</button>
          <button onClick={() => setTableSize("2")}>2(HU)</button>
        </div>
      </div>

      <div className={styles.blinds}>
        <label>Blinds</label>
        <div>
          <input
            type="number"
            value={blindsMin}
            onChange={(e) => setBlindsMin(e.target.value)}
            placeholder="Min"
          />
          <input
            type="number"
            value={blindsMax}
            onChange={(e) => setBlindsMax(e.target.value)}
            placeholder="Max"
          />
        </div>
      </div>

      <div className={styles.priority}>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Choose Priority</option>{" "}
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <img src={select} alt="Select icon" className={styles.selectIcon} />
      </div>

      <div className={styles.endTime}>
        <label>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <img src={relogio} alt="ClockIcon" className={styles.relogio} />
      </div>

      <div className={styles.dayOfWeek}>
        <label>Day of the Week</label>
        <div>
          <button value={"All"} onClick={(e) => setDayOfWeek(e.target.value)}>
            All
          </button>
          <button value={"Mon"} onClick={(e) => setDayOfWeek(e.target.value)}>
            Mon
          </button>
          <button value={"Tue"} onClick={(e) => setDayOfWeek(e.target.value)}>
            Tue
          </button>
          <button value={"Wed"} onClick={(e) => setDayOfWeek(e.target.value)}>
            Wed
          </button>
          <button value={"Thu"} onClick={(e) => setDayOfWeek(e.target.value)}>
            Thu
          </button>
          <button value={"Fri"} onClick={(e) => setDayOfWeek(e.target.value)}>
            Fri
          </button>
          <button value={"Sat"} onClick={(e) => setDayOfWeek(e.target.value)}>
            Sat
          </button>
          <button value={"Sun"} onClick={(e) => setDayOfWeek(e.target.value)}>
            Sun
          </button>
        </div>
      </div>

      <div className={styles.reEntry}>
        <label>Re-entry</label>
        <div>
          <input
            type="radio"
            name="reEntry"
            value="allowed"
            checked={reEntry === "allowed"}
            onChange={() => setReEntry("allowed")}
          />
          Allowed
        </div>
        <div>
          <input
            type="radio"
            name="reEntry"
            value="notAllowed"
            checked={reEntry === "notAllowed"}
            onChange={() => setReEntry("notAllowed")}
          />
          Not Allowed
        </div>
      </div>

      <div className={styles.speed}>
        <label>Speed</label>
        <div>
          <button onClick={() => setSpeed("any")}>Any</button>
          <button onClick={() => setSpeed("slow")}>Slow</button>
          <button onClick={() => setSpeed("regular")}>Regular</button>
          <button onClick={() => setSpeed("turbo")}>Turbo</button>
          <button onClick={() => setSpeed("hyper turbo")}>Hyper Turbo</button>
        </div>
      </div>

      <div className={styles.game}>
        <label>Game</label>
        <div>
          <button onClick={() => setGame("any")}>Any</button>
          <button onClick={() => setGame("nlh")}>NLH</button>
          <button onClick={() => setGame("plo4")}>PLO4</button>
          <button onClick={() => setGame("plo5")}>PLO5</button>
          <button onClick={() => setGame("plo6")}>PLO6</button>
        </div>
      </div>

      <div className={styles.variant}>
        <label>Variant</label>
        <div>
          <button onClick={() => setVariant("any")}>Any</button>
          <button onClick={() => setVariant("regular")}>Regular</button>
          <button onClick={() => setVariant("knockout")}>Knockout</button>
        </div>
      </div>

      <div className={styles.maxAbility}>
        <label>Max Ability</label>
        <div>
          <input
            type="number"
            value={maxAbility}
            onChange={(e) => setMaxAbility(e.target.value)}
          />
          <div className={styles.maxAbilityRange}>
            <span>0</span>
            <input
              type="range"
              min="0"
              max="100"
              value={maxAbility}
              onChange={(e) => setMaxAbility(e.target.value)}
              style={{
                "--value": `${maxAbility}%`,
              }}
            />
            <span>100</span>
          </div>
        </div>
      </div>

      <div className={styles.maxLate}>
        <label>Max Late</label>
        <div>
          <input
            type="checkbox"
            checked={maxLate}
            onChange={() => setMaxLate(!maxLate)}
          />
          <span>Only max late tournaments</span>
        </div>
      </div>

      <div className={styles.includeClosed}>
        <label>Include Closed</label>
        <div>
          <input
            type="checkbox"
            checked={includeClosed}
            onChange={() => setIncludeClosed(!includeClosed)}
          />
          <span>Include closed tournaments</span>
        </div>
      </div>

      <div className={styles.modalActions}>
        <button onClick={handleApplyFilters} className={styles.saveBtn}><img src={save} alt="SaveIcon" className={styles.saveIcon} />Save Filter</button>
        <button onClick={handleApplyFilters} className={styles.applyColumns}>Apply Columns</button>
      </div>
    </div>
  );
};

export default MoreFilters;
