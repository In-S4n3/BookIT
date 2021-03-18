import { React, useState } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let service = new AuthService();

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    service
      .signup(email, password)
      .then((response) => {
        //console.log("response from signup component call", response);
        setEmail("");
        setPassword("");
        props.history.push("/events")
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ textAlign: "center" }}>
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

        <input type="submit" value="Signup" />
      </form>

      <p>
        Already have account?
        <Link to={"/login"}> Login</Link>
      </p>
    </div>
  );
};

export default Signup;
