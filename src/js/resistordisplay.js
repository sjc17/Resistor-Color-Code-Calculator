import React, { Component } from "react";
import RMath from "./resistancestringmath";

const validUserInputRegEx = /^\d*\.?\d*[mkM]?$/; // Regex to check that input is a valid decimal number
// Render resistor display and enable selecting bands
class ResistorDisplay extends Component {
  render() {
    // Code to remove whitespace is repeated here to fix a bug with this component showing whitespace anyways
    const resistanceString = this.props.value.replace(/\s/g, "");
    let actualResistance = 0;
    if (resistanceString.match(validUserInputRegEx)) {
      actualResistance = parseFloat(
        RMath.parseSIPrefix(resistanceString)
      ).toFixed(2);
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
                RMath.getDigit(actualResistance, this.props.numOfBands, 0)
              )
            }}
            onClick={() => {
              this.props.bandSelect(0);
            }}
          />
          {/* Digit 2 */}
          <div
            className="ResistorBand ResistorBand2"
            style={{
              backgroundColor: bandColor(
                1,
                RMath.getDigit(actualResistance, this.props.numOfBands, 1)
              )
            }}
            onClick={() => {
              this.props.bandSelect(1);
            }}
          />
          {/* Multiplier */}
          {this.props.numOfBands >= 3 ? (
            <div
              className="ResistorBand ResistorBand3"
              style={{
                backgroundColor: bandColor(
                  2,
                  RMath.getMultiplier(actualResistance, this.props.numOfBands)
                )
              }}
              onClick={() => {
                this.props.bandSelect(2);
              }}
            />
          ) : null}
          {/* Tolerance */}
          {this.props.numOfBands >= 4 ? (
            <div
              className="ResistorBand ResistorBand4"
              style={{ backgroundColor: bandColor(3, 5) }}
              onClick={() => {
                this.props.bandSelect(3);
              }}
            />
          ) : null}
          {/* Digit 3 */}
          {this.props.numOfBands >= 5 ? (
            <div
              className="ResistorBand ResistorBand5"
              style={{
                backgroundColor: bandColor(
                  4,
                  RMath.getDigit(actualResistance, this.props.numOfBands, 2)
                )
              }}
              onClick={() => {
                this.props.bandSelect(4);
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

export default ResistorDisplay;
