export const formatNumber = (number) => {
  if (number < 1e3) {
    return number.toString();
  } else if (number < 1e6) {
    return Math.floor(number / 1e2) / 10 + "k";
  } else if (number < 1e9) {
    return Math.floor(number / 1e5) / 10 + "m";
  } else {
    return Math.floor(number / 1e8) / 10 + "b";
  }
};
