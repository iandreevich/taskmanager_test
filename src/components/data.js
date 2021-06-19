import { v4 as id } from "uuid";

export const itemsFromBackend = [
  {
    id: id(),
    content: "Find new work",
    author: "Denny",
    performer: "Denny,",
    descrip: "description",
    dateOver: "17.06.2021",
    priority: "hight",
  },
  {
    id: id(),
    content: "Buy a new car",
    author: "Denny",
    performer: "Denny,",
    descrip: "description",
    dateOver: "05.07.2021",
    priority: "hight",
  },
  {
    id: id(),
    content: "Visit all countries",
    author: "John",
    performer: "John,",
    descrip: "description",
    dateOver: "20.07.2022",
    priority: "normal",
  },
];

export const columsFromBackend = {
  [id()]: { name: "Planned", items: itemsFromBackend },
  [id()]: { name: "In Progress", items: [] },
  [id()]: { name: "Done", items: [] },
};
