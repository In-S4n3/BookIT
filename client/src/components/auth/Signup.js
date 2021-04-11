import { React, useState } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  let service = new AuthService();

  let handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  let handleLastName = (e) => {
    setLastName(e.target.value);
  };

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleFormSubmit = (e) => {
    e.preventDefault();
    service
      .signup(firstName, lastName, email, password)
      .then((response) => {
        //console.log("response from signup component call", response);
        setFirstName("");
        setLastName("")
        setEmail("");
        setPassword("");
        props.history.push("/events");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleFormSubmit} className="form">
        <label>First Name:</label>
        <input type="text" name="firstName" value={firstName} onChange={handleFirstName} />
        <br />
        <label>Last Name:</label>
        <input type="text" name="lastName" value={lastName} onChange={handleLastName} />
        <br />
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <br />
        <input type="submit" value="Signup" className="loginButton" />
      </form>
      <br />
      <p>
        Already have account?
        <Link to={"/login"}> Login</Link>
      </p>
      <br />
      <p>
        <button className="googleAuth">
           <Link to={"/login-google"}>Signin with Google</Link>
        </button>
      </p>
    </div>
  );
};

export default Signup;
