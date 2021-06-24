import React from "react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CloseOutlined, LineOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { removeTask } from "../../store/actions/actions";
import TaskForm from "../TaskForm/TaskForm";

const Task = ({ task, index, column }) => {
  const [isInfoFormOpen, setIsInfoFormOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() => setIsInfoFormOpen(true)}
              style={{
                ...styles.task,
                background: snapshot.isDragging ? "#FF7F50" : "#FFA07A",
                ...provided.draggableProps.style,
              }}
            >
              <div style={styles.taskBody}>
                <h4>{task.content}</h4>{" "}
                <div style={styles.buttons}>
                  <Button
                    danger
                    style={styles.button}
                    onClick={() => dispatch(removeTask(task.id, column))}
                  >
                    <CloseOutlined />
                  </Button>
                </div>
              </div>

              <p
                style={{
                  color:
                    task.date < new Date().toLocaleDateString("en-GB")
                      ? "red"
                      : "#fff",
                }}
              >
                {task.date}
              </p>
              <LineOutlined
                style={{
                  fontSize: "30px",
                  color: task.priority ? "red" : "green",
                }}
              />
            </div>
            {isInfoFormOpen && (
              <TaskForm
                setIsInfoFormOpen={setIsInfoFormOpen}
                task={task}
                column={column}
              />
            )}
          </>
        );
      }}
    </Draggable>
  );
};
const styles = {
  task: {
    userSelect: "none",
    padding: 16,
    margin: "0 0 8px 0",
    minHeight: "50px",
    borderRadius: 10,
    cursor: "pointer",
  },
  taskBody: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    border: "none",
    fontSize: "15px",
    background: "none",
  },
  buttons: {
    display: "flex",
  },
};
export default Task;
