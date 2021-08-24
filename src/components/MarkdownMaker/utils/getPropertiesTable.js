import template from './template';
import getTitleCase from './getTitleCase';

const getPropertyRow = ({
  fieldLabel,
  name,
  type
}) => {
  return `| ${
    fieldLabel || (name && getTitleCase(name))
  } | ${name} | ${
    type
  } |`;
}

const getBodyRow = body => ({
  selector,
  fieldLabel,
  name,
  type,
  disabled = () => false
}) => [
  ...body.querySelectorAll(selector)
].filter(element => !disabled(element)).map((element) =>
  getPropertyRow({
    fieldLabel: fieldLabel(element),
    name: name(element),
    type: type(element)
  })
);

const getBody = value => template(`
<body>${
  value
  .split('\n')
  .filter(line => !line.includes('<?'))
  .join('\n')
}</body>
`)

const getPropertiesTable = ({value}) => {
  try {
    const body = getBody(value);
    const properties = [];

    properties.push(
      ...getBodyRow(body)({
        selector: 'items [name], items [fieldLabel]',
        fieldLabel: element => element.getAttribute('fieldLabel'),
        name: element => element.getAttribute('name')?.replace('./', ''),
        type: element => {
          const fieldLabel = element.getAttribute('sling:resourceType').split('/')

          return fieldLabel[fieldLabel.length - 1]
        }
      })
    );

    properties.push(
      ...getBodyRow(body)({
        selector: 'items [ref]',
        fieldLabel: element => element.getAttribute('ref'),
        name: element => element.tagName,
        type: element => element.getAttribute('items').split(/[:,]/g).map(
          item => {
            const parts = item.split("#");

            return parts[parts.length - 1];
          }
        )
      })
    );

    properties.push(
      ...getBodyRow(body)({
        selector: 'items [features] > *:nth-child(1)',
        fieldLabel: element => element.parentElement.tagName.toLowerCase(),
        name: element => element.parentElement.tagName,
        type: element => [...element.children].map(
          child => child.tagName.toLowerCase()
        ),
        disabled: element => element.children.length === 0
      })
    );

    return properties.join('\n');
  } catch (error) {
    console.error(error);

    return '| N/D | N/D | N/D |';
  }
};

export default getPropertiesTable;