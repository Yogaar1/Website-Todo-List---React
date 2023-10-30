import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, filterTodo } from "../redux/reducers/todo-reducer";
import ListTodo from "./ListTodo"; // Sesuaikan penamaan file ListTodo sesuai dengan kasus sebenarnya

function FormTodo() {
  const { isEdit, filter } = useSelector((state) => state.todos);
  const filterType = useSelector((state) => state.todos.filterType);

  const { ACTIVE, COMPLETED } = filterType;

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const [alert, setAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input === "") {
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 2000);
      return false;
    }
    if (!isEdit) {
      dispatch(addTodo(input));
    } else {
      dispatch(editTodo(input));
    }

    setInput("");

    if (filter === "active") {
      dispatch(filterTodo(ACTIVE));
    } else if (filter === "completed") {
      dispatch(filterTodo(COMPLETED));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="font-semibold text-3xl text-slate-600 mb-4">
        What's the plan for today?
      </h1>

      {alert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-500 text-white font-bold rounded-lg shadow-lg max-w-md">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              ERROR
            </div>
            <div className="border border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Isi input terlebih dahulu</p>
            </div>
          </div>
        </div>
      )}

      <form className="flex justify-between items-center">
        <input
          className="rounded-md p-3 border-2 border-slate-400 bg-transparent text-slate-700 w-3/4"
          type="text"
          placeholder="What to do"
          value={input}
          onChange={handleChange}
        />
        <button
          className="px-3 py-2 rounded-md bg-orange-400 hover-bg-sky-900 text-white"
          onClick={handleSubmit}
        >
          {isEdit ? "Edit" : "Add"}
        </button>
      </form>

      <ListTodo setInput={setInput} />
    </div>
  );
}

export default FormTodo;
