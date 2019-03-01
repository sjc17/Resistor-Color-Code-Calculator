import React, { Component } from "react";

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

export default ColorPicker;
