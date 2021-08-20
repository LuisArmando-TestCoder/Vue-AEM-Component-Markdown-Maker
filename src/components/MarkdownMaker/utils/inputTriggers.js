import {
  COMPONENT_NAME,
  REQUIRES,
  MAIN_CLASS,
  PROPERTIES_TABLE,
} from "./constants";
import template from "./template";
import getTitleCase from "./getTitleCase";

const inputTriggers = new Map();

const getLastRegularExpression = (regularExpression, value) => {
  const result = regularExpression.exec(value);

  return result?.[result?.length - 1];
};

const getAllRegularExpressionMatches = (regularExpression, value) => {
  const matches = [];

  for (
    let lastMatch = {};
    lastMatch;
    lastMatch = getLastRegularExpression(regularExpression, value)
  )
    if (typeof lastMatch === "string") matches.push(lastMatch);

  return [...new Set(matches)];
};

inputTriggers.set("Paste the code from the .vue component", {
  [COMPONENT_NAME]: ({ value }) =>
    getLastRegularExpression(/sass\/([a-z0-9_]+)/gim, value),
  [REQUIRES]: ({ value }) => {
    return getAllRegularExpressionMatches(/\$([a-z]+)\./gim, value);
  },
  [MAIN_CLASS]: ({ value }) =>
    getLastRegularExpression(/:?class="\[?\n?( +)?'?([a-z0-9]*)/gim, value),
});

inputTriggers.set("Paste the code from dialog .xml", {
  [PROPERTIES_TABLE]: ({ value }) => {
    try {
      const propertiesElements = [
        ...template(value).querySelectorAll("items [name]"),
      ];

      return propertiesElements
        .map((element) => {
          const fieldLabel = element.getAttribute("fieldLabel");
          const name = element.getAttribute("name")?.replace("./", "");
          const resourceTypeSplitPath = element
            .getAttribute("sling:resourceType")
            .split("/");

          return `| ${fieldLabel || getTitleCase(name)} | ${name} | ${
            resourceTypeSplitPath[resourceTypeSplitPath.length - 1]
          } |`;
        })
        .join("\n");
    } catch {
      return "| N/D | N/D | N/D |";
    }
  },
});

export default inputTriggers;
