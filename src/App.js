import Board from "./components/Board/Board";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Board />
    </div>
  );
}

export default App;
