import React, { Component } from "react";
import TaskTracker from "./components/TaskTracker";
import Reporting from "./components/Reporting";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="header row bg-primary p-2">
            <div className="container">
              <div className="row">
                <div className="col">
                  <img
                    src="https://www.iresearchservices.com/public/frontend/assets/images/logo.png"
                    alt="irs logo"
                  ></img>
                </div>
                <div className="col">
                  <div className="float-right ">
                    <Link
                      className="btn text-white m-2 border-light"
                      to={"/report"}
                    >
                      Reporting
                    </Link>
                  </div>
                  <div className="float-right ">
                    <Link className="btn text-white m-2 border-light" to={"/"}>
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="container">
          <Switch>
            <Route exact path="/" component={TaskTracker} />
            <Route exact path="/report" component={Reporting} />
          </Switch>
        </div>
        <br></br>
        <div className="container-fluid bg-light p-3 text-center">
          <div className="row">
            <div className="col-12">
              <p>&copy;Copyright 2020 @ iResearch Services</p>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
