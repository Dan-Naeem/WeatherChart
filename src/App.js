import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { KEY } from "./config/keys.js";
const URL = `https://api.openweathermap.org/data/2.5/forecast?zip=11218&APPID=`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      string : "",
      value: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({
      string: this.state.value,
      value: '',
    });
    event.preventDefault();
  }

  render() {
    return (
      <div class="p-0 mx-2 d-flex flex-column">
        
        <div class="jumbotron">
          <h1>
            Test Title
          </h1>
          <br />

          <p>
            Test paragraph
          </p>
        </div>

        <div class="jumbotron">
          <p>the string is {this.state.string}</p>
          <p>the value is {this.state.value}</p>
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
            <input 
              type="submit" 
              value="Submit" 
            />
          </form>
        </div>

      </div>
    );
  }
}

export default App;
