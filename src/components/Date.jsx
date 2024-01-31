import React, { Component } from "react";

export default class DateTile extends Component {
  render() {
    return (
      <div
        className={this.props.active ? "date active" : "date"}
        onClick={() => this.props.dateSelected(this.props.fulldate)}
      >
        {this.props.date}
        <div className="day">{this.props.day}</div>
      </div>
    );
  }
}
