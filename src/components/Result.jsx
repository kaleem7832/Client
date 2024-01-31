import React, { Component } from "react";
import TableToExcel from "@linways/table-to-excel";
import axios from "axios";
import moment from "moment";
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      name: "one",
    };
  }
  componentWillReceiveProps(props) {
    // properties changed
    let name = [];
    name.push(props.search.programmer);
    name.push(props.search.project);
    name.push(props.search.startdate.slice(0, 5));
    name.push(props.search.enddate.slice(0, 5));
    let fname = name.filter(function (item) {
      if (item) return item;
    });
    this.setState({ name: fname.join("_") });
    axios
      .get("/tasks/filter/", {
        params: {
          programmer: props.search.programmer,
          project: props.search.project,
          startdate: props.search.startdate,
          enddate: props.search.enddate,
        },
      })
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  excelExport = () => {
    let name = "TaskTacker_" + this.state.tasks[0].date;
    TableToExcel.convert(document.getElementById("result"), {
      name: this.state.name + ".xlsx",
      sheet: {
        name: "Sheet 1",
      },
    });
  };

  render() {
    return (
      <React.Fragment>
        <button
          className={
            this.state.tasks.length > 0
              ? "btn btn-primary bottom-right"
              : "hide"
          }
          onClick={this.excelExport}
        >
          Excel Export
        </button>
        <table className="table" id="result">
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Programmer</th>
              <th>Task</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task) => (
              <tr>
                <td>{task.date}</td>
                <td>{task.project}</td>
                <td>{task.programmer}</td>
                <td>{task.task}</td>
                <td>{moment(task.starttime).format("LT")}</td>
                <td>
                  {task.endtime ? moment(task.endtime).format("LT") : "-"}
                </td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default Result;
