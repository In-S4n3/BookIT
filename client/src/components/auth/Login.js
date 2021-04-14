import { React, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "./auth-service";
import "./Auth.scss";
import "./Auth.scss"

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let service = new AuthService();

  let handleFormSubmit = (event) => {
    event.preventDefault();

    service
      .login(email, password)
      .then((response) => {
        //console.log("response from login component call", response);
        setEmail("");
        setPassword("");
        props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleFormSubmit} className="form">
        <label>Email: </label>
        <input type="text" name="email" value={email} onChange={handleEmail} />
        <br />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br />
        <input type="submit" value="login" className="loginButton"/>
      </form>
      <br />
      <p>
        You don't Have an account?
        <Link to={"/signup"}> Signup</Link>
      </p>
      <br />
      <p>
        <button className="googleAuth">
          {" "}
          <Link to={"/login-google"}>
          Login with Google
          </Link>
        </button>
      </p>
    </div>
  );
};

export default Login;
