import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

const validUserInputRegEx = /^\d*\.?\d*[mkM]?$/; // Regex to check that input is a valid decimal number

// Whole app container
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resistance: "10", // resistance state will match text input box exactly
      numOfBands: 4,
      tolerance: 5,
      currentBand: 0
    };
    this.textChangeCallback = this.textChangeCallback.bind(this);
    this.handleBandCountChange = this.handleBandCountChange.bind(this);
  }
  // Update when user inputs numbers or SI prefixes in text box
  textChangeCallback(textData) {
    this.setState({ resistance: textData });
  }
  // Update when user selects band count from dragdown box
  handleBandCountChange(event) {
    this.setState({ numOfBands: event.target.value, currentBand: 0 });
  }
  render() {
    return (
      <div className="App">
        <h1 className="App-Title">React Resistor Color Code Calculator</h1>
        <TextField
          value={this.state.resistance}
          onTextChange={this.textChangeCallback}
        />
        <ResistorDisplay
          value={this.state.resistance}
          numOfBands={this.state.numOfBands}
          currentBand={this.state.currentBand}
          tolerance={this.state.tolerance}
        />
        <div className="BandCountSelector">
          <h2>Number of bands:</h2>
          <select onChange={this.handleBandCountChange}>
            <option>3</option>
            <option selected>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
        <ColorPicker
          currentBand={this.state.currentBand}
          value={this.state.resistance}
        />
      </div>
    );
  }
}

// Updates to show numerical resistance value with/without SI prefix
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
    const valueToString = this.props.value.replace(/\s/g, ""); // Eliminate whitespace

    // Output invalid input message if user types something wrong
    let invalidInputString;
    if (valueToString.match(validUserInputRegEx)) {
      invalidInputString = "";
    } else {
      invalidInputString = "Invalid Input";
    }
    return (
      <div className="TextField">
        <h2 className="TextField-Heading">Resistance</h2>
        <input
          className="TextField-Input"
          value={valueToString}
          onChange={this.handleChange}
        />{" "}
        &#8486;
        {invalidInputString}
      </div>
    );
  }
}

// Render resistor display and enable selecting bands
class ResistorDisplay extends Component {
  render() {
    // Code to remove whitespace is repeated here to fix a bug with this component showing whitespace anyways
    const resistanceString = this.props.value.replace(/\s/g, "");
    let actualResistance = parseSIPrefix(resistanceString);
    return (
      <div className="ResistorDisplayBox">
        <div className="DisplayResistanceValue">
          Resistance: {actualResistance}&#937; &#177;
          {this.props.tolerance}%
        </div>
        <div className="ResistorBody">
          <div className="wire wire-left" />
          <div className="wire wire-right" />
          {/* Digit 1 */}
          <div className="band band1" style={bandColor(0, 2)} />
          {/* Digit 2 */}
          <div className="band band2" style={bandColor(1, 0)} />
          {/* Multiplier */}
          {this.props.numOfBands >= 3 ? (
            <div className="band band3" style={bandColor(2, 0)} />
          ) : null}
          {/* Tolerance */}
          {this.props.numOfBands >= 4 ? (
            <div className="band band4" style={bandColor(3, 5)} />
          ) : null}
          {/* Digit 3 */}
          {this.props.numOfBands >= 5 ? (
            <div className="band band5" style={bandColor(4, 6)} />
          ) : null}
          {/* Temperature Coefficient */}
          {this.props.numOfBands >= 6 ? (
            <div className="band band6" style={bandColor(5, 100)} />
          ) : null}
        </div>
      </div>
    );
  }
}

// User choose resistor colors
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.bandString = [
      "Digit 1",
      "Digit 2",
      "Multiply By",
      "Tolerance",
      "Digit 3",
      "Temperature Coefficient (ppm/K)"
    ];
  }
  render() {
    return (
      <div className="ColorPicker">
        <div className="ColorPicker-Title">
          Selected Band:
          <br />
          {
            // Display current band selected
            this.bandString[this.props.currentBand]
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

function bandColor(bandNum, value) {
  let color = "";
  switch (bandNum) {
    case 0:
    case 1:
    case 2:
    case 4:
      // Digit band colors
      switch (value) {
        case 0:
          color = "black";
          break;
        case 1:
          color = "brown";
          break;
        case 2:
          color = "red";
          break;
        case 3:
          color = "orange";
          break;
        case 4:
          color = "yellow";
          break;
        case 5:
          color = "green";
          break;
        case 6:
          color = "blue";
          break;
        case 7:
          color = "violet";
          break;
        case 8:
          color = "grey";
          break;
        case 9:
          color = "white";
          break;
        default:
          break;
      }
      break;
    // Tolerance band colors
    case 3:
      switch (value) {
        case 10:
          color = "silver";
          break;
        case 5:
          color = "gold";
          break;
        case 1:
          color = "brown";
          break;
        case 2:
          color = "red";
          break;
        case 0.5:
          color = "green";
          break;
        case 0.25:
          color = "blue";
          break;
        case 0.1:
          color = "violet";
          break;
        default:
          break;
      }
      break;
    // Temperature coefficient
    case 5:
      switch (value) {
        case 100:
          color = "brown";
          break;
        case 50:
          color = "red";
          break;
        case 15:
          color = "orange";
          break;
        case 25:
          color = "yellow";
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return { backgroundColor: color };
}
function parseSIPrefix(resistanceString) {
  let actualResistance;
  if (resistanceString.match(validUserInputRegEx)) {
    switch (resistanceString.substr(-1)) {
      case "k":
        actualResistance = parseFloat(resistanceString.slice(0, -1)) * 1000;
        break;
      case "m":
        actualResistance = parseFloat(resistanceString.slice(0, -1)) / 1000;
        break;
      case "M":
        actualResistance = parseFloat(resistanceString.slice(0, -1)) * 1000000;
        break;
      default:
        actualResistance = parseFloat(resistanceString);
        break;
    }
  }
  return actualResistance;
}
