import styles from "../../components/main/main.module.css";
import slow from "../../assets/Slow.svg";
import regular from "../../assets/regular.svg";
import hyper from "../../assets/hyper.svg";
import turbo from "../../assets/turbo.svg";
// eslint-disable-next-line react/prop-types
function SpeedMap({ speed }) {
  switch (speed) {
    case 1:
      return (
        <>
          <img src={slow} alt="slow" className={styles.speedTableImgSlow} />{" "}
          <span className={styles.slow}> Slow</span>
        </>
      );
    case 2:
      return (
        <>
          <img src={regular} alt="regular" className={styles.speedTableImgRegular} />
          <span className={styles.regular}>Regular</span>
        </>
      );
    case 3:
      return (
        <>
          <img src={turbo} alt="turbo" className={styles.speedTableImgTurbo} />
          <span className={styles.turbo}>Turbo</span>
        </>
      );
    case 4:
      return (
        <>
          <img src={hyper} alt="hyper" className={styles.speedTableImgHyper} />
          <span className={styles.hyper}>Hyper</span>
        </>
      );
  }
}

export default SpeedMap;
