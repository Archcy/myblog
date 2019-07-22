<template>
  <div id="app">
    <navbar :title="Blogtitle" />
    <template v-if="$route.matched.length"></template>
    <router-view></router-view>
    <foot />
  </div>
</template>

<script>
import navbar from "./components/nav.vue";
import foot from "./components/foot.vue";

export default {
  name: "app",
  components: {
    navbar,
    foot
  },
  data() {
    return {
      Blogtitle: "MyBlog", //Your blog title 
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
