const validUserInputRegEx = /^\d*\.?\d*[mkM]?$/; // Regex to check that input is a valid decimal number

const funcs = {
  getMultiplier(number, bandCount) {
    // Two digit bands
    if (bandCount <= 4) {
      if (number >= Math.pow(10, 8)) return 7;
      else if (number >= Math.pow(10, 7)) return 6;
      else if (number >= Math.pow(10, 6)) return 5;
      else if (number >= Math.pow(10, 5)) return 4;
      else if (number >= Math.pow(10, 4)) return 3;
      else if (number >= Math.pow(10, 3)) return 2;
      else if (number >= Math.pow(10, 2)) return 1;
      else if (number >= Math.pow(10, 1)) return 0;
      else if (number >= 1) return -1;
      else if (number > 0) return -2;
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
      else if (number >= Math.pow(10, 1)) return -1;
      else if (number > 0) return -2;
      else return 0;
    }
  },

  getDigit(number, bandCount, digit) {
    let index;
    switch (digit) {
      case 0:
        index = this.getFirstDigitIndex(number, bandCount);
        break;
      case 1:
        index = this.getSecondDigitIndex(number, bandCount);
        break;
      case 2:
        index = this.getThirdDigitIndex(number, bandCount);
        break;
      default:
        index = 0;
        break;
    }
    return parseInt(number.toString().substr(index, 1));
  },

  getFirstDigitIndex(number, bandCount) {
    const multiplier = this.getMultiplier(number, bandCount);
    let index;
    if (number === 0) return 0;
    if (bandCount <= 4) {
      if (multiplier !== -2 || number >= 1) index = 0;
      else if (number > 0) index = 2;
      else return 0;
    } else {
      index = 0;
    }
    return index;
  },

  getSecondDigitIndex(number, bandCount) {
    const multiplier = this.getMultiplier(number, bandCount);
    let index;
    // Two digit bands
    if (bandCount <= 4) {
      if (multiplier !== -1 && multiplier !== -2) {
        index = 1;
      } else if (multiplier === 0.1) index = 2;
      else if (multiplier === 0.01) index = 3;
      else return 0;
    }
    // Three digit bands
    else {
      if (multiplier !== -2) {
        index = 1;
      } else index = 2;
    }
    return index;
  },

  getThirdDigitIndex(number, bandCount) {
    const multiplier = this.getMultiplier(number, bandCount);
    let index;
    // Three digit bands
    if (multiplier !== -1 && multiplier !== -2) index = 2;
    else if (number > 0) index = 3;
    else return 0;
    return index;
  },

  parseSIPrefix(resistanceString) {
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
          actualResistance =
            parseFloat(resistanceString.slice(0, -1)) * 1000000;
          break;
        default:
          actualResistance = parseFloat(resistanceString);
          break;
      }
    }
    return actualResistance;
  },

  replaceDigit(numberString, bandCount, index, newDigit) {
    // parse SI prefix and round to 2 decimal places
    const actualNumberString = parseFloat(this.parseSIPrefix(numberString))
      .toFixed(2)
      .toString();
    console.log(actualNumberString);
    let finalIndex;

    switch (index) {
      case 0:
        finalIndex = this.getFirstDigitIndex(actualNumberString, bandCount);
        break;
      case 1:
        finalIndex = this.getSecondDigitIndex(actualNumberString, bandCount);
        break;
      case 4:
        finalIndex = this.getThirdDigitIndex(actualNumberString, bandCount);
        break;
      default:
        break;
    }
    const replacedDigitString =
      actualNumberString.substr(0, finalIndex) +
      newDigit.toString() +
      actualNumberString.substr(
        finalIndex + 1,
        finalIndex + actualNumberString.length
      );
    return replacedDigitString;
  }
};
export default funcs;
