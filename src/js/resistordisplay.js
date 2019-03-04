import React, { Component } from "react";

const validUserInputRegEx = /^\d*\.?\d*[mkM]?$/; // Regex to check that input is a valid decimal number

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
      if (multiplier !== 0.01) index = 0;
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
      if (multiplier !== 0.1 && multiplier !== 0.01) {
        if (number >= 100) index = 1;
        else index = 1;
      } else if (multiplier === 0.1) index = 2;
      else if (multiplier === 0.01) index = 3;
      else return 0;
    }
    // Three digit bands
    else {
      if (multiplier !== 0.1 && multiplier !== 0.01) {
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
    else if (multiplier !== 0.1 && multiplier !== 0.01) index = 2;
    else if (multiplier === 0.1) index = 3;
    else if (number >= 1) index = 3;
    else if (number > 0) index = 3;
    else return 0;
    return parseInt(number.toString().substr(index, 1));
  }
  render() {
    // Code to remove whitespace is repeated here to fix a bug with this component showing whitespace anyways
    const resistanceString = this.props.value.replace(/\s/g, "");
    let actualResistance = 0;
    if (resistanceString.match(validUserInputRegEx)) {
      actualResistance = parseFloat(parseSIPrefix(resistanceString)).toFixed(2);
      // Check that the resistance value is valid
      if (
        actualResistance >= 0.01 &&
        ((this.props.numOfBands <= 4 && actualResistance <= 990 * 1000000) ||
          (this.props.numOfBands >= 5 && actualResistance <= 9990 * 1000000))
      ) {
        // Do nothing
      } else {
        // Set invalid value to 0
        actualResistance = 0;
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
            className="ResistorBand ResistorBand1"
            style={{
              backgroundColor: bandColor(
                0,
                this.getFirstDigit(actualResistance)
              )
            }}
          />
          {/* Digit 2 */}
          <div
            className="ResistorBand ResistorBand2"
            style={{
              backgroundColor: bandColor(
                1,
                this.getSecondDigit(actualResistance)
              )
            }}
          />
          {/* Multiplier */}
          {this.props.numOfBands >= 3 ? (
            <div
              className="ResistorBand ResistorBand3"
              style={{
                backgroundColor: bandColor(
                  2,
                  this.getMultiplier(actualResistance)
                )
              }}
            />
          ) : null}
          {/* Tolerance */}
          {this.props.numOfBands >= 4 ? (
            <div
              className="ResistorBand ResistorBand4"
              style={{ backgroundColor: bandColor(3, 5) }}
            />
          ) : null}
          {/* Digit 3 */}
          {this.props.numOfBands >= 5 ? (
            <div
              className="ResistorBand ResistorBand5"
              style={{
                backgroundColor: bandColor(
                  4,
                  this.getThirdDigit(actualResistance)
                )
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
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

export default ResistorDisplay;
