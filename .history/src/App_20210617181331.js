import Board from "./components/Board";
import SideBar from "./components/SideBar";
import "antd/dist/antd.css";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Board />
    </div>
  );
}

export default App;
