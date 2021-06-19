import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({ column, id }) => {
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
                  return <Task item={item} index={index} />;
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};
export default Column;
