import { useState } from "react";
import { Button } from "antd";

import NewTaskForm from "../NewTaskForm";
import "./index.scss";

const SideBar = () => {
  console.log(newTask);
  return (
    <>
      <div className="sidebar">
        <h2 className="sidebar__logo">Task Manager</h2>
        <div className="sidebar__buttons">
          <Button type="primary" onClick={() => setIsFormOpened(true)}>
            Add Task +
          </Button>
          <Button type="default">Board 1</Button>
          <Button type="default">Board 2</Button>
        </div>
      </div>
    </>
  );
};
export default SideBar;