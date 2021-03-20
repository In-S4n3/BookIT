import "./App.scss";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { Navbar, Nav } from "react-bootstrap";
import EventsList from "./components/EventList/EventsList";
import EventDetails from "./components/EventDetails/EventDetails";
//import FooterPage from "./components/FooterPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AuthService from "../src/components/auth/auth-service";

function App(props) {
  const [user, setUser] = useState(null);

  let service = new AuthService();

  let getUser = () => {
    service
      .loggedin()
      .then((userLogedIn) => {
        setUser(userLogedIn);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  let logoutUser = () => {
    service.logout().then(() => {
      setUser(null);
      props.history.push("/")
    });
  };

  return (
    <div>
      {user ? (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Book IT</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/logout" onClick={logoutUser}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Book IT</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar>
      )}
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} user={user}/>}  />
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
