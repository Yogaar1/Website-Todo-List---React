import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  deleteTodo,
  filterTodo,
  startEdit,
} from "../redux/reducers/todo-reducer";

import PropTypes from "prop-types";

const ListTodo = ({ setInput }) => {
  const { todos, filter, filterType, filterTodos } = useSelector(
    (state) => state.todos
  );

  const { ALL, ACTIVE, COMPLETED } = filterType;
  const dispatch = useDispatch();
  // console.log(todos);

  const refreshTodo = () => {
    if (filter === "active") {
      dispatch(filterTodo(ACTIVE));
    } else if (filter === "completed") {
      dispatch(filterTodo(COMPLETED));
    }
  };

  const removeTodo = (id) => {
    dispatch(deleteTodo(id));
    // console.log(id);
    refreshTodo();
  };

  const handleComplete = (id) => {
    dispatch(completeTodo(id));

    refreshTodo();
  };

  const handleEdit = (id, value) => {
    setInput(value);
    dispatch(startEdit(id));
  };

  const handleFilter = (filter) => {
    dispatch(filterTodo(filter));
  };

  const nonActiveClass =
    "py-1 px-3 bg-slate-800 rounded-2xl text-white hover:bg-gray-700";

  const activeClass =
    "py-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-2xl text-white";

  return (
    <div className="max-w-md">
      <div className="flex gap-3 mt-5 mb-3">
        {/* filter todos */}
        <button
          className={filter === "all" ? activeClass : nonActiveClass}
          onClick={() => handleFilter(ALL)}
        >
          all
        </button>
        <button
          className={filter === "active" ? activeClass : nonActiveClass}
          onClick={() => handleFilter(ACTIVE)}
        >
          active
        </button>
        <button
          className={filter === "completed" ? activeClass : nonActiveClass}
          onClick={() => handleFilter(COMPLETED)}
        >
          completed
        </button>
      </div>

      {/* list todo */}
      <ul className="flex flex-col mt-8 gap-6">
        {filter === "all" ? (
          todos.length > 0 ? (
            todos.map((item) => (
              <li
                className=" grow border-2 p-2 border-slate-400 flex gap-3 items-center rounded"
                key={item.id}
              >
                <button
                  className={`border-2 ${
                    !item.completed ? "p-2.5" : ""
                  }  border-slate-400`}
                >
                  {item.completed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </button>
                <p
                  className={
                    "grow text-xl cursor-pointer text-slate-700" +
                    (item.completed ? " line-through" : "")
                  }
                  onClick={() => handleComplete(item.id)}
                >
                  {item.value}
                </p>
                <div className="icon flex gap-2 items-center">
                  <button
                    id="edit"
                    onClick={() => handleEdit(item.id, item.value)}
                  >
                    ✏️
                  </button>

                  <button id="delete" onClick={() => removeTodo(item.id)}>
                    ❌
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-2l text-slate-700">
              No plans today
            </p>
          )
        ) : filterTodos.length > 0 ? (
          filterTodos.map((item) => (
            <li
              className=" grow border-2 p-2 border-slate-400 flex gap-3 items-center rounded"
              key={item.id}
            >
              <button
                className={`border-2 ${
                  !item.completed ? "p-2.5" : ""
                }  border-slate-400`}
              >
                {item.completed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </button>
              <p
                className={
                  "grow text-xl cursor-pointer text-slate-700" +
                  (item.completed ? " line-through" : "")
                }
                onClick={() => handleComplete(item.id)}
              >
                {item.value}
              </p>
              <div className="icon flex gap-2 items-center">
                <button
                  id="edit"
                  onClick={() => handleEdit(item.id, item.value)}
                >
                  ✏️
                </button>

                <button id="delete" onClick={() => removeTodo(item.id)}>
                  ❌
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-2xl text-slate-700">
            There is no todos
          </p>
        )}
      </ul>
    </div>
  );
};

ListTodo.propTypes = {
  setInput: PropTypes.func.isRequired,
};

export default ListTodo;
