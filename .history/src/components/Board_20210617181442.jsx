import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as id } from "uuid";
import Column from "./Column";

const itemsFromBackend = [
  { id: id(), content: "First task" },
  { id: id(), content: "Second task" },
];

const columsFromBackend = {
  [id()]: { name: "Todo", items: itemsFromBackend },
  [id()]: { name: "in Progress", items: [] },
  [id()]: { name: "Done", items: [] },
};

const onDragEnd = (result, columns, setColums) => {
  const { source, destination } = result;
  if (!destination) return;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourseItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourseItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColums({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourseItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColums({
      ...columns,
      [source.droppableId]: { ...column, items: copiedItems },
    });
  }
};

const Board = () => {
  const [colums, setColums] = useState(columsFromBackend);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, colums, setColums)}
      >
        {Object.entries(colums).map(([id, column]) => {
          return <Column column={column} id={id} key={id} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default Board;
