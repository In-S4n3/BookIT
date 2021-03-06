// auth/auth-service.js

import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (firstName, lastName, email, password) => {
    return this.service
      .post("/signup", { firstName, lastName, email, password })
      .then((response) => {
        return response.data;
      });
  };

  // Verificação se estamos ou não logados.
  loggedin = () => {
    return this.service.get("/loggedin").then((response) => {
      return response.data;
    });
  };

  login = (email, password) => {
    return this.service.post("/login", { email, password }).then((response) => {
      return response.data;
    });
  };

  logout = () => {
    return this.service.post("/logout", {}).then((response) => response.data);
  };
}

export default AuthService;
