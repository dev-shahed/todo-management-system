import { Fragment } from "react";
import "./App.css";
import User from "./components/user/Index";

function App() {
  return (
    <Fragment>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <User />
    </Fragment>
  );
}

export default App;
