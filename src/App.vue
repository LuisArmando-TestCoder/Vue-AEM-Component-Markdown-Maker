<template>
  <h1>Vue AEM Component Markdown Maker</h1>
  <MarkdownMaker/>
</template>

<script>
import MarkdownMaker from './components/MarkdownMaker.vue'

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

body {
  margin: 0;
}

h1 {
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
