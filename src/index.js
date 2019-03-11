import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./js/serviceWorker";
import TextField from "./js/textfield";
import ResistorDisplay from "./js/resistordisplay";
import ColorPicker from "./js/colorpicker";
import { EventEmitter } from "events";

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
  handleBandSelect(value) {
    this.setState({ currentBand: value });
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
          bandSelect={this.handleBandSelect}
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

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
