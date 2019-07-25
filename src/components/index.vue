<template>
  <div id="blog">
    <div style="box-shadow: 0 8px 16px darkgray;">
      <div id="thetagme">
        <div id="thetags" :style="viewtags">
          <button
            class="thetag"
            v-for="(value,key) in mdtagsindex"
            :key="key"
            @click="selecttagview(key)"
            :style="Getindcolor(0,mdtagsindex[key])"
          >{{key}}</button>
          <div style="clear:both"></div>
        </div>
        <div id="tagviewall" v-if="0" @click="tagview()">V</div>
      </div>
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
            <button
              class="thetag"
              v-for="tag in blog['tags']"
              :key="tag"
              :style="Getindcolor(0,mdtagsindex[tag])"
              @click="selecttagview(tag)"
            >{{tag}}</button>
            <button id="gotoread" @click="gotoreader(blog['url'])">More</button>
          </div>
        </div>
      </div>
    </div>
    <div id="ind" v-if="pageNum!=1">
      <button
        class="pageind"
        v-for="index in pageNum"
        :key="index"
        @click="gotopage(index)"
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
    },
    Blogs_per_Day: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      blogs: [],
      currentblogs: [],
      mdtagsindex: {},
      editormd: new showdown.Converter({
        tables: true,
        strikethrough: true
      }),
      pos: 0,
      len: 0,
      pageNum: 1,
      currentPage: 1,
      mobile: 0,
      viewtags: null,
      selected: []
    };
  },
  mounted() {
    this.$data.mobile = navigator.userAgent.match(
      /(phone|iPhone|iPod|ios|Android|Mobile|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    const deviceWidth = document.documentElement.clientWidth;
    if (this.$data.mobile) {
      document.getElementById("blog").style.width = "94%";
    } else if (deviceWidth > 1000) {
      document.getElementById("blog").style.width = "750px";
    }
    if (this.$route.query.page) {
      this.$data.currentPage = this.$route.query.page;
    }
    this.initlist(
      this.$props.UserName,
      this.$props.ProjectName
    );
  },
  watch: {
    FNowID: function(newVal) {
      this.FNowID = newVal;
    }
  },
  methods: {
    initlist(UserName, ProjectName) {
      const urlhead = "https://api.github.com/repos/",
        urltail = "/contents/MarkDown";
      try {
        axios
          .get(urlhead + UserName + "/" + ProjectName + urltail)
          .then(Response => {
            const tarray = Response.data;
            tarray.forEach(element => {
              let tmp = {};
              let tmpele = element["name"].split(/[.]/);
              let time = tmpele[0].split(/-/);
              let index = 0;
              if (time.length > 3) {
                index =
                  37200 * this.Blogs_per_Day -
                  ((parseInt(time[0]) - 2000) * 12 +
                    parseInt(time[1]) * 31 +
                    parseInt(time[2])) *
                    this.Blogs_per_Day -
                  parseInt(time[3]);
              } else {
                index = tmpele[0];
              }
              let tags = element["name"].match(/\{[^]+\}/);
              if (tags) {
                tags = tags.toString();
                tags = tags.substr(1, tags.length - 2).split(/,/);
                tmp["name"] = tmpele[2];
              } else {
                tags = [];
                tmp["name"] = tmpele[1];
              }
              tmp["index"] = index;
              tmp["tags"] = tags;
              tmp["url"] = element["name"];
              tmp["download_url"] = element["download_url"];
              tags.forEach(tag => {
                if (!this.mdtagsindex[tag]) {
                  this.mdtagsindex[tag] = 0;
                }
              });
              this.blogs.push(tmp);
            });
            this.blogs.sort((a, b) => {
              return a.index - b.index;
            });
            this.gotopage(this.$data.currentPage);
          });
      } catch (err) {
        alert("Unable to Get Filelist,May be reach API Limt");
      }
    },
    list(input, Blogs_per_Page, current) {
      window.scrollTo(0, 0);
      let Data = this.tagged(input),
        len = Data.length;
      this.pageNum = Math.ceil(len / Blogs_per_Page);
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
      try {
        axios.get(url).then(Response => {
          document.getElementById(id).innerHTML = this.$data.editormd.makeHtml(
            Response["data"].substr(0, 128)
          );
        }); //Lazy
      } catch (err) {
        alert("exec error");
      }
    },
    gotoreader(id) {
      this.$router.push({ path: "./", query: { pid: id } });
    },
    Getindcolor(ind, one) {
      if (ind == one) {
        return "background-color:#eee;color:var(--main_color);";
      } else {
        return "background-color:var(--main_color);color:var(--second_color);";
      }
    },
    gotopage(index) {
      this.$router.push({ path: "./", query: { page: index } });
      this.list(this.blogs, this.Blogs_per_Page, index);
    },
    tagview() {
      if (this.$data.viewtags == null) this.$data.viewtags = "height:4.5rem;";
      else this.$data.viewtags = null;
    },
    selecttagview(tag) {
      if (this.$data.mdtagsindex[tag] == 0) this.$data.mdtagsindex[tag] = 1;
      else this.$data.mdtagsindex[tag] = 0;
      this.gotopage(1);
    },
    tagged(inputs) {
      if (inputs) {
        let flag = 1;
        for (let ttag in this.$data.mdtagsindex) {
          if (this.$data.mdtagsindex[ttag] == 1) {
            flag = 0;
          }
        }
        if (!flag) {
          let tmptaglist = [];
          for (let ttag in this.$data.mdtagsindex) {
            if (this.$data.mdtagsindex[ttag] == 1) {
              tmptaglist.push(ttag);
            }
          }
          return inputs.filter(function(input) {
            for (let value in tmptaglist) {
              if (input.tags.indexOf(tmptaglist[value]) != -1) {
                return input;
              }
            }
          });
        } else {
          return inputs;
        }
      }
    }
  }
};
</script>
<style scoped>
#blog {
  margin: 0 auto;
  margin-top: -8rem;
  margin-bottom: -10rem;
  width: 86%;
  padding: 3%;
}

