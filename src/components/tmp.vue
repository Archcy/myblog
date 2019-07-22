<template>
  <div id="blog">
    <div id="list">
      <div v-show="currentblogs.length==0" style="text-align:center">
        <h1>Loading...</h1>
      </div>
      <div class="block" v-for="blog in currentblogs " :key="blog['index']">
        <div class="title">{{blog['name'] }}</div>
        <div class="markdown-body" :id="blog['name']">
          <h1>Loading...</h1>
          <div hidden="true">{{ view(blog['download_url'],blog['name'])}}</div>
        </div>
        <div class="viewall">
          <button @click="gotoreader(blog['url'])">More</button>
        </div>
      </div>
    </div>
    <div id="ind" v-if="pageNum!=1">
      <button
        class="pageind"
        v-for="index in pageNum"
        :key="index"
        @click="list(blogs, Blogs_per_Page, index, len)"
        :style="Getindcolor(index,currentPage)"
      >{{index}}</button>
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
    },
    Blogs_per_Page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      blogs: [],
      currentblogs: [],
      editormd: new showdown.Converter({
        tables: true,
        strikethrough: true
      }),
      pos: 0,
      len: 0,
      pageNum: 1,
      currentPage: 1
    };
  },
  mounted() {
    const mobile = navigator.userAgent.match(
      /(phone|iPhone|iPod|ios|Android|Mobile|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    const deviceWidth = document.documentElement.clientWidth;
    if (mobile) {
      document.getElementById("blog").style.width = "94%";
    } else if (deviceWidth > 1000) {
      document.getElementById("blog").style.width = "750px";
    }
    this.initlist(
      this.$props.UserName,
      this.$props.ProjectName,
      this.$props.Blogs_per_Page
    );
  },
  filters: {
    customOrder(list) {
      let first = list.shift();
      let last = list.pop();
      list.push(first);
      list.push(last);
      return list;
    }
  },
  methods: {
    initlist(UserName, ProjectName, Blogs_per_Page) {
      const urlhead = "https://api.github.com/repos/",
        urltail = "/contents/MarkDown";
      axios
        .get(urlhead + UserName + "/" + ProjectName + urltail)
        .then(Response => {
          const tarray = Response.data;
          tarray.forEach(element => {
            let tmp = {};
            let nnf = element["name"].split(".");
            tmp["index"] = 65535 - parseInt(nnf[0]);
            tmp["name"] = nnf[1];
            tmp["url"] = element["name"];
            tmp["download_url"] = element["download_url"];
            this.blogs.push(tmp);
          });
          this.blogs.sort((a, b) => {
            return a.index - b.index;
          });
          this.len = this.blogs.length;
          this.pageNum = Math.ceil(this.len / Blogs_per_Page);
          for (let i = 0; i < Blogs_per_Page && i < this.len; i++) {
            this.currentblogs.push(this.blogs[i]);
          }
        });
    },
    list(Data, Blogs_per_Page, current, len) {
      document.documentElement.scrollTo(0,0);
      this.currentblogs = [];
      for (
        let i = 0;
        i < Blogs_per_Page && i + (current - 1) * Blogs_per_Page < len;
        i++
      ) {
        this.currentblogs.push(Data[i + (current - 1) * Blogs_per_Page]);
      }
      this.currentPage = current;
    },
    async view(url, id) {
      axios.get(url).then(Response => {
        document.getElementById(id).innerHTML = this.$data.editormd.makeHtml(
          Response["data"].substr(0, 128)
        );
      }); //Lazy
    },
    gotoreader(id) {
      this.$router.push({ path: "article", query: { pid: id } });
    },
    Getindcolor(ind, currentPage) {
      if (ind == currentPage) {
        return "background-color:var(--second_color);color:var(--main_color);";
      }
    }
  }
};
</script>
<style scoped>
#blog {
  margin:0 auto;
  margin-top: -8rem;
  margin-bottom: -10rem;
  width: 86%;
  padding: 3%;
}
#list {
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-height: 40rem;
  border-radius: 1px;
  background-color: var(--second_color);
  z-index: 2;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 2rem;
  box-shadow: 0 8px 16px darkgray;
}

.block {
  z-index: 3;
  position: relative;
  height: 260px;
  width: 90%;
  opacity: 0.9;
  border-radius: 5px;
  margin: 1rem auto;
  box-shadow: 0 8px 16px darkgray;
}
.block:hover {
  animation: bigger 0.3s;
  animation-fill-mode: forwards;
}
.block div {
  padding: 10px 5%;
  margin: 0px;
  width: 90%;
  z-index: 3;
}

.block .title {
  position: relative;
  height: 30px;
  font-size: 1.4rem;
  color: #fff;
  border-radius: 5px 5px 0px 0px;
  background-color: var(--main_color);
  text-overflow: ellipsis;
}
.block .markdown-body {
  position: relative;
  height: 190px;
  font-size: 1rem;
  border-radius: 0px 0px 5px 5px;
  background-color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
}
.block .viewall {
  margin-top: -90px;
  padding: 0;
  position: relative;
  bottom: 0px;
  height: 90px;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 1)
  );
}
.block .viewall button {
  float: right;
  position: relative;
  right: 2rem;
  top: 30px;
  margin: 0px auto;
}

#ind {
  height: 3rem;
  margin: 0 auto;
  width: 100%;
  bottom: 1rem;
}

.pageind {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  margin: 1rem 0.5rem;
  color: var(--second_color);
  background-color: var(--main_color);
  border-radius: 3px;
  float: left;
}

button {
  font-size: 15px;
  border: none;
  height: 40px;
  width: 80px;
  border-radius: 30px;
  background-color: var(--main_color);
  color: var(--second_color);
}

button:hover {
  cursor: pointer;
}

@keyframes bigger {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.02);
  }
}
</style>

