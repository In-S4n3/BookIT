import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { Navbar, Nav } from "react-bootstrap";
import EventsList from "./components/EventList/EventsList";
import EventDetails from "./components/EventDetails/EventDetails";
//import FooterPage from "./components/FooterPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Book IT</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="login">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/events" component={EventsList} />
        <Route
          exact
          path="/events/:id"
          render={(props) => <EventDetails {...props} />}
        />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route exact path="/signup" render={(props) => <Signup {...props} />} />
        <Route
          exact
          path="login-facebook"
          render={() => {
            window.location.href = `http://localhost:5000/api/auth/facebook`;
          }}
        />
      </Switch>
      {/* <FooterPage /> */}
    </div>
  );
}

export default App;
