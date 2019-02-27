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

    // Valid input
    if (resistanceString.match(validUserInputRegEx)) {
    }
    return (
      <div className="ResistorDisplayBox">
        <div className="DisplayResistanceValue">
          Resistance: {resistanceString}&#937; &#177;
          {this.props.tolerance}%
        </div>
        <div className="ResistorBody">
          <div className="wire wire-left" />
          <div className="wire wire-right" />
          <div className="band1" />
          <div className="band2" />
          {this.props.numOfBands >= 3 ? <div className="band3" /> : null}
          {this.props.numOfBands >= 4 ? <div className="band4" /> : null}
          {this.props.numOfBands >= 5 ? <div className="band5" /> : null}
          {this.props.numOfBands >= 6 ? <div className="band6" /> : null}
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
          Selected Band:{" "}
          {
            // Display current band selected
            this.bandString[this.props.currentBand]
          }
        </div>
      </div>
    );
  }
}

class ResistorBody extends Component {
  render() {
    switch (this.props.numOfBands) {
      case 3:
        return <div />;
      case 4:
        return (
          <div className="ResistorBody">
            <div className="band1" />
            <div className="band2" />
            <div className="band3" />
            <div className="band4" />
          </div>
        );
      case 5:
        return <div />;
      case 6:
        return <div />;
      default:
        return <div>Number of bands invalid</div>;
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
