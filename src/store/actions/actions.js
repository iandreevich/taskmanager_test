import {
  ADD_TASK,
  CHANGE_TASK,
  DRAG_HAPPEND,
  REMOVE_TASK,
  ADD_COLUMN,
  REMOVE_COLUMN,
} from "../types";

export const drag = (result, columns) => {
  return {
    type: DRAG_HAPPEND,
    payload: { result, columns },
  };
};

export const addTask = (newTask) => {
  return {
    type: ADD_TASK,
    payload: { newTask },
  };
};
export const removeTask = (taskID, column) => {
  return {
    type: REMOVE_TASK,
    payload: { taskID, column },
  };
};

export const changeTask = (task, col) => {
  return {
    type: CHANGE_TASK,
    payload: { task, col },
  };
};

export const addColumn = (newColumn) => {
  return {
    type: ADD_COLUMN,
    payload: { newColumn },
  };
};
export const removeColumn = (columnName) => {
  return {
    type: REMOVE_COLUMN,
    payload: { columnName },
  };
};
