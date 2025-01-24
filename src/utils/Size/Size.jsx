import styles from "./size.module.css";

// eslint-disable-next-line react/prop-types
const Size = ({ isOpenSize, setSelectedSize, selectedSize }) => {
  if (isOpenSize) {
    const toggleSizeSelection = (size) => {
      setSelectedSize((prev) => {
        // Se o tamanho já está selecionado, removemos, senão adicionamos
        if (prev.includes(size)) {
          return prev.filter((item) => item !== size);
        } else {
          return [...prev, size];
        }
      });
    };

    // Função para verificar se o botão foi selecionado
    const getButtonClass = (size) => {
      return selectedSize.includes(size) ? styles.selectedButton : '';
    };

    return (
      <div className={styles.size}>
        <div>
          <button
            className={`${styles.firstButton} ${getButtonClass(1)}`}
            onClick={() => toggleSizeSelection(1)}
          >
            2
          </button>
          <button
            className={`${styles.secondButton} ${getButtonClass(2)}`}
            onClick={() => toggleSizeSelection(2)}
          >
            3-5
          </button>
          <button
            className={`${styles.thirdButton} ${getButtonClass(3)}`}
            onClick={() => toggleSizeSelection(3)}
          >
            6
          </button>
          <button
            className={`${styles.fourthButton} ${getButtonClass(4)}`}
            onClick={() => toggleSizeSelection(4)}
          >
            7 to 10
          </button>
        </div>
      </div>
    );
  }
};

export default Size;
