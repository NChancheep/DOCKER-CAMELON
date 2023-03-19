import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/Store";
import Home from "./page/HomePage";
import Emergency from "./page/EmergencyPage";
import ContactUs from "./page/AboutPage";
import "@fontsource/kanit";

function App() {
  return (
    <>
      <Provider store={Store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Emergency" component={Emergency} />
          <Route path="/contactus" component={ContactUs} />
          <Redirect to="/" />
        </Switch>
      </Router>
      </Provider>
    </>
  );
}

export default App;
