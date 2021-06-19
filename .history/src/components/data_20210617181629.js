export const itemsFromBackend = [
  { id: id(), content: "First task" },
  { id: id(), content: "Second task" },
];

export const columsFromBackend = {
  [id()]: { name: "Todo", items: itemsFromBackend },
  [id()]: { name: "in Progress", items: [] },
  [id()]: { name: "Done", items: [] },
};
