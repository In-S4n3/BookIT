import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
    };
  }

  showAlert = () => {
    this.setState({
      alert: true,
    });
  };

  render() {
    console.log(this.state.alert);
    return (
      <div className="container_home">
        <section className="home_img"></section>
        <section className="titleAndButton">
          <div>
            <h1 className="h1-home-text title">
              Book an Event <br /> & <br /> Have a Good Time
            </h1>
            <br />
            <p className="home-text subtitle is-5">
              No more endeless chat groups to book an event, now you have
              BookIT. In 3 steps you enjoy time with your friends and family.
              BookIT, it is a platform which helps you invite people for a
              dinner and make a list in the easiest way.
            </p>
          </div>
          <br />
          <div>
            {this.props.user ? (
              <Link to="/events" className="btn-events btn-events btn-lg">
                <strong>BookIT Now</strong>
              </Link>
            ) : (
              <button
                onClick={this.showAlert}
                className="btn-events btn-events btn-lg"
              >
                <strong>BookIT Now</strong>
              </button>
            )}
            <br />
            <br />
            {this.state.alert === true ? (
              <div>
                <Alert variant="warning">
                  Please <a href="/login">Login</a> or{" "}
                  <a href="/signup">Sign up</a> first.
                </Alert>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;

/*
<div
          className="backgroundImage div-size div-left"
          style={{ width: "50%", float: "left" }}
        ></div>

        <div
          style={{ width: "50%", float: "right" }}
          className="div-size div-right"
        >
          
        </div>
*/
