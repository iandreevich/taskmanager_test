import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as id } from "uuid";

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

function Board() {
  const [colums, setColums] = useState(columsFromBackend);
  console.log(colums);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, colums, setColums)}
      >
        {Object.entries(colums).map(([id, column]) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div style={{ margin: 8 }}>
                <h2>{column.name}</h2>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      background: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;
