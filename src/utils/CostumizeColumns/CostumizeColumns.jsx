import { useEffect, useState } from "react";
import styles from "./CostumizeColumns.module.css";
import exit from "../../assets/exit.svg";

// eslint-disable-next-line react/prop-types
const CostumizeColumns = ({ isOpen, closeModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  // Usando useEffect para sincronizar o estado local com o prop isOpen
  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  // Se o modal estiver aberto, renderiza o conteúdo
  if (modalIsOpen) {
    return (
      <div className={styles.costumizeColumns}>
        <div className={styles.costumizeTitle}>
          <span>Customize Columns</span>
          <button className={styles.exitBtn} onClick={closeModal}>
            <img src={exit} alt="Exit" />
          </button>
        </div>
        <div className={styles.orderColumns}>
          <div className={styles.columnOptions}>
            <span>Column Options</span>
            <p>Default</p>
            <div className={styles.defaultCheckbox}>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Site
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Start
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Name
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Speed
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Buy In
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Prize Pool
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Max Reentry
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Blinds
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Field
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> End
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> MLR
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Table Size
              </div>
              <div className={styles.checkboxColumns}>
                <input type="checkbox" /> Priority
              </div>
            </div>
          </div>
          <div className={styles.selectedColumns}>
            <span>AQUI SERÁ O LUGAR DO DRAG AND DROP</span>
          </div>
        </div>
        <div className={styles.costumizeColumnsFooter}>
          <button className={styles.footerCancelBtn}>Cancel</button>
          <button className={styles.footerApplyColumnsBtn}>
            Apply Columns
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CostumizeColumns;
