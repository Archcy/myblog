<template>
  <div id="app">
    <index
      v-if="!this.$route.query.pid"
      :UserName="UserName"
      :ProjectName="ProjectName"
      :Blogs_per_Page="Blogs_per_Page"
      :Blogs_per_Day="Blogs_per_Day"
    />
    <mdreader v-if="this.$route.query.pid" :UserName="UserName" :ProjectName="ProjectName" />
  </div>
</template>

<script>
import index from "./components/index.vue";
import mdreader from "./components/article.vue";

export default {
  name: "app",
  components: {
    index,
    mdreader
  },
  data() {
    return {
      Blogtitle: "Archcy's Blog", //Your blog title
      UserName: "Archcy", // Your Github UserName
      ProjectName: "Archcy.github.io", // Your Project Name
      Blogs_per_Page: 4, //default is 4
      Blogs_per_Day: 100 //default is 100
    };
  }
};
</script>
<style src="./css/github-markdow.css">
</style>

<style>
:root {
  --head_color: #24292e;
  --main_color: #24292e;
  --second_color: #f5f5f5;
  --foot-color: #000;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #202124;
  overflow: hidden;
  width: 100%;
  min-height: 1080px;
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
