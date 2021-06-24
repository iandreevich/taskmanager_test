import { Button, Input, Form } from "antd";
import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import { addColumn } from "../../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

const SideBar = ({ openForm }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [newColumn, setNewColumn] = useState("");

  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  console.log(columns.length);

  const addList = (e) => {
    setNewColumn(e.target.value);
  };
  const handleSubmit = () => {
    newColumn && dispatch(addColumn(newColumn));
    setNewColumn("");
  };

  return (
    <>
      {isOpenForm && <TaskForm setIsOpenForm={setIsOpenForm} />}
      <div className="sidebar">
        <h2 className="sidebar__logo">Task Manager</h2>
        <div className="sidebar__buttons">
          <Button
            type="primary"
            onClick={() => setIsOpenForm(true)}
            disabled={Object.keys(columns).length === 0 ? true : false}
          >
            Add Task +
          </Button>
        </div>
        <Form onFinish={handleSubmit}>
          <Input
            placeholder="Enter name of new list"
            value={newColumn}
            onChange={addList}
          ></Input>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Add List +
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SideBar;
