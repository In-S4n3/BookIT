import { React, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "./auth-service";

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
        props.history.push("/events")
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <input type="submit" value="login" />
      </form>

      <p>
        You don't Have an account?
        <Link to={"/signup"}> Signup</Link>
      </p>
    </div>
  );
};

export default Login;
