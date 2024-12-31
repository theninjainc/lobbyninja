import styles from "./speed.module.css";
import slow from "../../assets/Slow.svg";
import regular from "../../assets/regular.svg";
import hyper from "../../assets/hyper.svg";
import turbo from "../../assets/turbo.svg";

// eslint-disable-next-line react/prop-types
const Speed = ({ isOpenSpeed, setSelectedSpeed }) => {
  if (isOpenSpeed) {
    const data = [
      {
        speed: 1,
      },
      {
        speed: 2,
      },
      {
        speed: 3,
      },
      {
        speed: 4,
      },
    ];

    return (
      <div className={styles.speed}>
        {data.map((item, index) => (
          <div
            key={index}
            className={styles.cardSpeed}
            onClick={() => setSelectedSpeed(item.speed)}
          >
            <img
              src={
                item.speed === 1
                  ? slow
                  : item.speed === 2
                  ? regular
                  : item.speed === 3
                  ? turbo
                  : item.speed === 4
                  ? hyper
                  : null
              }
            />
            <p>
              {item.speed === 1
                ? "Slow"
                : item.speed === 2
                ? "Regular"
                : item.speed === 3
                ? "Turbo"
                : item.speed === 4
                ? "Hyper"
                : null}
            </p>
          </div>
        ))}
      </div>
    );
  }
};

export default Speed;
