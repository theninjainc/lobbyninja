import styles from "./speed.module.css";
import slow from "../../assets/Slow.svg";
import regular from "../../assets/regular.svg";
import hyper from "../../assets/hyper.svg";
import turbo from "../../assets/turbo.svg";

// eslint-disable-next-line react/prop-types
const Speed = ({ isOpenSpeed }) => {

    if(isOpenSpeed){const data = [
        {
          start: "16:30",
          buyIn: "$35",
          name: "I Tournament",
          prizePool: "$17k",
          maxReentry: "$125",
          blinds: "70",
          speed: "slow",
          field: "105",
          end: "18:30",
          mlr: "03:20",
          tableSize: "5",
          priority: "9",
        },
        {
          start: "12:30",
          buyIn: "$32",
          name: "B Tournament",
          prizePool: "$15k",
          maxReentry: "-",
          blinds: "50",
          speed: "regular",
          field: "100",
          end: "14:00",
          mlr: "02:59",
          tableSize: "9",
          priority: "3",
        },
        {
          start: "16:00",
          buyIn: "$45",
          name: "H Tournament",
          prizePool: "$18k",
          maxReentry: "$150",
          blinds: "60",
          speed: "turbo",
          field: "110",
          end: "18:00",
          mlr: "03:45",
          tableSize: "6",
          priority: "8",
        },
        {
          start: "16:00",
          buyIn: "$45",
          name: "H Tournament",
          prizePool: "$18k",
          maxReentry: "$150",
          blinds: "60",
          speed: "hyper",
          field: "110",
          end: "18:00",
          mlr: "03:45",
          tableSize: "6",
          priority: "8",
        },
      ];
    
      return (
        <div className={styles.speed}>
          {data.map((item, index) => (
            <div key={index} className={styles.cardSpeed}>
              <img
                src={
                  item.speed === "slow"
                    ? slow
                    : item.speed === "regular"
                    ? regular
                    : item.speed === "hyper"
                    ? hyper
                    : item.speed === "turbo"
                    ? turbo
                    : null
                }
                alt={`Site ${item.name}`}
              />
              <p>{item.speed}</p>
            </div>
          ))}
        </div>
      );}

  
};

export default Speed;
