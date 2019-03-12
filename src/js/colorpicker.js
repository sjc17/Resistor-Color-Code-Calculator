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
        <div className="ColorPicker-BandsParent">
          {rainbowColorWheel(this.props.currentBand)}
        </div>
      </div>
    );
  }
}

export default ColorPicker;

// Returns array of JSX divs showing the color bands to click on
function rainbowColorWheel(band) {
  let array = []; // array to hold divs for each band
  let style = {}; // Object to hold CSS for each band

  let bandCount;
  // Tolerance band has 8 only
  if (band === 3) bandCount = 8;
  else bandCount = 10; // All other bands have 10

  for (let i = 0; i < bandCount; i++) {
    // White text for black band
    if (bandColor(band, i) === "black") {
      style = {
        backgroundColor: bandColor(band, i),
        marginTop: "0%",
        color: "white"
      };
    }
    // typical color band style
    else
      style = {
        backgroundColor: bandColor(band, i),
        marginTop: "0%"
      };
    array.push(
      <div style={style} className="ColorPicker-Band">
        {bandContent(band, i)}
      </div>
    );
  }
  return array;
}

// Get the color of the band you desire
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
        case 8:
          color = "gold";
          break;
        case 9:
          color = "silver";
          break;
        default:
          break;
      }
      break;
    // Tolerance band colors
    case 3:
      switch (value) {
        case 0:
          color = "silver";
          break;
        case 1:
          color = "gold";
          break;
        case 2:
          color = "brown";
          break;
        case 3:
          color = "red";
          break;
        case 4:
          color = "green";
          break;
        case 5:
          color = "blue";
          break;
        case 6:
          color = "violet";
          break;
        case 7:
          color = "grey";
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

// Get the text inside each band
function bandContent(bandNum, value) {
  let content = "";
  switch (bandNum) {
    case 0:
    case 1:
    case 4:
      // Digit band colors
      content = value.toString();
      break;
    // Multiplier band colors
    case 2:
      switch (value) {
        case 0:
          content = "1";
          break;
        case 1:
          content = "10";
          break;
        case 2:
          content = "100";
          break;
        case 3:
          content = "1k";
          break;
        case 4:
          content = "10k";
          break;
        case 5:
          content = "100k";
          break;
        case 6:
          content = "1M";
          break;
        case 7:
          content = "10M";
          break;
        case 8:
          content = "0.1";
          break;
        case 9:
          content = "0.01";
          break;
        default:
          content = value.toString();
          break;
      }
      break;
    // Tolerance band colors
    case 3:
      switch (value) {
        case 0:
          content = "10%";
          break;
        case 1:
          content = "5%";
          break;
        case 2:
          content = "1%";
          break;
        case 3:
          content = "2%";
          break;
        case 4:
          content = "0.5%";
          break;
        case 5:
          content = "0.25%";
          break;
        case 6:
          content = "0.1%";
          break;
        case 7:
          content = "0.05%";
          break;
        default:
          content = "error";
          break;
      }
      break;
    default:
      content = "error!";
      break;
  }
  return content;
}
