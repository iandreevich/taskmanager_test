import Board from "./components/Board";
import SideBar from "./components/SideBar";
imp "./index.css"

function App() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Board />
    </div>
  );
}

export default App;