import { useContext } from "react";
import BoardsContext from "../context/BoardsContext";

const useBoards = () => {
  const { setData } = useContext(BoardsContext);

  interface Interpretation {
    column: string;
    text: string;
    new_column: string;
  }

  const addTask = (interpretation: Interpretation) => {
    setData((prevData) => {
      const newData = [...prevData];
      const board = newData.find((board) => board.name.toLowerCase() === interpretation.column.toLowerCase());
      if (board) {
        const newTask = { id: generateUUID(), name: interpretation.text };
        board.items.push(newTask);
      }
      return newData;
    });
  };

  const moveTask = (interpretation: Interpretation) => {
    setData((prevData) => {
      const newData = [...prevData];
      const sourceBoard = newData.find((board) => board.name === interpretation.column);
      const destinationBoard = newData.find((board) => board.name === interpretation.new_column);

      if (sourceBoard && destinationBoard) {
        const taskIndex = sourceBoard.items.findIndex((task) => task.name === interpretation.text);
        if (taskIndex !== -1) {
          const [task] = sourceBoard.items.splice(taskIndex, 1);
          destinationBoard.items.push(task);
        }
      }
      return newData;
    });
  };

  const deleteTask = (interpretation: Interpretation) => {
    setData((prevData) => {
      const newData = prevData.map((board) => {
        if (board.name === interpretation.column) {
          const newItems = board.items.filter((task) => task.name.toLowerCase() !== interpretation.text.toLowerCase());
          return { ...board, items: newItems };
        }
        return board;
      });
      return newData;
    });
  };
  return { addTask, moveTask, deleteTask };
};

export default useBoards;

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
