import {
  DRAG_HAPPEND,
  ADD_TASK,
  REMOVE_TASK,
  CHANGE_TASK,
  ADD_COLUMN,
  REMOVE_COLUMN,
} from "../types";
import { generate as id } from "shortid";

const initialData = {
  planned: {
    name: "Planned",
    items: [
      {
        id: id(),
        content: "Find new work",
        author: "Denny",
        descrip: "description",
        date: "25.08.2021",
        priority: true,
        status: "planned",
      },
    ],
  },
  progress: {
    name: "Progress",
    items: [
      {
        id: id(),
        content: "Buy a new car",
        author: "Denny",
        descrip: "description",
        date: "25.08.2021",
        priority: false,
        status: "progress",
      },
    ],
  },
  done: {
    name: "Done",
    items: [
      {
        id: id(),
        content: "Visit all countries",
        author: "John",
        descrip: "description",
        date: "23.06.2021",
        priority: false,
        status: "done",
      },
    ],
  },
};

export const columns = (state = initialData, action) => {
  switch (action.type) {
    case ADD_COLUMN: {
      const { newColumn } = action.payload;

      return {
        ...state,
        [newColumn.toLowerCase()]: { name: newColumn, items: [] },
      };
    }
    case REMOVE_COLUMN: {
      const { columnName } = action.payload;
      const newState = { ...state };
      delete newState[columnName];
      return newState;
    }

    case DRAG_HAPPEND: {
      const { result, columns } = action.payload;

      const { source, destination } = result;
      if (!destination) return state;
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourseItems = [...sourceColumn.items];
        sourseItems.find((el) => el.id === result.draggableId).status =
          destination.droppableId;
        const destItems = [...destColumn.items];
        const [removed] = sourseItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        const newState = {
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourseItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        };
        return newState;
      } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        const newState = {
          ...columns,
          [source.droppableId]: { ...column, items: copiedItems },
        };
        return newState;
      }
    }

    case ADD_TASK:
      const { newTask } = action.payload;

      return {
        ...state,
        [newTask.status]: {
          ...state[newTask.status],
          items: [...state[newTask.status].items, { id: id(), ...newTask }],
        },
      };
    case REMOVE_TASK:
      const { taskID, column } = action.payload;
      const copyitems = [...state[column].items];
      const newItems = copyitems.filter((i) => i.id !== taskID);

      return {
        ...state,
        [column]: {
          ...state[column],
          items: newItems,
        },
      };
    case CHANGE_TASK:
      const { task, col } = action.payload;

      const index = state[col].items.indexOf(
        state[col].items.find((el) => el.id === task.id)
      );

      if (task.status !== col) {
        const newList = state[col].items.filter((el) => el.id !== task.id);

        return {
          ...state,
          [task.status]: {
            ...state[task.status],
            items: [...state[task.status].items, task],
          },
          [col]: {
            ...state[col],
            items: newList,
          },
        };
      } else {
        const nItems = state[col].items;
        nItems[index] = task;
        return {
          ...state,
          [col]: {
            ...state[col],
            items: nItems,
          },
        };
      }

    default:
      return state;
  }
};
