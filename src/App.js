import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { KEY } from "./config/keys.js";
import Graph from './Graph.js';

const URL1 = `https://api.openweathermap.org/data/2.5/forecast?zip=`;
const URL2 = `&APPID=`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      string: "",
      value: "",
      isLoading: true,
      city: "",
      zipcode: 11218,
      date: [],
      temp: [],
      Alaska: [],
      Arizona: [],
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(URL1 + this.state.zipcode + URL2 + KEY)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        let date = [];
        let temp = [];
        data.list.forEach(element => {
          // store date, and temp values
          date.push(element.dt_txt);
          temp.push(element.main.temp);
        });
        this.setState({
          city: data.city.name,
          date: date,
          temp: temp,
          Alaska: temp,
          Arizona: temp,
          isLoading: false
        });
        console.log('end fetch');
        this.grab_weather();
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  grab_weather() {
    console.log('entered grab weather');
    // zip codes
    const FAIRBANKS_ALASKA_ZIP = '99703';
    const TUCSON_ARIZONA_ZIP = '85641';
    // get weather data for Alaska
    fetch(URL1 + FAIRBANKS_ALASKA_ZIP + URL2 + KEY)
    .then(data => data.json())
    .then(data => {
      console.log('alaska');
      let Alaska = [];
      data.list.forEach(element => {
        // store date, and temp values
        Alaska.push(element.main.temp);
      });
      this.setState({
        Alaska: Alaska,
      });
    })
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }));
    // get weather data for Arizona
    fetch(URL1 + TUCSON_ARIZONA_ZIP + URL2 + KEY)
    .then(data => data.json())
    .then(data => {
      console.log('arizona');
      let Arizona = [];
      data.list.forEach(element => {
        // store date, and temp values
        Arizona.push(element.main.temp);
      });
      this.setState({
        Arizona: Arizona,
      });
    })
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // remove error
    this.setState({
      error: null,
    });
    // capture current
    let value = this.state.value;
    // check if valid
    if (value.length !== 5) {
      this.setState({
        error: 'Please enter a valid zipcode',
        value: "",
      });
    }
    // else valid
    else {
      this.setState({
        zipcode: value,
        value: ""
      });
    }
    event.preventDefault();
  }

  render() {
    const error = this.state.error;
    const isLoading = this.state.isLoading;
    const temp = this.state.temp;
    const Alaska = this.state.Alaska;
    const Arizona = this.state.Arizona;

    return (
      <div class="p-0 mx-2 d-flex flex-column">
        <div class="jumbotron">
          <h1>Test Title</h1>
          <br />

          <p>Test paragraph</p>
        </div>

        <div class="jumbotron d-flex">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="number"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        {error ? (<h1>{error}</h1>) : null}

        <div class="jumbotron bg-white">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <h1>{this.state.city}</h1>
              <h3>{this.state.zipcode}</h3>
              <Graph 
                temp={temp}
                Alaska={Alaska}
                Arizona={Arizona}
              />
            </div>
          )}
        </div>

        <div class="jumbotron">
        </div>
      </div>
    );
  }
}

export default App;
