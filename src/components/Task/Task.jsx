import { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { CloseOutlined, LineOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { removeTask } from "../../store/actions/actions";
import TaskForm from "../TaskForm/TaskForm";
import "./Task.scss";

const Task = ({ task, index, column }) => {
  const [isInfoFormOpen, setIsInfoFormOpen] = useState(false);
  const dispatch = useDispatch();

  const handleTaskInfoFormChange = () => {
    setIsInfoFormOpen(!isInfoFormOpen);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <>
            <div
              className="task"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={handleTaskInfoFormChange}
              style={{
                background: snapshot.isDragging ? "#FF7F50" : "#FFA07A",
                ...provided.draggableProps.style,
              }}
            >
              <div className="task__body">
                <h4>{task.content}</h4>
                <div className="task__buttons">
                  <Button
                    danger
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
                  color: task.priority ? "red" : "green",
                }}
              />
            </div>
            {isInfoFormOpen && (
              <TaskForm
                handleTaskInfoFormChange={handleTaskInfoFormChange}
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

export default Task;
