import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "",
      programmer: "",
      startdate: moment().format("MM-DD-YYYY"),
      enddate: moment().format("MM-DD-YYYY"),
      project_lists: [],
    };
  }
  componentDidMount() {
    axios
      .get("/tasks/projects/")
      .then((response) => {
        this.setState({ project_lists: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handlesDateChange = (date) => {
    this.setState({ startdate: moment(date).format("MM-DD-YYYY") });
  };
  handleeDateChange = (date) => {
    this.setState({ enddate: moment(date).format("MM-DD-YYYY") });
  };
  handleProgrammer = (event) => {
    this.setState({ programmer: event.target.value });
  };
  handleProject = (event, values) => {
    this.setState({ project: values });
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="From"
              label="From"
              format="dd-MM-yyyy"
              value={this.state.startdate}
              onChange={this.handlesDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="To"
              label="To"
              value={this.state.enddate}
              format="dd-MM-yyyy"
              onChange={this.handleeDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="col">
          <FormControl className="w-100">
            <InputLabel id="demo-simple-select-label">Programmer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.programmer}
              onChange={this.handleProgrammer}
            >
              <MenuItem value="Prachi">Prachi</MenuItem>
              <MenuItem value="Ketan">Ketan</MenuItem>
              <MenuItem value="Karishma">Karishma</MenuItem>
              <MenuItem value="Kaleem">Kaleem</MenuItem>
              <MenuItem value="Rahul">Rahul</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col">
          <Autocomplete
            id="combo-box-demo"
            options={this.state.project_lists}
            getOptionLabel={(option) => option}
            onInputChange={this.handleProject}
            renderInput={(params) => (
              <TextField {...params} label="Project" variant="standard" />
            )}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary w-100 m-2"
            onClick={() => this.props.onFind(this.state)}
          >
            Find
          </button>
        </div>
      </div>
    );
  }
}
export default Filter;
