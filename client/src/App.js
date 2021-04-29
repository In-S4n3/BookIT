import "./App.scss";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import EventsList from "./components/EventList/EventsList";
import EventDetails from "./components/EventDetails/EventDetails";
import NavbarPer from "./components/Navbar/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AuthService from "../src/components/auth/auth-service";
import MainPage from "./components/MainPage/MainPage";

function App(props) {
  const [user, setUser] = useState(null);

  let service = new AuthService();

  let getUser = () => {
    service
      .loggedin()
      .then((userLogedIn) => {
        //console.log(userLogedIn);
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
    });
  };

  return (
    <div>
      <NavbarPer user={user} logout={logoutUser} />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} user={user} />}
        />
        <Route exact path="/events" component={MainPage} />
        <Route
          exact
          path="/events/:id"
          render={(props) => <EventDetails {...props} />}
        />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route exact path="/signup" render={(props) => <Signup {...props} />} />
        <Route
          exact
          path="/login-google"
          render={() => {
            window.location.href = "http://localhost:5000/api/auth/google";
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
