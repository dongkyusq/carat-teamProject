import Router from "./shared/Router";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Login />
      </Router>
    </>
  );
}

export default App;
