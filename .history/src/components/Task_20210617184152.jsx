import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
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
              background: snapshot.isDragging ? "#fff" : "#FFA07A",
              color: "white",
              ...provided.draggableProps.style,
            }}
          >
            <h4>{task.content}</h4>

            <p
              style={{
                color:
                  task.dateOver < new Date().toLocaleDateString() && "#B22222",
              }}
            >
              {task.dateOver}
            </p>
          </div>
        );
      }}
    </Draggable>
  );
};
export default Task;
