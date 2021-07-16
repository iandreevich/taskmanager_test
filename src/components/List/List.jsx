import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Droppable } from "react-beautiful-dnd";
import { removeColumn } from "../../store/actions/actions";
import Task from "../Task/Task";
import "./List.scss";

const List = ({ column, id }) => {
  const dispatch = useDispatch();

  const deleteList = (column) => {
    dispatch(removeColumn(column.toLowerCase()));
  };
  return (
    <div className="list">
      <div className="list__wrapper">
        <div className="list__title">
          <h2>{column.name}</h2>
          <Button onClick={() => deleteList(column.name)}>
            <DeleteOutlined />
          </Button>
        </div>

        <Droppable droppableId={id}>
          {(provided, snapshot) => {
            return (
              <div
                className="list__body"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "#778899" : "#C0C0C0",
                }}
              >
                {column.items.length > 0 &&
                  column.items.map((task, index) => {
                    return (
                      <Task
                        task={task}
                        index={index}
                        key={task.id}
                        column={id}
                      />
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
};
export default List;
