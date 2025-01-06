import { useEffect, useState } from "react";
import styles from "./CostumizeColumns.module.css";
import exit from "../../assets/exit.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CostumizeColumns = ({ isOpen, closeModal, onColumnsChange }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  const initialColumns = [
    "Site",
    "Start",
    "Name",
    "Speed",
    "Buy In",
    "Prize Pool",
    "Max Reentry",
    "Blinds",
    "Field",
    "End",
    "Mlr",
    "TableSize",
    "Priority",
  ];

  const [localColumns, setLocalColumns] = useState(initialColumns);
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const newSelectedColumns = Array.from(selectedColumns);
    const [movedItem] = newSelectedColumns.splice(source.index, 1);
    newSelectedColumns.splice(destination.index, 0, movedItem);

    setSelectedColumns(newSelectedColumns);
  };

  const handleCheckboxChange = (column) => {
    if (selectedColumns.includes(column)) {
      // Se já está selecionado, remover do `selectedColumns` e adicionar em `unselectedColumns`
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      // Adicionar ao selecionado e remover do não-selecionado
      setSelectedColumns([...selectedColumns, column]);
    }
  };


  // Aplicar as mudanças ao estado principal
  const handleApplyColumns = () => {
    onColumnsChange(selectedColumns);

    console.log(selectedColumns)
    closeModal();
  };

  // Filtrar colunas não selecionadas para o lado esquerdo
  const unselectedColumns = localColumns.filter(
    (column) => !selectedColumns.includes(column)
  );

  if (modalIsOpen) {
    return (
      <div className={styles.costumizeColumns}>
        <div className={styles.costumizeTitle}>
          <span>Customize Columns</span>
          <button className={styles.exitBtn} onClick={closeModal}>
            <img src={exit} alt="Exit" width="13" />
          </button>
        </div>
        <div className={styles.orderColumns}>
          <div className={styles.columnOptions}>
            <span>Column Options</span>
            <p>Default</p>
            <div className={styles.defaultCheckbox}>
              {unselectedColumns.map((column) => (
                <div key={column} className={styles.checkboxColumns}>
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(column)}
                    onChange={() => handleCheckboxChange(column)}
                  />
                  {column}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.selectedColumns}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="columns">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.defaultCheckbox}
                  >
                    {selectedColumns.map((column, index) => (
                      <Draggable key={column} draggableId={column} index={index}>
                        {(provided) => (
                          <div
                            className={styles.checkboxColumns}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <input type="checkbox" checked={true} disabled />
                            {column}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <div className={styles.costumizeColumnsFooter}>
          <button className={styles.footerCancelBtn} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles.footerApplyColumnsBtn}
            onClick={handleApplyColumns}
          >
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
