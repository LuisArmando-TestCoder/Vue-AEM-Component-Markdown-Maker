<template>
  <h1>Vue AEM Component Markdown Maker</h1>
  <MarkdownMaker/>
</template>

<script>
import MarkdownMaker from './components/MarkdownMaker/index.vue'

export default {
  name: 'App',
  components: {
    MarkdownMaker
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

:root {
  --background: #f5f5f5;
  --foregroud: #0e192c;
  --blue: #007fd4;
  --gray: #e9e9e9;
}

body {
  margin: 0;
  background: var(--background);
}

h1 {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  color: var(--blue);
  margin-top: 60px;
}
</style>
