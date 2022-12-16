import { ActionTypes } from "../constants/action-types";

export const addToDo = (todo) => {
  return {
    type: ActionTypes.ADD_TODO_TO_TODOS_LIST,
    payload: todo,
  };
};

export const setTodos = (todos) => {
  return {
    type: ActionTypes.SET_TO_TODOS_LIST,
    payload: todos,
  };
};

export const setCompletedTodos = (todos) => {
  return {
    type: ActionTypes.SET_TO_COMPLETED_TODOS_LIST,
    payload: todos,
  };
};

export const setInProgressTodos = (todos) => {
  return {
    type: ActionTypes.SET_TO_IN_PROGRESS_TODOS_LIST,
    payload: todos,
  };
};

export const removeTodo = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_TODO,
    payload: "",
  };
};

export const setTodo = (todo) => {
  return {
    type: ActionTypes.SET_TODO,
    payload: todo,
  };
};
