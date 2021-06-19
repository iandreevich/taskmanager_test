import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { LineOutlined } from "@ant-design/icons";

const Task = ({ task, index, column }) => {
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
              background: snapshot.isDragging ? "#FFA500" : "#FFA07A",
              color: "white",
              borderRadius: 10,
              ...provided.draggableProps.style,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4>{task.content}</h4>
              <LineOutlined
                style={{
                  color: column === "Planned" && "#B22222" ||
                  column === "Planned" && "#FFD700" ||
                   column === "Done" && "green" 
                  fontSize: "25px",
                }}
              />
            </div>
            <p
              style={{
                color:
                  task.dateOver < new Date().toLocaleDateString() && "#B22222",
              }}
            >
              <strong>{task.dateOver}</strong>
            </p>
          </div>
        );
      }}
    </Draggable>
  );
};
export default Task;
