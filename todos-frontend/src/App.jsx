import { Fragment } from "react";
import "./App.css";
import Auth from "./components/auth/Index";

function App() {
  return (
    <Fragment>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Auth />
    </Fragment>
  );
}

export default App;
