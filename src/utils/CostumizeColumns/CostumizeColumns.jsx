import { useEffect, useState } from "react";
import styles from "./CostumizeColumns.module.css";
import exit from "../../assets/exit.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CostumizeColumns = ({ isOpen, closeModal, onColumnsChange }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  // Estado original no componente pai
  const [columns, setColumns] = useState([
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
    "MLR",
    "Table Size",
    "Priority",
  ]);

  const [selectedColumns, setSelectedColumns] = useState(
    columns.reduce((acc, column) => {
      acc[column] = false;
      return acc;
    }, {})
  );

  // Estados temporários
  const [localColumns, setLocalColumns] = useState(columns);
  const [localSelectedColumns, setLocalSelectedColumns] = useState(selectedColumns);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const selectedColumnNames = localColumns.filter(
      (column) => localSelectedColumns[column]
    );
    const reordered = reorder(selectedColumnNames, source.index, destination.index);

    const newColumns = [...localColumns];
    reordered.forEach((column, i) => {
      const originalIndex = localColumns.indexOf(column);
      newColumns.splice(originalIndex, 1);
      newColumns.splice(source.index + i, 0, column);
    });

    setLocalColumns(newColumns);
  };

  const handleCheckboxChange = (column) => {
    setLocalSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleApplyColumns = () => {
    // Atualiza o estado no componente pai
    setColumns(localColumns);
    setSelectedColumns(localSelectedColumns);
    onColumnsChange(localColumns.filter((col) => localSelectedColumns[col]));

    console.log(localColumns)
    closeModal();
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const filteredColumns = localColumns.filter((column) => localSelectedColumns[column]);

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
              {localColumns.map((column) => (
                <div key={column} className={styles.checkboxColumns}>
                  <input
                    type="checkbox"
                    checked={localSelectedColumns[column]}
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
                    {filteredColumns.map((column, index) => (
                      <Draggable
                        key={column}
                        draggableId={column}
                        index={index}
                      >
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
