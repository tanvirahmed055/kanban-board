import React from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  addToDo,
  removeTodo,
  setCompletedTodos,
  setInProgressTodos,
  setTodos,
} from "./redux/actions/todoActions";
import { useSelector } from "react-redux";
import { asyncLocalStorage } from "./storage/storage";

function App() {
  const todo = useSelector((state) => state.allTodos.todo);
  const todos = useSelector((state) => state.allTodos.todos);
  const completedTodos = useSelector((state) => state.allTodos.completedTodos);
  const inProgressTodos = useSelector(
    (state) => state.allTodos.inProgressTodos
  );

  const dispatch = useDispatch();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (todo) {
      const getTodos = await asyncLocalStorage
        .getItem("todosList")
        .then(function (value) {
          return JSON.parse(value);
        });

      const todosList = getTodos
        ? getTodos.concat([{ id: Date.now(), todo }])
        : [{ id: Date.now(), todo }];

      const stringifiedTodosList = JSON.stringify(todosList);
      asyncLocalStorage.setItem("todosList", stringifiedTodosList);

      dispatch(addToDo({ id: Date.now(), todo }));
      dispatch(removeTodo());
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let pending = inProgressTodos;
    let complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "TodosRemove") {
      add = complete[source.index];
      complete.splice(source.index, 1);
    } else if (source.droppableId === "TodosInProgress") {
      add = pending[source.index];
      pending.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TodosRemove") {
      complete.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TodosInProgress") {
      pending.splice(destination.index, 0, add);
    }
    const stringifiedActive = JSON.stringify(active);
    const stringifiedPending = JSON.stringify(pending);
    const stringifiedComplete = JSON.stringify(complete);

    asyncLocalStorage.setItem("todosList", stringifiedActive);
    asyncLocalStorage.setItem("inProgressTodos", stringifiedPending);
    asyncLocalStorage.setItem("completedTodos", stringifiedComplete);

    dispatch(setTodos(active));
    dispatch(setInProgressTodos(pending));
    dispatch(setCompletedTodos(complete));
    dispatch(removeTodo());
  };

  return (
    <div className="flex justify-center 	min-w-full	my-auto h-screen">
      <DragDropContext onDragEnd={onDragEnd} className="flex content-center">
        <div className="flex flex-col	 justify-center w-3/5 gap-12">
          <InputField handleAdd={handleAdd} />
          <TodoList />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
