import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import EventsList from "./components/EventsList";

function App() {
  return (
    <div>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={EventsList} />
      </Switch>
    </div>
  );
}

export default App;
