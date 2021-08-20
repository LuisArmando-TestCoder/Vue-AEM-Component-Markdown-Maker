import {
  COMPONENT_NAME,
  REQUIRES,
  MAIN_CLASS,
  PROPERTIES_TABLE,
} from "./constants";

import {
  getLastRegularExpression,
  getAllRegularExpressionMatches,
} from "./regularExpressions";

import getPropertiesTable from "./getPropertiesTable";

const inputTriggers = new Map();

inputTriggers.set("Paste the code from the .vue component", {
  [COMPONENT_NAME]: ({ value }) =>
    getLastRegularExpression(/sass\/([a-z0-9_]+)/gim, value),
  [REQUIRES]: ({ value }) =>
    getAllRegularExpressionMatches(/\$([a-z]+)\./gim, value),
  [MAIN_CLASS]: ({ value }) =>
    getLastRegularExpression(/:?class="\[?\n?( +)?'?([a-z0-9]*)/gim, value),
});

inputTriggers.set("Paste the code from dialog .xml", {
  [PROPERTIES_TABLE]: getPropertiesTable,
});

export default inputTriggers;
