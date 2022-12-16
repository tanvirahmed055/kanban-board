import React, { useEffect, useState } from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const TodoList = () => {
  const [enabled, setEnabled] = useState(false);
  const todos = useSelector((state) => state.allTodos.todos);

  const completedTodos = useSelector((state) => state.allTodos.completedTodos);

  const inProgressTodos = useSelector(
    (state) => state.allTodos.inProgressTodos
  );

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className="grid gap-x-8 gap-y-4 grid-cols-3">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="border-2 border-black h-96"
          >
            <div className="bg-red-500	flex justify-center text-2xl font-bold	mb-5">
              To Do
            </div>
            {todos?.map((todo, index) => (
              <SingleTodo index={index} key={todo.id} todo={todo} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosInProgress">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="border-2 border-black h-96"
          >
            <span className="bg-red-500	flex justify-center text-2xl font-bold	mb-5">
              In Progress
            </span>
            {inProgressTodos?.map((todo, index) => (
              <SingleTodo index={index} key={todo.id} todo={todo} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="border-2 border-black h-96"
          >
            <span className="bg-red-500 flex justify-center text-2xl font-bold	mb-5">
              Done
            </span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo index={index} key={todo.id} todo={todo} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
