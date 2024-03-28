import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Index";
import Todo from "./components/todo";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />}/>
        </Routes>
        <Routes>
          <Route path="/auth" element={<Auth />}/>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
