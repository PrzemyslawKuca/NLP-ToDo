import { useState } from "react";
import "./App.css";
import BoardsContainer from "./components/BoardsContainer/BoardsContainer";
import Header from "./components/Header/Header";
import InputSection from "./components/InputSection/InputSection ";
import { initialBoardsData } from "./data/initialBoardsData";
import { boardType } from "./types/Boards";
import BoardsContext from "./context/BoardsContext";

function App() {
  const [data, setData] = useState<boardType[]>(initialBoardsData);

  return (
    <BoardsContext.Provider value={{ data, setData }}>
      <Header />
      <InputSection />
      <BoardsContainer />
    </BoardsContext.Provider>
  );
}

export default App;
