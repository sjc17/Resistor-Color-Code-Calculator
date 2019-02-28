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
    this.handleBandSelect = this.handleBandSelect.bind(this);
  }
  // Update when user inputs numbers or SI prefixes in text box
  textChangeCallback(textData) {
    this.setState({ resistance: textData });
  }
  // Update when user selects band count from dragdown box
  handleBandCountChange(event) {
    this.setState({ numOfBands: event.target.value, currentBand: 0 });
  }
  handleBandSelect(event) {
    this.setState({ currentBand: event.target.value });
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
          </select>
        </div>
        <ColorPicker
          onSelect={this.handleBandSelect}
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
  getMultiplier(number) {
    // Two digit bands
    if (this.props.numOfBands <= 4) {
      if (number >= Math.pow(10, 8)) return 7;
      else if (number >= Math.pow(10, 7)) return 6;
      else if (number >= Math.pow(10, 6)) return 5;
      else if (number >= Math.pow(10, 5)) return 4;
      else if (number >= Math.pow(10, 4)) return 3;
      else if (number >= Math.pow(10, 3)) return 2;
      else if (number >= Math.pow(10, 2)) return 1;
      else if (number >= Math.pow(10, 1)) return 0;
      else if (number >= 1) return 0.1;
      else if (number > 0) return 0.01;
      else return 0;
    }
    // Three digit bands
    else {
      if (number >= Math.pow(10, 9)) return 7;
      else if (number >= Math.pow(10, 8)) return 6;
      else if (number >= Math.pow(10, 7)) return 5;
      else if (number >= Math.pow(10, 6)) return 4;
      else if (number >= Math.pow(10, 5)) return 3;
      else if (number >= Math.pow(10, 4)) return 2;
      else if (number >= Math.pow(10, 3)) return 1;
      else if (number >= Math.pow(10, 2)) return 0;
      else if (number >= Math.pow(10, 1)) return 0.1;
      else if (number > 0) return 0.01;
      else return 0;
    }
  }
  getFirstDigit(number) {
    const multiplier = this.getMultiplier(number);
    let index;
    if (number === 0) return 0;
    if (this.props.numOfBands <= 4) {
      if (multiplier != 0.01) index = 0;
      else if (number >= 1) index = 0;
      else if (number > 0) index = 2;
      else return 0;
    } else {
      index = 0;
    }
    return parseInt(number.toString().substr(index, 1));
  }

  getSecondDigit(number) {
    const multiplier = this.getMultiplier(number);
    let index;
    // Two digit bands
    if (this.props.numOfBands <= 4) {
      if (multiplier != 0.1 && multiplier != 0.01) {
        if (number >= 100) index = 2;
        else index = 1;
      } else if (multiplier === 0.1) index = 2;
      else if (multiplier === 0.01) index = 3;
      else return 0;
    }
    // Three digit bands
    else {
      if (multiplier != 0.1 && multiplier != 0.01) {
        if (number >= 1000) index = 2;
        else index = 1;
      } else if (multiplier === 0.1) {
        index = 1;
      } else index = 2;
    }
    return parseInt(number.toString().substr(index, 1));
  }
  getThirdDigit(number) {
    const multiplier = this.getMultiplier(number);
    let index;
    // Three digit bands
    if (number >= 1000) index = 3;
    else if (multiplier != 0.1 && multiplier != 0.01) index = 2;
    else if (multiplier === 0.1) index = 3;
    else if (number > 0) index = 3;
    else return 0;
    return parseInt(number.toString().substr(index, 1));
  }
  render() {
    // Code to remove whitespace is repeated here to fix a bug with this component showing whitespace anyways
    const resistanceString = this.props.value.replace(/\s/g, "");
    let actualResistance = 0;
    if (resistanceString.match(validUserInputRegEx)) {
      actualResistance = parseFloat(
        parseSIPrefix(resistanceString).toFixed(2)
      ).toPrecision(this.props.numOfBands <= 4 ? 2 : 3);
      if (
        this.props.numOfBands >= 5 &&
        (actualResistance >= 0.01 && actualResistance <= 9990 * Math.pow(10, 6))
      ) {
      } else {
        //actualResistance = 0;
        //alert("Not valid number");
      }
    }
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
          <div
            className="band band1"
            style={bandColor(0, this.getFirstDigit(actualResistance))}
          />
          {/* Digit 2 */}
          <div
            className="band band2"
            style={bandColor(1, this.getSecondDigit(actualResistance))}
          />
          {/* Multiplier */}
          {this.props.numOfBands >= 3 ? (
            <div
              className="band band3"
              style={bandColor(2, this.getMultiplier(actualResistance))}
            />
          ) : null}
          {/* Tolerance */}
          {this.props.numOfBands >= 4 ? (
            <div className="band band4" style={bandColor(3, 5)} />
          ) : null}
          {/* Digit 3 */}
          {this.props.numOfBands >= 5 ? (
            <div
              className="band band5"
              style={bandColor(4, this.getThirdDigit(actualResistance))}
            />
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
      "Digit 1", // 0
      "Digit 2", // 1
      "Multiply By", // 2
      "Tolerance", // 3
      "Digit 3" // 4
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
          color = "black";
          break;
      }
      break;
    // Multiplier band colors
    case 2:
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
        case 0.1:
          color = "gold";
          break;
        case 0.01:
          color = "silver";
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
