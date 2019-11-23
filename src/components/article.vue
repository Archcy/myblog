<template>
  <div id="reader">
    <div id="title">{{this.$route.query.pid }}</div>
    <div id="content">
      <div class="markdown-body" v-html="inner"></div>
      <button id="goback" @click="goback()"><</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import showdown from "showdown";

export default {
  props: {
    UserName: {
      type: String,
      required: true
    },
    ProjectName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      urlhead: "https://raw.githubusercontent.com/",
      urltail: "/master/MarkDown/",
      editormd: new showdown.Converter({
        tables: true,
        strikethrough: true
      }),
      inner: "<h1>Loading...</h1>"
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    const mobile = navigator.userAgent.match(
      /(phone|iPhone|iPod|ios|Android|Mobile|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    const deviceWidth = document.documentElement.clientWidth;
    if (mobile) {
      document.getElementById("reader").style.width = "94%";
    } else if (deviceWidth > 1000) {
      document.getElementById("reader").style.width = "750px";
    }
    this.readdata(
      this.$data.urlhead +
        this.$props.UserName +
        "/" +
        this.$props.ProjectName +
        this.$data.urltail +
        this.$route.query.pid
    );
  },
  methods: {
    async readdata(url) {
      axios.get(url).then(Response => {
        this.$data.inner = this.$data.editormd.makeHtml(Response["data"]);
      });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
#reader {
  width: 70%;
  border-radius: 1px;
  margin: 20px auto;
}

#title {
  height: 3rem;
  padding-top: 1rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  color: #fff;
  border-radius: 5px 5px 0px 0px;
  background-color: var(--main_color);
  text-overflow: ellipsis;
}

#content {
  padding: 30px 3%;
  min-height: 50rem;
  background-color: var(--second_color);
  overflow-y: auto;
  overflow-x: auto;
  box-shadow: 0 8px 16px darkgray;
}

#rcontent {
  color: initial;
  border: 1px dashed #333333;
}

#goback {
  font-size: 1rem;
  width: 3rem;
  height: 3rem;
  float: right;
  position: relative;
  right: 30px;
  bottom: 20px;
  border-radius: 4rem;
  background-color: var(--main_color);
  color: var(--second_color);
  border: none;
}

#goback:hover {
  cursor: pointer;
  transition: box-shadow 0.5s ease-out;
}
</style>

