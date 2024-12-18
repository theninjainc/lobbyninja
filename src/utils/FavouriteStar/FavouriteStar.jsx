import styles from "../../components/main/main.module.css"
import { useState } from "react";

const FavouriteStar = () => {
  const [isClicked, setIsClicked] = useState(false);


  const toggleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1_526" fill="white">
        <path d="M8.56 0.155365L6.21 5.91537L0 6.37537L4.76 10.3954L3.27 16.4354L8.56 13.1554M8.56 0.155365L10.91 5.91537L17.12 6.37537L12.36 10.3954L13.85 16.4354L8.56 13.1554" />
      </mask>
      <path
        className={`${styles.favouriteStar} ${isClicked ? styles.checked : ""}`}
        onClick={toggleClick} // Alterna o estado ao clicar
        d="M8.56 0.155365L6.21 5.91537L0 6.37537L4.76 10.3954L3.27 16.4354L8.56 13.1554M8.56 0.155365L10.91 5.91537L17.12 6.37537L12.36 10.3954L13.85 16.4354L8.56 13.1554"
        fill="#070B2B"
      />
      <path
        d="M8.56 0.155365L9.4859 -0.222391L8.56 -2.49184L7.63409 -0.222391L8.56 0.155365ZM6.21 5.91537L6.28387 6.91263L6.90183 6.86686L7.1359 6.29312L6.21 5.91537ZM0 6.37537L-0.0738717 5.3781L-2.51646 5.55903L-0.645222 7.13936L0 6.37537ZM4.76 10.3954L5.73089 10.6349L5.87961 10.032L5.40522 9.63137L4.76 10.3954ZM3.27 16.4354L2.29911 16.1959L1.71136 18.5784L3.79696 17.2853L3.27 16.4354ZM8.56 13.1554L9.08696 12.3055L8.56 11.9787L8.03304 12.3055L8.56 13.1554ZM10.91 5.91537L9.98409 6.29312L10.2182 6.86686L10.8361 6.91263L10.91 5.91537ZM17.12 6.37537L17.7652 7.13936L19.6365 5.55903L17.1939 5.3781L17.12 6.37537ZM12.36 10.3954L11.7148 9.63137L11.2404 10.032L11.3891 10.6349L12.36 10.3954ZM13.85 16.4354L13.323 17.2853L15.4086 18.5784L14.8209 16.1959L13.85 16.4354ZM7.63409 -0.222391L5.28409 5.53761L7.1359 6.29312L9.4859 0.533121L7.63409 -0.222391ZM6.13613 4.9181L-0.0738717 5.3781L0.0738717 7.37263L6.28387 6.91263L6.13613 4.9181ZM-0.645222 7.13936L4.11478 11.1594L5.40522 9.63137L0.645222 5.61137L-0.645222 7.13936ZM3.78911 10.1559L2.29911 16.1959L4.24089 16.6749L5.73089 10.6349L3.78911 10.1559ZM3.79696 17.2853L9.08696 14.0053L8.03304 12.3055L2.74304 15.5855L3.79696 17.2853ZM7.63409 0.533121L9.98409 6.29312L11.8359 5.53761L9.4859 -0.222391L7.63409 0.533121ZM10.8361 6.91263L17.0461 7.37263L17.1939 5.3781L10.9839 4.9181L10.8361 6.91263ZM16.4748 5.61137L11.7148 9.63137L13.0052 11.1594L17.7652 7.13936L16.4748 5.61137ZM11.3891 10.6349L12.8791 16.6749L14.8209 16.1959L13.3309 10.1559L11.3891 10.6349ZM14.377 15.5855L9.08696 12.3055L8.03304 14.0053L13.323 17.2853L14.377 15.5855Z"
        fill="white"
        fillOpacity="0.12"
        mask="url(#path-1-inside-1_1_526)"
      />
    </svg>
  );
};

export default FavouriteStar;
