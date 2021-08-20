<template>
  <h1>Vue AEM Component Markdown Maker</h1>
  <MarkdownMaker/>
  <aside>
    <a href="https://github.com/LuisArmando-TestCoder/Vue-AEM-Component-Markdown-Maker">
      GitHub repository
    </a>
  </aside>
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
  --background: #ffffff;
  --foregroud: #0e192c;
  --blue: #007fd4;
  --gray: #e9e9e9;
}

aside {
  padding: 50px;
  text-align: left;
}

body {
  margin: 0;
  background: var(--background);
}

h1 {
  text-align: center;
}

h1, aside {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--blue);
}

#app {
  color: var(--blue);
  margin-top: 60px;
}
</style>
