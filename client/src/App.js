import "./App.scss";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import EventsList from "./components/EventList/EventsList";
import EventDetails from "./components/EventDetails/EventDetails";
import FooterPage from './components/FooterPage'

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src="./images/forkknife.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          BOOK IT
        </Navbar.Brand>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={EventsList} />
        <Route
          exact
          path="/events/:id"
          render={(props) => <EventDetails {...props} />}
        />
      </Switch>
      <FooterPage />
    </div>
  );
}

export default App;
