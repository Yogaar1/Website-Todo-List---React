import React from "react";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-10 md:mx-auto">
        <Todo />
      </div>
    </div>
  );
}

export default App;
