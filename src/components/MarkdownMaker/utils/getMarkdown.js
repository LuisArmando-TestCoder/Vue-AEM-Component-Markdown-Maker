import {
    COMPONENT_NAME,
    REQUIRES,
    MAIN_CLASS,
    PROPERTIES_TABLE,
} from './constants';

const getMarkdown = (triggersObject) =>
`
# ${triggersObject[COMPONENT_NAME]}

Reference [http://confluence.clynch.com/display/FR/${triggersObject[COMPONENT_NAME]}](
http://confluence.clynch.com/display/FR/${triggersObject[COMPONENT_NAME]}
)

## Functionality

> **Exports:** ${triggersObject[COMPONENT_NAME]} \\
> **Requires:** {${triggersObject[REQUIRES]}} \\
> **Hivejs Identifier:** ${triggersObject[COMPONENT_NAME]}

## CSS

Main class: \`.${triggersObject[MAIN_CLASS]}\`

## Dialog Dictionary

**Properties table:**
| Label | Name | Resource Type |
| :--- | ---: | ---: |
${triggersObject[PROPERTIES_TABLE]}
`.trim();

export default getMarkdown;