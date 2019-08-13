import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { KEY } from "./config/keys.js";
const URL = `https://api.openweathermap.org/data/2.5/forecast?zip=11218&APPID=`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      string: "",
      value: "",
      isLoading: true,
      city: "",
      date: [],
      temp: [],
      minTemp: [],
      maxTemp: [],
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(URL + KEY)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        let date = [];
        let temp = [];
        let minTemp = [];
        let maxTemp = [];
        data.list.forEach(element => {
          //console.log(element);
          // store date, and temp values
          date.push(element.dt_txt);
          temp.push(element.main.temp);
          minTemp.push(element.main.temp_min);
          maxTemp.push(element.main.temp_max);
        });
        /*
        console.log(date);
        console.log(temp);
        console.log(minTemp);
        console.log(maxTemp);
        //*/
        this.setState({
          city: data.city.name,
          date: date,
          temp: temp,
          minTemp: minTemp,
          maxTemp: maxTemp,
          isLoading: false
        });
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      string: this.state.value,
      value: ""
    });
    event.preventDefault();
  }

  render() {
    const isLoading = this.state.isLoading;

    return (
      <div class="p-0 mx-2 d-flex flex-column">
        <div class="jumbotron">
          <h1>Test Title</h1>
          <br />

          <p>Test paragraph</p>
        </div>

        <div class="jumbotron">
          <p>the string is {this.state.string}</p>
          <p>the value is {this.state.value}</p>
          <p>the city name is {this.state.city}</p>
        </div>

        <div class="jumbotron">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <h3>Dates</h3>
              <p>{this.state.date}</p>
              <h3>Temp</h3>
              <p>{this.state.temp}</p>
              <h3>minTemp</h3>
              <p>{this.state.minTemp}</p>
              <h3>maxTemp</h3>
              <p>{this.state.maxTemp}</p>
            </div>
          )}
        </div>

        <div class="jumbotron">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
