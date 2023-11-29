import { createContext } from "react";
import { boardType } from "../types/Boards";

interface ContextType {
  data: boardType[];
  setData: React.Dispatch<React.SetStateAction<boardType[]>>;
}

const defaultState: ContextType = {
  data: [],
  setData: () => {},
};

const BoardsContext = createContext<ContextType>(defaultState);

export default BoardsContext;
