import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTodo } from "../redux/actions/todoActions";

const InputField = ({ handleAdd }) => {
  const todo = useSelector((state) => state.allTodos.todo);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  return (
    <div className="flex justify-center">
      <div className="form-control">
        <form
          className="input-group"
          onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur();
          }}
        >
          <input
            type="text"
            placeholder="Write your task ..."
            value={todo}
            ref={inputRef}
            onChange={(e) => dispatch(setTodo(e.target.value))}
            className="input input-bordered"
          />

          <button
            type="submit"
            className="btn btn-outline ml-3 border-black text-rose-500	"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputField;
