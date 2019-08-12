import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      string : "blank",
      number : 10,
    }
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
          <p>the number is {this.state.number}</p>
        </div>
      </div>
    );
  }
}

export default App;
