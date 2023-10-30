import React from "react";
import FormTodo from "./components/FormTodo";

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-10 md:mx-auto">
        <FormTodo />
      </div>
    </div>
  );
}

export default App;
