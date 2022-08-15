export const padTokenInput = (val: string, decimals: number = 0) => {
  if (decimals === 0) return val;
  let valSplit = val.split(".");
  // if right of decimal does exist, zero pad the bignumber.
  if (valSplit[1] !== undefined) {
    // why + 1? for join('0') calling new Array(2),join('0') will give one 0
    const zeroPads = decimals - valSplit[1].length + 1;
    if (zeroPads > 0) {
      valSplit[1] += new Array(zeroPads).join("0");
    } else {
      valSplit[1] = valSplit[1].substr(0, decimals);
    }
  } else {
    valSplit[1] = new Array(decimals + 1).join("0");
  }

  return valSplit.join("");
};

export default padTokenInput;
