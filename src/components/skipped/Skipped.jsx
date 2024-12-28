import React, { useEffect, useState } from 'react';
import AudioAlarm from "../../assets/alarm.mp3";
import iconAlarm from "../../assets/alarm.svg";
import styles from "../main/main.module.css"
import teste10 from "../../assets/image 9.svg"
import teste2 from "../../assets/image 1.svg";
import FavouriteStar from "../../utils/FavouriteStar/FavouriteStar";

const Skipped = () => {
    const [orderNameFilter, setOrderNameFilter] = useState("asc");
    const [orderList, setOrderList] = useState([
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
    ]);

    const removeAlarm = (index) => {
        const updatedAlarms = orderList.filter((_, i) => i !== index);
        setOrderList(updatedAlarms);
    };

    const orderedList = (key) => {
        const newList = [...orderList];
        newList.sort((a, b) =>
            orderNameFilter === "asc"
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key])
        );
        setOrderList(newList);
        setOrderNameFilter(orderNameFilter === "asc" ? "desc" : "asc");
    };

    return (
        <div className={styles.main}>
            <div className={styles.navbar}>
                <p className={styles.title}>Tournament skipped</p>
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
                                    <FavouriteStar className={styles.favouriteStar} />
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
                                <td className={styles.tableSizeTableRegistered}>{item.tableSize}</td>
                                <td className={styles.priorityTableRegistered}>{item.priority}</td>
                                <td className={styles.deleteLinha}>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => removeAlarm(index)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </div>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Skipped;

