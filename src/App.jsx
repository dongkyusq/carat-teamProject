import { Provider } from "react-redux";
import Router from "./shared/Router";
<<<<<<< HEAD
import store from "./redux/config/configStore";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
=======
import Layout from './Layout';

function App() {
  return (
    <>
      <Router>
      </Router>
    </>
>>>>>>> 224fb9054749f5b15805ed99d737222a878d7b8f
  );
}

export default App;
