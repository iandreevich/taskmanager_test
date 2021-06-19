import { Button } from "antd";

const SideBar = () => {
  return (
    <>
      <div style={style.sidebar}>
        <h2>Task Manager</h2>
        <div className="sidebar__buttons">
          <Button type="primary">Add Task +</Button>
          <Button type="default">Board 1</Button>
          <Button type="default">Board 2</Button>
        </div>
      </div>
    </>
  );
};

const style = {
  sidebar: {
    padding: "0.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    width: "250px",
    minHeight: "100vh",
    borderRight: "0.5px solid #7a7977",
  },
};
export default SideBar;