import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import EventsList from "./components/EventList/EventsList";
import EventDetails from "./components/EventDetails/EventDetails";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={EventsList} />
        <Route
          exact
          path="/events/:id"
          render={(props) => <EventDetails {...props}/>}
        />
      </Switch>
    </div>
  );
}

export default App;
