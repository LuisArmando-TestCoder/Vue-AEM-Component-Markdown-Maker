const getTitleCase = (text) => {
  return text
    .split(/[A-Z]/g)
    .map(
      (sufix, index) =>
        (index ? text.split(/[a-z]/g).filter((x) => x)[index - 1] : "") +
        (sufix[0][index === 0 ? "toUpperCase" : "toLowerCase"]() +
          sufix.slice(1))
    ).join(" ");
};

export default getTitleCase;