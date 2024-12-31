import { useEffect, useState } from "react";
import styles from "./CostumizeColumns.module.css";
import exit from "../../assets/exit.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// eslint-disable-next-line react/prop-types
const CostumizeColumns = ({ isOpen, closeModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
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

  // Estado para controlar os checkboxes
  const [selectedColumns, setSelectedColumns] = useState({
    Site: false,
    Start: false,
    Name: false,
    Speed: false,
    "Buy In": false,
    "Prize Pool": false,
    "Max Reentry": false,
    Blinds: false,
    Field: false,
    End: false,
    MLR: false,
    "Table Size": false,
    Priority: false,
  });

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  // Função para lidar com o estado do checkbox
  const handleCheckboxChange = (column) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleDragEnd = (result) => {
    const { destination } = result;
    if (!destination) return;

    const items = reorder(
      columns,
      result.source.index,
      result.destination.index
    );

    setColumns(items);
  };

  function reorder(column, startIndex, endIndex) {
    const result = Array.from(column);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  // Filtrando as colunas selecionadas
  const filteredColumns = columns.filter((column) => selectedColumns[column]);

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
              {columns.map((column) => (
                <div key={column} className={styles.checkboxColumns}>
                  <input
                    type="checkbox"
                    checked={selectedColumns[column]}
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
