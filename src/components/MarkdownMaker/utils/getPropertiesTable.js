import template from "./template";
import getTitleCase from "./getTitleCase";

const getPropertiesTable = ({ value }) => {
  try {
    const propertiesElements = [
      ...template(`<body>${value}</body>`).querySelectorAll(
        "items [name], items [fieldLabel]"
      ),
    ];

    return [
      ...new Set(propertiesElements)
    ].map((element) => {
      const fieldLabel = element.getAttribute("fieldLabel");
      const name = element.getAttribute("name")?.replace("./", "");
      const resourceTypeSplitPath = element.getAttribute(
        "sling:resourceType"
      ).split("/");

      return `| ${
        fieldLabel || (name && getTitleCase(name))
      } | ${name} | ${
        resourceTypeSplitPath[resourceTypeSplitPath.length - 1]
      } |`;
    })
    .join("\n");
  } catch {
    return "| N/D | N/D | N/D |";
  }
};

export default getPropertiesTable;