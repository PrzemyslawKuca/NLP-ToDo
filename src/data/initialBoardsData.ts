import { boardType } from "../types/Boards";

export const initialBoardsData: boardType[] = [
  {
    id: "64afb072-03ef-4531-a9da-a61193aa9caa",
    name: "To Do",
    items: [{ id: "702762e5-59a1-44d6-a724-9af7b20ab113", name: "Buy milk 2%" }],
    color: "red",
  },
  {
    id: "6a486417-68e7-4faa-acd5-f0a7f319b3a9",
    name: "In Progress",
    items: [],
    color: "orange",
  },
  {
    id: "e173113b-7f72-4d6d-99d3-5cb4170c7510",
    name: "Done",
    items: [],
    color: "green",
  },
];
