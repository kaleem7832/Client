import React, { Component } from "react";
import Calendar from "./Calendar";
import DataView from "./dataView";
import moment from "moment";

class TaskTracker extends Component {
  constructor() {
    super();
    this.state = {
      cdate: "",
    };
  }
  componentDidMount() {
    let today = moment().format("DD-MM-YYYY");
    this.setState({ cdate: today });
  }
  dateSelected = (date) => {
    console.log(date);
    this.setState({ cdate: date });
  };
  render() {
    return (
      <div className="container">
        <Calendar onDateSelect={this.dateSelected} cdate={this.state.cdate} />
        <DataView title={this.state.cdate} />
      </div>
    );
  }
}

export default TaskTracker;
