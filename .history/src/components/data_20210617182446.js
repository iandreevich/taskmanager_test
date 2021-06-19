import { v4 as id } from "uuid";

export const itemsFromBackend = [
  {
    id: id(),
    content: "First task",
    author: "Denny",
    performer: "Denny,",
    descrip: "description",
    dateOver: "20.07.2021",
    priority: "hight",
  },
];

export const columsFromBackend = {
  [id()]: { name: "Todo", items: itemsFromBackend },
  [id()]: { name: "in Progress", items: [] },
  [id()]: { name: "Done", items: [] },
};
