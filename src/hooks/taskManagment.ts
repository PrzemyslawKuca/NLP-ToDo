import { useContext } from "react";
import BoardsContext from "../context/BoardsContext";

const useBoards = () => {
  const { data, setData } = useContext(BoardsContext);

  const addTask = (interpretation: any) => {
    setData((prevData) => {
      const newData = [...prevData];
      const board = newData.find((board: any) => board.name.toLowerCase() === interpretation.column.toLowerCase());
      if (board) {
        board.items.push({ id: generateUUID(), name: interpretation.text });
      }
      console.log(newData);
      return newData;
    });
  };

  const moveTask = (interpretation: any) => {
    const board = data.find((board) => board.id === interpretation.boardId);
    if (board) {
      const task = board.items.find((task) => task.id === interpretation.taskId);
      if (task) {
        board.items = board.items.filter((task) => task.id !== interpretation.taskId);
        const newBoard = data.find((board) => board.id === interpretation.newBoardId);
        if (newBoard) {
          newBoard.items.push(task);
        }
      }
    }
  };

  const deleteTask = (interpretation: any) => {
    const board = data.find((board) => board.id === interpretation.boardId);
    if (board) {
      board.items = board.items.filter((task) => task.id !== interpretation.taskId);
    }
  };
  return { addTask, moveTask, deleteTask };
};

export default useBoards;

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
