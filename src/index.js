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
      resistance: 10,
      numOfBands: 4,
      tolerance: 5,
      currentBand: 0
    };
    this.textChangeCallback = this.textChangeCallback.bind(this);
    this.handleBandCountChange = this.handleBandCountChange.bind(this);
  }
  // Update when user inputs numbers in text box
  textChangeCallback(textData) {
    this.setState({ resistance: textData });
  }
  // Update when user selects band count from dragdown box
  handleBandCountChange(event) {
    this.setState({ numOfBands: event.target.value });
  }
  render() {
    return (
      <div>
        <h1>React Resistor Color Code Calculator</h1>
        <TextField
          value={this.state.resistance}
          onTextChange={this.textChangeCallback}
        />
        <ResistorDisplay
          value={this.state.resistance}
          numOfBands={this.state.numOfBands}
          currentBand={this.state.currentBand}
        />
        Number of bands:
        <select onChange={this.handleBandCountChange}>
          <option>3</option>
          <option selected>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <ColorPicker />
      </div>
    );
  }
}

// Updates to show numerical resistance value
// User input automatically updates
class TextField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTextChange(e.target.value);
  }
  render() {
    return (
      <div>
        <h2>Resistance</h2>
        <input value={this.props.value} onChange={this.handleChange} />
      </div>
    );
  }
}

// Render resistor display and enable selecting bands
class ResistorDisplay extends Component {
  render() {
    return (
      <div style={{ border: "solid black 3px" }}>
        Resistance: {this.props.value}
        <br />
        Band: {this.props.currentBand + 1}/{this.props.numOfBands}
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
