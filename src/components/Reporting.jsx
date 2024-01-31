import React, { Component } from "react";
import Filter from "./Filter";
import Result from "./Result";
import moment from "moment";

class Reporting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programmer: "",
      project: "",
      startdate: moment().format("DD-MM-YYYY"),
      enddate: moment().format("DD-MM-YYYY"),
    };
  }

  findResult = (filter) => {
    this.setState({
      project: filter.project,
      programmer: filter.programmer,
      startdate: moment(filter.startdate, "MM-DD-YYYY").format("DD-MM-YYYY"),
      enddate: moment(filter.enddate, "MM-DD-YYYY").format("DD-MM-YYYY"),
    });
  };

  render() {
    return (
      <div className="container">
        <Filter onFind={this.findResult} />
        <hr className="hr"></hr>
        <Result search={this.state} />
      </div>
    );
  }
}
export default Reporting;
