import { DragDropContext, Droppable, Dreggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

const itemsFromBackend = [
  {id: uuid(), content: "First task"}
  {id: uuid(), content: "First task"}
];

const columsFromBackend = [
  {
    [uuid()]: { name: "Todo", items: [] },
  },
];

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => console.log(result)}
      ></DragDropContext>
    </div>
  );
}

export default App;