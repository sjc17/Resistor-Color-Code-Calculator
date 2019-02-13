import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Whole app container
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resistance: 1000,
      numOfBands: 4,
      tolerance: 5,
      currentBand: 0
    };
  }
  textUpdateCallBack(data) {
    this.setState({
      resistance: data
    });
  }
  render() {
    return (
      <div>
        <h1>React Resistor Color Code Calculator</h1>
        <TextField />
        <ResistorDisplay />
        <div>
          <BandCountInput />
          <ColorPicker />
        </div>
      </div>
    );
  }
}

// Updates to show numerical resistance value
class TextField extends Component {
  render() {
    return (
      <div>
        <h2>Resistance</h2>
        <input />
      </div>
    );
  }
}

// Render resistor display and enable selecting bands
class ResistorDisplay extends Component {
  render() {
    return <div>Display resistor here with interactivity</div>;
  }
}

class BandCountInput extends Component {
  render() {
    return (
      <div>
        Number of bands:
        <select name="bandCount">
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    );
  }
}

// User choose resistor colors
class ColorPicker extends Component {
  render() {
    return <div>Pick colors here</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
