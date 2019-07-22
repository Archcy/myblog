<template>
  <div id="head">
    <div id="navbar">
      {{title}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  mounted(){
    if((navigator.userAgent.match(/(phone|iPhone|iPod|ios|Android|Mobile|BrowserNG|WebOS|Symbian|Windows Phone)/i)))
    {
      document.getElementById("navbar").style.width = "60%";
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#head {
  background-color: var(--main_color);
  width: 100%;
  height: 14rem;
  margin: 0 auto;
  position: absolute 0 0;
}
#navbar {
  margin: 0 auto;
  position: relative;
  top: 2rem;
  background-color: #fff;
  width: 400px;
  height: 3rem;
  font-size: 2rem;
  border-radius: 3rem;
  padding-top: 1rem;
  text-align: center;
  opacity: 0.9;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>

