import React, { Component } from "react";

const validUserInputRegEx = /^\d*\.?\d*[mkM]?$/; // Regex to check that input is a valid decimal number
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
export default TextField;
