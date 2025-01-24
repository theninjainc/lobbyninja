/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./MoreFilter.module.css";
import exit from "../../assets/exit.svg";
import relogio from "../../assets/relogio.svg";
import select from "../../assets/selectSite.svg";
import save from "../../assets/save.svg";
import SaveMoreFilters from "../SaveMoreFilters/SaveMoreFilters";
import poker888 from "../../assets/888poker.svg";
import siteWpn from "../../assets/wpn.svg";
import siteWinamax from "../../assets/siteWinamax.svg";
import sitePokerStars from "../../assets/sitePokerStars.svg";
import sitePartyPoker from "../../assets/sitePartyPoker.svg";
import siteiPoker from "../../assets/siteiPoker.svg";
import siteGGNetwork from "../../assets/siteGGNetwork.svg";
import siteChico from "../../assets/siteChico.svg";
import siteBodog from "../../assets/siteBodog.svg";

const MoreFilters = ({ applyFilters, closeModal, orderList, setOrderList, email }) => {
  const [network, setNetwork] = useState();
  const [buyInMin, setBuyInMin] = useState();
  const [buyInMax, setBuyInMax] = useState();
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [registeringFromTime, setRegisteringFromTime] = useState("");
  const [registeringToTime, setRegisteringToTime] = useState("");
  const [prizePoolMin, setPrizePoolMin] = useState();
  const [prizePoolMax, setPrizePoolMax] = useState();
  const [priorityMin, setPriorityMin] = useState();
  const [priorityMax, setPriorityMax] = useState();
  const [excludeWords, setExcludeWords] = useState("");
  const [participantsMin, setParticipantsMin] = useState();
  const [participantsMax, setParticipantsMax] = useState();
  const [tableSize, setTableSize] = useState();
  const [blindsMin, setBlindsMin] = useState();
  const [blindsMax, setBlindsMax] = useState();
  const [priority, setPriority] = useState();
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("All");
  const [reEntry, setReEntry] = useState("");
  const [speed, setSpeed] = useState(null);
  const [game, setGame] = useState("any");
  const [variant, setVariant] = useState("any");
  const [maxAbility, setMaxAbility] = useState("20");
  const [maxLate, setMaxLate] = useState(false);
  const [includeClosed, setIncludeClosed] = useState(false);
  const [saveFilterIsOpen, setSaveFilterIsOpen] = useState(false);
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

  const toggleOpenSaveFilter = () => {
    setSaveFilterIsOpen((prevState) => !prevState);
  };
  const handleApplyFilters = () => {
    applyFilters({
      network,
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

    let filteredList = orderList;

    //funcionando
    if (network) {
      filteredList = filteredList.filter((item) => item.Site === network);
    }

    //funcionando errado
    if (buyInMin) {
      console.log(filteredList.filter((item) => item.buyIn));
      filteredList = filteredList.filter(
        (item) => Number(item.BuyIn) >= buyInMin
      );
    }
    //não funciona
    if (buyInMax) {
      filteredList = filteredList.filter(
        (item) => Number(item.BuyIn) <= buyInMax
      );
    }
    //Funcionando
    if (prizePoolMin) {
      filteredList = filteredList.filter(
        (item) => Number(item.PrizePool) >= prizePoolMin
      );
    }
    //Funcionando
    if (prizePoolMax) {
      filteredList = filteredList.filter(
        (item) => Number(item.PrizePool) <= prizePoolMax
      );
    }
    //Funcionando
    if (tableSize) {
      switch (tableSize) {
        case 1:
          filteredList = filteredList.filter((item) => item.TableSize === 2);
          break;
        case 2:
          filteredList = filteredList.filter(
            (item) => item.TableSize >= 3 && item.TableSize <= 5
          );
          break;
        case 3:
          filteredList = filteredList.filter((item) => item.TableSize >= 6);
          break;
        case 4:
          filteredList = filteredList.filter(
            (item) => item.TableSize >= 7 && item.TableSize <= 10
          );
          break;
        default:
          filteredList;
      }
    }
    if (blindsMin) {
      filteredList = filteredList.filter((item) => item.Blinds >= blindsMin);
    }
    if (blindsMax) {
      filteredList = filteredList.filter((item) => item.Blinds <= blindsMax);
    }
    if (priority) {
      filteredList = filteredList.filter((item) => item.priority === priority);
    }
    //Funcionando
    if (reEntry === "allowed") {
      filteredList = filteredList.filter((item) => item.MaxReentry === "Yes");
    } else if (reEntry === "notAllowed") {
      filteredList = filteredList.filter((item) => item.MaxReentry === "No");
    }
    if (speed) {
      filteredList = filteredList.filter((item) => item.speed === speed);
    }
    if (excludeWords) {
      filteredList = filteredList.filter(
        (item) => !item.Name.toLowerCase().includes(excludeWords)
      );
    }
    if (endTime) {
      filteredList = filteredList.filter((item) => item.end === endTime);
    }
    setOrderList(filteredList);
    closeModal();
  };

  return (
    <>
      {saveFilterIsOpen && (
        <SaveMoreFilters
          close={() => setSaveFilterIsOpen(false)}
          activeFilters={{
            selectedSite: network,
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
          }}
          email={email}
          origin="MoreFilters"
        />
      )}
      <div
        className={`${styles.moreFilters} ${saveFilterIsOpen === true ? styles.blur : styles.noBlur
          }`}
      >
        <div className={styles.title}>
          <p>Filters</p>{" "}
          <button onClick={closeModal}>
            <img src={exit} alt="Exit" />
          </button>
        </div>

        <div className={styles.network}>
          <label htmlFor="">Network</label>
          <select
            name="Network"
            id=""
            onChange={(e) => {
              setNetwork(e.target.value);
            }}
          >
            <option value="">Network</option>
            {siteData.map((item, index) => (
              <option key={index} value={item.network}>
                {item.network}
              </option>
            ))}
          </select>
          {console.log(network)}
          <img src={select} alt="Select icon" className={styles.selectIcon} />
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
            <button onClick={() => setTableSize()}
              className={tableSize == null ? styles.active : ""}
            >Any</button>
            <button onClick={() => setTableSize(4)}
              className={tableSize === 4 ? styles.active : ""}
            >7to10(Full Ring)</button>
            <button onClick={() => setTableSize(3)}
              className={tableSize === 3 ? styles.active : ""}
            >6-Max</button>
            <button onClick={() => setTableSize(2)}
              className={tableSize === 2 ? styles.active : ""}
            >3-5</button>
            <button onClick={() => setTableSize(1)}
              className={tableSize === 1 ? styles.active : ""}
            >2(HU)</button>
          </div>
        </div>

        <div className={styles.priority}>
          <label>Priority</label>
          <div>
            <input
              type="number"
              value={priorityMin}
              onChange={(e) => setPriorityMin(e.target.value)}
              placeholder="Min"
            />
            <input
              type="number"
              value={priorityMax}
              onChange={(e) => setPriorityMax(e.target.value)}
              placeholder="Max"
            />
          </div>
        </div>
        {console.log(priority)}
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
            <button
              onClick={() => setSpeed(null)}
              className={speed === null ? styles.active : ""}
            >
              Any
            </button>
            <button
              onClick={() => setSpeed(1)}
              className={speed === 1 ? styles.active : ""}
            >
              Slow
            </button>
            <button
              onClick={() => setSpeed(2)}
              className={speed === 2 ? styles.active : ""}
            >
              Regular
            </button>
            <button
              onClick={() => setSpeed(3)}
              className={speed === 3 ? styles.active : ""}
            >
              Turbo
            </button>
            <button
              onClick={() => setSpeed(4)}
              className={speed === 4 ? styles.active : ""}
            >
              Hyper Turbo
            </button>
          </div>
        </div>

        <div className={styles.variant}>
          <label>Variant</label>
          <div>
            <button
              onClick={() => setVariant("regular")}
              className={variant === "regular" ? styles.active : ""}
            >
              Regular
            </button>
            <button
              onClick={() => setVariant("knockout")}
              className={variant === "knockout" ? styles.active : ""}
            >
              Knockout
            </button>
          </div>
        </div>

        <div className={styles.modalActions}>
          <button className={styles.saveBtn} onClick={toggleOpenSaveFilter}>
            <img src={save} alt="SaveIcon" className={styles.saveIcon} />
            Save Filter
          </button>
          <button onClick={handleApplyFilters} className={styles.applyColumns}>
            Apply Columns
          </button>
        </div>
      </div>
    </>
  );
};

export default MoreFilters;
