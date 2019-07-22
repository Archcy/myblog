<template>
  <div id="reader">
    <div class="markdown-body" v-html="inner"></div>
    <button id="goback" @click="goback()">Back to Blogs</button>
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
    const mobile = navigator.userAgent.match(/(phone|iPhone|iPod|ios|Android|Mobile|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    const deviceWidth = document.documentElement.clientWidth;
    if(mobile)
    {
      document.getElementById("reader").style.width = "94%";
    }else if (deviceWidth > 1000) {
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
  padding: 30px 3%;
  width: 86%;
  min-height: 40rem;
  border-radius: 1px;
  margin: -80px auto;
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
  width: 8rem;
  height: 2rem;
  float: right;
  position: fixed;
  right: 30px;
  bottom: 20px;
  border-radius: 4rem;
  opacity: 0.6;
  background-color: var(--main_color);
  color: var(--second_color);
  border: none;
}

#goback:hover {
  cursor: pointer;
  transition: box-shadow 0.5s ease-out;
}
</style>

