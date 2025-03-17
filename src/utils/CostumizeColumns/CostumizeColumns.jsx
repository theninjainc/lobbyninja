import { useEffect, useState } from "react";
import { Account, Client } from "appwrite"; // Importando o Appwrite
import styles from "./CostumizeColumns.module.css";
import exit from "../../assets/exit.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import draggable from "../../assets/draggable.svg";
import closeDraggable from "../../assets/closeDraggable.svg";

// URL da API
const API_URL = "https://ninja.lobby.ninja/api/api/costumizecolumns";

const CostumizeColumns = ({ isOpen, closeModal, onColumnsChange }) => {
  const initialColumns = [
    "Site",
    "Start",
    "Name",
    "Speed",
    "Buy In",
    "Prize Pool",
    "Max Reentry",
    "Field",
    "Mlr",
    "TableSize",
    "Priority",
  ];

  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [localColumns, setLocalColumns] = useState(initialColumns);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [userEmail, setUserEmail] = useState(null); // Estado para armazenar o userEmail

  useEffect(() => {
    setModalIsOpen(isOpen);
    if (isOpen) {
      fetchuserEmail(); // Chama a função para buscar o userEmail
    }
  }, [isOpen]);

  // Função para buscar o userEmail via Appwrite
  const fetchuserEmail = async () => {
    try {
      const client = new Client();
      client.setProject("lobbyninja");
      const account = new Account(client);
      const user = await account.get();
      setUserEmail(user.email); // Armazena o userEmail
      fetchColumns(user.email); // Passa o userEmail para buscar as colunas
    } catch (error) {
      console.error("Erro ao obter userEmail:", error);
    }
  };

  // Função para buscar as colunas
  const fetchColumns = async (userEmail) => {
    try {
      const response = await fetch(`${API_URL}?userEmail=${userEmail}`);
      const data = await response.json();
      if (data && Array.isArray(data.columns)) {
        setSelectedColumns(data.columns);
      } else {
        setSelectedColumns(initialColumns);
      }
    } catch (error) {
      console.error("Erro ao buscar colunas:", error);
      setSelectedColumns(initialColumns);
    }
  };

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
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleRemoveColumn = (column) => {
    setSelectedColumns(selectedColumns.filter((col) => col !== column));
  };

  const handleApplyColumns = async () => {
    if (!userEmail) return;

    const columnsToApply = selectedColumns.length > 0 ? selectedColumns : initialColumns;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, columns: columnsToApply }), // Envia o userEmail junto com as colunas
      });

      onColumnsChange(columnsToApply);
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar colunas:", error);
    }
  };

  const unselectedColumns = localColumns.filter((column) => !selectedColumns.includes(column));

  if (!modalIsOpen) return null;

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
          <span>Selected Columns</span>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.defaultCheckbox}>
                  {selectedColumns.map((column, index) => (
                    <Draggable key={column} draggableId={column} index={index}>
                      {(provided) => (
                        <div
                          className={styles.checkboxColumnsSelected}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div>
                            <img src={draggable} alt="Drag" />
                            {column}
                          </div>
                          <img src={closeDraggable} alt="Remove" onClick={() => handleRemoveColumn(column)} />
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
        <button className={styles.footerApplyColumnsBtn} onClick={handleApplyColumns}>
          Apply Columns
        </button>
      </div>
    </div>
  );
};

export default CostumizeColumns;
