import { useState } from "react";
import { DragDropContext, Droppable, Dreggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "First task" },
];

const columsFromBackend = [
  {
    [uuid()]: { name: "Todo", items: [] },
  },
];

function App() {
  const [colums, setColums] = useState(columsFromBackend);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {Object.entries(colums).map(([id, column]) => {
          return <Droppable droppableId={id}></Droppable>;
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
