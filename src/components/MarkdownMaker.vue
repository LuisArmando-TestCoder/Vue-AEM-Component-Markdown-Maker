<template>
  <main>
    <div>
      <button id="reset">Reset</button>
      <section></section>
    </div>
    <div>
      <button id="copy">Copy to clipboard</button>
      <code> The resulting markdown </code>
      <textarea id="markdown"></textarea>
    </div>
  </main>
</template>

<script>
export default {
  name: "MarkdownMaker",
  props: {
    msg: String,
  },
  mounted() {
    const template = (string, reject = { styles: true, scripts: true }) => {
      const fakeParent = document.createElement("div");
      let childClone;
      let styles;
      let scripts;

      fakeParent.innerHTML = string;
      childClone = fakeParent.children[0];

      styles = [...childClone.querySelectorAll("style")];
      scripts = [...childClone.querySelectorAll("script")];

      if (reject.styles) styles.forEach((element) => element.remove());
      if (reject.scripts) scripts.forEach((element) => element.remove());

      fakeParent.remove();

      return childClone;
    };

    const getTitleCase = (text) => {
      return text
        .split(/[A-Z]/g)
        .map(
          (sufix, index) =>
            (index ? text.split(/[a-z]/g).filter((x) => x)[index - 1] : "") +
            (sufix[0][index === 0 ? "toUpperCase" : "toLowerCase"]() +
              sufix.slice(1))
        )
        .join(" ");
    };

    const copyToClipboard = (element) => {
      element.select();

      document.execCommand("copy");

      element.blur();
    };

    const COMPONENT_NAME = "Component name";
    const REQUIRES = "Requires from script";
    const MAIN_CLASS = "Main Class";
    const PROPERTIES_TABLE = "Properties from dialog";
    const inputTriggers = new Map();

    inputTriggers.set("Paste the code from the .vue component", {
      [COMPONENT_NAME]: ({ value }) => {
        const regularExpression = /sass\/([a-z0-9_]+)/gim;

        const result = regularExpression.exec(value);

        return result?.[result?.length - 1];
      },
      [REQUIRES]: ({ value }) => {
        const regularExpression = /\$([a-z]+)\./gim;

        const result = regularExpression.exec(value);

        return result?.[result?.length - 1];
      },
      [MAIN_CLASS]: ({ value }) => {
        const regularExpression = /:?class="\[?\n?( +)?'?([a-z0-9]*)/gim;

        const result = regularExpression.exec(value);

        return result?.[result?.length - 1];
      },
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

    [...inputTriggers.keys()].forEach((name) => {
      document.querySelector("section").appendChild(
        template(`
        <label for="${name}">
          <code>${name}</code>
          <textarea name="${name}" id="${name}"></textarea>
        </label>
      `)
      );
    });

    const resetButton = document.getElementById("reset");
    const copyButton = document.getElementById("copy");
    const markdown = document.getElementById("markdown");
    const getTextAreas = () => [...document.querySelectorAll("textarea")];

    copyButton.addEventListener("click", () => {
      copyToClipboard(markdown);
    });

    resetButton.addEventListener("click", () => {
      getTextAreas().forEach((textarea) => {
        textarea.value = "";
      });

      markdown.value = "";
    });

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

    document.body.addEventListener("input", () => {
      const triggersObject = {};

      [...inputTriggers.keys()].forEach((inputSection) => {
        Object.keys(inputTriggers.get(inputSection)).forEach((key) => {
          triggersObject[key] = inputTriggers
            .get(inputSection)[key](
              document.getElementById(inputSection)
            );
        });
      });

      markdown.value = getMarkdown(triggersObject);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 50px;
  padding: 50px;
}

h1 {
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  border: 0;
  padding: 10px 30px;
  cursor: pointer;
}

button:hover {
  background: #000;
  color: #fff;
}

textarea {
  width: 100%;
  min-height: 200px;
  height: 100%;
}

code {
  display: block;
  padding: 25px 0 15px;
}
</style>
