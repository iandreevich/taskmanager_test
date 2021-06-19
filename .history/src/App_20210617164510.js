import { DragDropContext, Droppable, Dreggable } from "react-beautiful-dnd";

function App() {
  return <div >

<DragDropContext onDragEnd={result=> console.log(result);}/>

  </div>;
}

export default App;
