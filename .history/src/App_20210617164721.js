import { DragDropContext, Droppable, Dreggable } from "react-beautiful-dnd";
import id from "uuid/v4";

const columsFromBackend = [{}];

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
