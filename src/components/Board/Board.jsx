import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import List from "../List/List";
import { drag } from "../../store/actions/actions";
import "./Board.scss";

const Board = () => {
  const columns = useSelector((state) => state.columns);

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    dispatch(drag(result, columns));
  };

  return (
    <div className="board">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
        {Object.entries(columns).map(([id, column]) => {
          return <List column={column} id={id} key={id} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default Board;
