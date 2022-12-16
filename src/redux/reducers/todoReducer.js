import { ActionTypes } from "../constants/action-types";

const initialState = {
  todo: "",
  todos:
    typeof window !== "undefined" && localStorage.getItem("todosList")
      ? JSON.parse(localStorage.getItem("todosList"))
      : [],
  inProgressTodos:
    typeof window !== "undefined" && localStorage.getItem("inProgressTodos")
      ? JSON.parse(localStorage.getItem("inProgressTodos"))
      : [],
  completedTodos:
    typeof window !== "undefined" && localStorage.getItem("completedTodos")
      ? JSON.parse(localStorage.getItem("completedTodos"))
      : [],
};
export const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TODO_TO_TODOS_LIST:
      return { ...state, todos: [...state.todos, payload] };
    case ActionTypes.SET_TO_TODOS_LIST:
      return { ...state, todos: [...payload] };
    case ActionTypes.SET_TO_IN_PROGRESS_TODOS_LIST:
      return { ...state, inProgressTodos: [...payload] };
    case ActionTypes.SET_TO_COMPLETED_TODOS_LIST:
      return { ...state, completedTodos: [...payload] };
    case ActionTypes.SET_TODO:
      return { ...state, todo: payload };
    case ActionTypes.REMOVE_SELECTED_TODO:
      return { ...state, todo: payload };
    default:
      return state;
  }
};
