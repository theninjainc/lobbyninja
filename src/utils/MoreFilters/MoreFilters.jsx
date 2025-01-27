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
  const [network, setNetwork] = useState([]);
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
  const [tableSize, setTableSize] = useState([]);
  const [blindsMin, setBlindsMin] = useState();
  const [blindsMax, setBlindsMax] = useState();
  const [priority, setPriority] = useState();
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("All");
  const [reEntry, setReEntry] = useState("");
  const [speed, setSpeed] = useState([]);
  const [game, setGame] = useState("any");
  const [variant, setVariant] = useState("any");
  const [maxAbility, setMaxAbility] = useState("20");
  const [maxLate, setMaxLate] = useState(false);
  const [includeClosed, setIncludeClosed] = useState(false);
  const [saveFilterIsOpen, setSaveFilterIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


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
    {
      network.length > 0 &&
        (filteredList = filteredList.filter((item) =>
          network.includes(item.Site)
        ))
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
    if (tableSize && tableSize.length > 0) {
      filteredList = filteredList.filter((item) => {
        return tableSize.some((size) => {
          switch (size) {
            case 1:
              return item.TableSize === 2;
            case 2:
              return item.TableSize >= 3 && item.TableSize <= 5;
            case 3:
              return item.TableSize == 6;
            case 4:
              return item.TableSize >= 7 && item.TableSize <= 10;
            default:
              return false;
          }
        });
      });
    }

    if (priority) {
      filteredList = filteredList.filter((item) => item.Priority === priority);
    }
    //Funcionando
    if (reEntry === "allowed") {
      filteredList = filteredList.filter((item) => item.MaxReentry === "Yes");
    } else if (reEntry === "notAllowed") {
      filteredList = filteredList.filter((item) => item.MaxReentry === "No");
    }

    if (speed && speed.length > 0) {
      console.log(speed)
      filteredList = filteredList.filter((item) => speed.includes(item.Speed));
    }

    if (excludeWords) {
      filteredList = filteredList.filter(
        (item) => !item.Name.toLowerCase().includes(excludeWords)
      );
    }

    setOrderList(filteredList);
    closeModal();
  };

  const handleOptionChange = (value) => {
    setNetwork((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) // Remove se já está selecionado
        : [...prev, value] // Adiciona se não está selecionado
    );
  };

  const handleTableSizeSelection = (size) => {
    setTableSize((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size) // Remove se já está selecionado
        : [...prev, size] // Adiciona se não está selecionado
    );
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
          <div
            className={styles.selectContainer}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles.select}>
              {network.length > 0 ? `${network.length} sites selected` : "Select networks"}
              <img src={select} alt="Select icon" />
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                {siteData.map((item, index) => (
                  <label key={index} className={styles.option} onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      value={item.network}
                      checked={network.includes(item.network)}
                      onChange={() => handleOptionChange(item.network)}
                    />
                    {item.network}
                  </label>
                ))}
              </div>
            )}
          </div>
          {console.log(network)}
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
            <button
              onClick={() => setTableSize([])} // Limpa todas as seleções
              className={tableSize.length === 0 ? styles.active : ""}
            >
              Any
            </button>
            <button
              onClick={() => handleTableSizeSelection(4)}
              className={tableSize.includes(4) ? styles.active : ""}
            >
              7to10(Full Ring)
            </button>
            <button
              onClick={() => handleTableSizeSelection(3)}
              className={tableSize.includes(3) ? styles.active : ""}
            >
              6-Max
            </button>
            <button
              onClick={() => handleTableSizeSelection(2)}
              className={tableSize.includes(2) ? styles.active : ""}
            >
              3-5
            </button>
            <button
              onClick={() => handleTableSizeSelection(1)}
              className={tableSize.includes(1) ? styles.active : ""}
            >
              2(HU)
            </button>
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
              onClick={() => setSpeed([])} // Limpa a seleção
              className={speed.length === 0 ? styles.active : ""}
            >
              Any
            </button>
            <button
              onClick={() =>
                setSpeed((prev) =>
                  prev.includes(1) ? prev.filter((s) => s !== 1) : [...prev, 1]
                )
              }
              className={speed.includes(1) ? styles.active : ""}
            >
              Slow
            </button>
            <button
              onClick={() =>
                setSpeed((prev) =>
                  prev.includes(2) ? prev.filter((s) => s !== 2) : [...prev, 2]
                )
              }
              className={speed.includes(2) ? styles.active : ""}
            >
              Regular
            </button>
            <button
              onClick={() =>
                setSpeed((prev) =>
                  prev.includes(3) ? prev.filter((s) => s !== 3) : [...prev, 3]
                )
              }
              className={speed.includes(3) ? styles.active : ""}
            >
              Turbo
            </button>
            <button
              onClick={() =>
                setSpeed((prev) =>
                  prev.includes(4) ? prev.filter((s) => s !== 4) : [...prev, 4]
                )
              }
              className={speed.includes(4) ? styles.active : ""}
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
