import React, { Component } from "react";
import DateTile from "./Date";
import moment from "moment";

export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cdate: "",
      selectedDate: "",
      monday: "",
      week_dates: [],
      dates: [],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      daysarr: [],
    };
  }
  componentDidMount() {
    let today = new Date().toISOString().slice(0, 10);
    let curr = new Date();
    let week = [];
    let dates = [];
    function setToMonday(date) {
      var day = date.getDay() || 7;
      if (day !== 1) date.setHours(-24 * (day - 1));
      return date;
    }

    let monday = setToMonday(new Date());

    for (let i = 0; i <= 6; i++) {
      dates.push(
        moment(monday, "DD-MM-YYYY").add(i, "days").format("DD-MM-YYYY")
      );
    }
    dates.map((date) => {
      week.push(date.slice(0, 2));
    });

    this.setState({ week_dates: week, dates: dates, cdate: today });
  }
  getWeekdates = (direction) => {
    let week = [];
    let weeks = [];
    if (direction == 1) {
      let date = this.state.dates[6];
      for (let i = 1; i <= 7; i++) {
        week.push(
          moment(date, "DD-MM-YYYY").add(i, "days").format("DD-MM-YYYY")
        );
      }
    }
    if (direction == 0) {
      let date = this.state.dates[0];
      for (let i = 7; i >= 1; i--) {
        week.push(
          moment(date, "DD-MM-YYYY").subtract(i, "days").format("DD-MM-YYYY")
        );
      }
    }
    week.map((date) => {
      weeks.push(date.slice(0, 2));
    });
    this.setState({ dates: week, week_dates: weeks });
  };

  render() {
    return (
      <React.Fragment>
        <div className="calendar">
          <div className="week-date">{this.state.dates[0]}</div>
          <div className="week-date">{this.state.dates[6]}</div>
        </div>
        <div className="calendar">
          <div className="prev arrow" onClick={() => this.getWeekdates(0)}>
            &#8592;
          </div>
          {this.state.dates.map((date, i) => (
            <DateTile
              key={date}
              date={this.state.week_dates[i]}
              fulldate={date}
              active={this.props.cdate === date}
              day={this.state.days[i]}
              dateSelected={this.props.onDateSelect}
            />
          ))}
          <div className="next arrow" onClick={() => this.getWeekdates(1)}>
            &#8594;
          </div>
        </div>
      </React.Fragment>
    );
  }
}
