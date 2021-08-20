export const getLastRegularExpression = (regularExpression, value) => {
  const result = regularExpression.exec(value);

  return result?.[result?.length - 1];
};

export const getAllRegularExpressionMatches = (regularExpression, value) => {
  const matches = [];

  for (
    let lastMatch = {};
    lastMatch;
    lastMatch = getLastRegularExpression(regularExpression, value)
  ) if (typeof lastMatch === "string") {
    matches.push(lastMatch);
  }

  return [...new Set(matches)];
};
  