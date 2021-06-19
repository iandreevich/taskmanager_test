import { useState } from "react";
import { Button } from "antd";
import Task from "../Task";

import NewTaskForm from "../NewTaskForm";
import "./index.scss";

const SideBar = () => {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [newTask, setNewTask] = useState({});

  console.log(newTask);
  return (
    <>
      {isFormOpened && (
        <NewTaskForm
          setIsFormOpened={setIsFormOpened}
          setNewTask={setNewTask}
        />
      )}
      <div className="sidebar">
        <h2 className="sidebar__logo">Task Manager</h2>
        <div className="sidebar__buttons">
          <Button type="primary" onClick={() => setIsFormOpened(true)}>
            Add Task +
          </Button>
          <Button type="default">Board 1</Button>
          <Button type="default">Board 2</Button>
          {newTask && <Task task={newTask} />}
        </div>
      </div>
    </>
  );
};
export default SideBar;
