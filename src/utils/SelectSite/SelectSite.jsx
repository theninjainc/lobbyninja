import styles from "./selectSite.module.css";
import teste from "../../assets/siteRed.svg";
import teste2 from "../../assets/image 1.svg";
import teste3 from "../../assets/image 2.svg";
import teste4 from "../../assets/image 3.svg";
import teste6 from "../../assets/image 5.svg";
import teste7 from "../../assets/image 6.svg";
import teste8 from "../../assets/image 7.svg";
import teste9 from "../../assets/image 8.svg";
import teste10 from "../../assets/image 9.svg";

// eslint-disable-next-line react/prop-types
const SelectSite = ({ isOpen }) => {
  if (isOpen) {
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

    return (
      <div className={styles.selectSiteModal}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.site} alt={`Site ${item.name}`} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default SelectSite;
