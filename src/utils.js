export const capitalizeLetter = (word) => {
  if (!word) return '';

  return word
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const formatIdxNum = (idx) => {
  const arr = [idx].toString().split('');

  for (let i =0; i < 5; i++) {
    if (arr.length > 4) {
      break;
    } else if (arr.length < 4) {
      arr.unshift('0')
    }
  }

  return arr
}

export const formatUnit = (unit) => {
  return (unit * 0.1).toFixed(1);
}

export const formatFeet = (h) => {
  const meters = (h * 0.1).toFixed(1);
  const totalInches = meters * 39.37;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return { feet, inches };
}

export const formatPounds = (w) => {
  const kilogram = (w * 0.1).toFixed(1);

  return (kilogram * 2.2).toFixed(1);
}

