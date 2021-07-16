import Board from "./components/Board/Board";
import SideBar from "./components/SideBar/SideBar";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <SideBar />
      <Board />
    </div>
  );
}

export default App;
