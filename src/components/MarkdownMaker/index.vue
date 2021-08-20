<template>
  <main @input="input">
    <div>
      <button @click="reset" ref="reset">Reset</button>
      <section>
        <label v-for="name of names" :key="name" :for="name">
          <code>{{name}}</code>
          <textarea :name="name" :id="name"></textarea>
        </label>
      </section>
    </div>
    <div>
      <button @click="copy">Copy to clipboard</button>
      <code> The resulting markdown </code>
      <textarea ref="markdown"></textarea>
    </div>
  </main>
</template>

<script>
import copyToClipboard from "./utils/copyToClipboard";
import getMarkdownRouter from "./utils/getMarkdownRouter";
import getMarkdown from "./utils/getMarkdown";
import inputTriggers from "./utils/inputTriggers";

export default {
  name: "MarkdownMaker",
  props: {
    msg: String,
  },
  data() {
    return {
      names: inputTriggers.keys()
    };
  },
  methods: {
    input() {
      const markdownRouter = getMarkdownRouter();

      this.$refs.markdown.value = getMarkdown(markdownRouter);
    },
    reset() {
      [...document.querySelectorAll("textarea")].forEach((textarea) => {
        textarea.value = "";
      });

      this.$refs.markdown.value = "";
    },
    copy() {
      copyToClipboard(this.$refs.markdown);
    },
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
  font-size: 1.5em;
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

button, textarea {
  background: var(--foregroud);
  color: var(--blue);
}

button {
  font-size: .7em;
  border: 0;
  padding: 10px 30px;
  cursor: pointer;
}

textarea {
  font-size: .8em;
  padding: 25px;
  width: 100%;
  min-height: 200px;
  height: 100%;
  background: transparent;
  border: 2px solid var(--gray);
  outline: none;
  transition: .15s;
}

textarea:focus {
  border-color: var(--blue);
}

code {
  display: block;
  padding: 25px 0 15px;
}
</style>
