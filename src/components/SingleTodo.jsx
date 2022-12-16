import React from "react";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo = ({ index, todo }) => {
  if (!todo.id) return null;

  return (
    <Draggable draggableId={todo.id.toString()} index={index} className="">
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="border-2 border-black max-w-xs bg-slate-200	 mx-auto py-1 mb-3"
        >
          <span className="flex justify-center text-2xl font-light">
            {todo.todo}
          </span>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
