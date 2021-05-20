import React from "react";
import "./Navbar.scss";

const Navbar = (props) => {
  return (
    <div>
      {props?.user ? (
        <nav className="navbar-container">
          <div className="logoAndUser">
            <a href="/">
              <img src="images/logo.png" alt="logo" width="55px" />
            </a>
            <p>
              Wellcome, {props?.user?.firstName} {props?.user?.lastName}
            </p>
          </div>
          <div className="auth">
            <section className="items">
              <div>
                <a href="/">
                  <strong onClick={() => props.logout()}>Logout</strong>
                </a>
              </div>
            </section>
          </div>
        </nav>
      ) : (
        <nav className="navbar-container">
          <div className="logoAndUser">
            <a href="/">
              <img src="images/logo.png" alt="logo" width="55px" />
            </a>
          </div>
          <div className="auth">
            <section className="items">
              <div>
                <a href="/login">
                  <strong>Login</strong>
                </a>
              </div>
              <div>
                <a href="/signup">
                  <strong>Sign up</strong>
                </a>
              </div>
            </section>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
