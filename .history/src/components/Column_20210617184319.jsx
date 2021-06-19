import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ column, id }) => {
  return (
    <div
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
                  background: snapshot.isDraggingOver ? "lightgrey" : "#F6FAFA",
                  padding: 4,
                  width: 250,
                  minHeight: 500,
                  borderRadius: 10,
                }}
              >
                {column.items.map((task, index) => {
                  return <Task task={task} index={index} key={task.id} />;
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
