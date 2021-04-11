import React, { Component } from "react";
import moduleName from './Footer.scss'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer className="tiago-footer">
        <div className="tiago-inner-footer">
          <div className="tiago-logo-container">
            <img src="/images/logo.png" alt="logo" width="55px" height="50px"/>
            <br />
            <address className="address">
              <p>IronHack, <br />
              Heden Santa Apolónia, Lisbon, Portugal</p>
            </address>
          </div>
          <div className="tiago-footer-third">
            <h4>Need Help?</h4>
            <p>Terms &amp; Conditions</p>
            <p>Private Policy</p>
          </div>

          <div className="tiago-footer-third">
            <h4>Creators</h4>
            <p>Tiago Pereira (Web Developer)</p>
            <p>Alexandre Florindo (Web Developer)</p>
            <p>Aleksandra Sergiel (UX/UI)</p>
          </div>

          <div className="tiago-footer-third">
            <h4>Resources</h4>
            <p>BootStrap</p>
            <p>React JS</p>
            <p>Github</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