#thetagme {
  min-height: 3rem;
  width: 100%;
  background-color: var(--second_color);
  overflow: hidden;
}

#tagviewall {
  position: relative;
  height: 1.5rem;
  padding-top: 0.5rem;
  border-radius: 1rem;
  width: 10rem;
  margin: 0 auto;
  margin-top: -0.5rem;
  clear: both;
  background-color: var(--main_color);
  color: var(--second_color);
  text-align: center;
}
#tagviewall:hover {
  cursor: pointer;
}

#thetags {
  background-color: #fff;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}
.thetag {
  float: left;
  width: 5rem;
  height: 2rem;
  text-align: center;
  border-radius: 2rem;
  margin: 0.5rem 0.6rem;
  overflow: hidden;
}
.thetag:hover {
  cursor: pointer;
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
  height: 30px;
  font-size: 1.4rem;
  color: #fff;
  border-radius: 5px 5px 0px 0px;
  background-color: var(--main_color);
  text-overflow: ellipsis;
}
.block .markdown-body {
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
  bottom: 0px;
  height: 90px;
  width: 100%;
  position: relative;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 1)
  );
}
#gotoread {
  float: right;
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  margin: 0px auto;
  z-index: 4;

}

.block .viewall .tags {
  float: left;
  font-size: 1rem;
  opacity: 0.8;
  padding: 0.2rem 1rem;
  width: 3rem;
  height: 1.8rem;
  border-radius: 1rem;
  margin: 1rem 1rem;
  color: black;
  background-color: #dedede;
  text-overflow: ellipsis;
  overflow: hidden;
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
  font-size: 1rem;
  border: none;
  height: 2.8rem;
  width: 6rem;
  border-radius: 3rem;
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

