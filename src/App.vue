<template>
  <div id="app">
    <navbar :title="Blogtitle" />
    <index
      v-if="!this.$route.query.pid"
      :UserName="UserName"
      :ProjectName="ProjectName"
      :Blogs_per_Page="Blogs_per_Page"
      :Blogs_per_Day="Blogs_per_Day"
    />
    <mdreader v-if="this.$route.query.pid" :UserName="UserName" :ProjectName="ProjectName" />
    <foot />
  </div>
</template>

<script>
import navbar from "./components/nav.vue";
import foot from "./components/foot.vue";
import index from "./components/index.vue";
import mdreader from "./components/article.vue";

export default {
  name: "app",
  components: {
    navbar,
    foot,
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
  --main_color: #24292e;
  --second_color: #f5f5f5;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #202124;
  width: 100%;
}
</style>
