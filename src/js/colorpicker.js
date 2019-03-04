import React, { Component } from "react";

// User choose resistor colors
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.bandString = [
      "Digit 1", // 0
      "Digit 2", // 1
      "Multiplication Factor", // 2
      "Tolerance", // 3
      "Digit 3" // 4
    ];
  }
  render() {
    return (
      <div className="ColorPicker">
        <div className="ColorPicker-Title">
          Selected Band:
          {// Display current band selected
          " " + this.bandString[this.props.currentBand]}
        </div>
        <div className="ColorPicker-BandsParent">{rainbowColorWheel()}</div>
      </div>
    );
  }
}

export default ColorPicker;

function rainbowColorWheel() {
  let array = [];
  for (let i = 0; i < 10; i++) {
    array.push(
      <div
        style={{
          backgroundColor: bandColor(0, i),
          marginTop: "0%"
        }}
        className="ColorPickerBand"
      />
    );
  }
  return array;
}

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
  return color;
}
