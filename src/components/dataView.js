import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import axios from "axios";
//snackbar for adding task
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class DataView extends Component {
  constructor(props) {
    super(props);

    var columns = [
      {
        title: "Project",
        field: "project",
      },
      {
        title: "Programmer",
        field: "programmer",
        lookup: {
          Prachi: "Prachi",
          Ketan: "Ketan",
          Karishma: "Karishma",
          Kaleem: "Kaleem",
          Rahul: "Rahul",
        },
      },
      {
        title: "Task",
        field: "task",
      },
      {
        title: "Start Time",
        field: "starttime",
        type: "time",
      },
      { title: "End Time", field: "endtime", type: "time" },
      {
        title: "Status",
        field: "status",
        lookup: {
          "in-process": "In Process",
          "on-hold": "On Hold",
          completed: "Completed",
        },
      },
    ];
    this.state = {
      success: false,
      deletesuccess: false,
      updatesuccess: false,
      failure: false,
      tasks: [],
      columns: columns,
      cdate: this.props.title,
    };
  }

  componentWillReceiveProps(props) {
    // properties changed
    axios
      .get("/tasks/history/" + props.title)
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <hr />
        <MaterialTable
          columns={this.state.columns}
          options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
          data={this.state.tasks}
          title={this.props.title}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                console.log("new data", newData);
                newData = { ...newData, date: this.props.title };

                axios
                  .post("/tasks/add", newData)
                  .then((res) =>
                    axios
                      .get("/tasks/history/" + this.props.title)
                      .then((response) => {
                        this.setState({ success: true });
                        setTimeout(() => {
                          this.setState({ success: false });
                        }, 5000);
                        this.setState({ tasks: response.data });
                      })
                      .catch(function (error) {
                        console.log("failure", error);
                      })
                  )
                  .catch((error) => {
                    this.setState({ failure: true });
                    setTimeout(() => {
                      this.setState({ failure: false });
                    }, 5000);
                  });

                resolve();
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                if (oldData) {
                  axios
                    .post("/tasks/update/" + oldData._id, newData)
                    .then((res) =>
                      axios
                        .get("/tasks/history/" + this.props.title)
                        .then((response) => {
                          this.setState({ updatesuccess: true });
                          setTimeout(() => {
                            this.setState({ updatesuccess: false });
                          }, 5000);
                          this.setState({ tasks: response.data });
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                    );
                  resolve();
                }
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                //handle here
                axios
                  .get("/tasks/delete/" + oldData._id)
                  .then((res) =>
                    axios
                      .get("/tasks/history/" + this.props.title)
                      .then((response) => {
                        this.setState({ tasks: response.data });
                        this.setState({ deletesuccess: true });
                        setTimeout(() => {
                          this.setState({ deletesuccess: false });
                        }, 5000);
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                  )
                  .catch((err) => console.log(err));
                resolve();
              }),
          }}
        />
        <Snackbar
          open={this.state.success}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="success" className="alert alert-primary">
            Task added successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.deletesuccess}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="success" className="alert alert-primary">
            Task deleted successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.updatesuccess}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="success" className="alert alert-primary">
            Task updated successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.failure}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error" className="alert alert-danger">
            Please provide all the details.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default DataView;
