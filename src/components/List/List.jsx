import { Button } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import { useDispatch } from "react-redux";
import { removeColumn } from "../../store/actions/actions";
import "./index.scss";

const List = ({ column, id }) => {
  const dispatch = useDispatch();

  const deleteList = (column) => {
    dispatch(removeColumn(column.toLowerCase()));
  };
  return (
    <div className="list">
      <div className="list__wrapper">
        <div className="list__body">
          <h2>{column.name}</h2>
          <Button
            style={{ border: "none", boxShadow: "none" }}
            onClick={() => deleteList(column.name)}
          >
            <DeleteOutlined />
          </Button>
        </div>

        <Droppable droppableId={id}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "#778899" : "#C0C0C0",
                  padding: 4,
                  width: 250,
                  minHeight: 50,
                  borderRadius: 10,
                }}
              >
                {column.items &&
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
