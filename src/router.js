import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './components/index'
import article from './components/article'
Vue.use(VueRouter)
const UserName = "Archcy", // Your Github UserName
    ProjectName = "Archcy.github.io", // Your Project Name
    Blogs_per_Page = 4 //default is 4
const router = new VueRouter({ //
    mode: 'history',
    base: './',
    routes: [
        { path: '/', component: index, props: { UserName: UserName, ProjectName: ProjectName, Blogs_per_Page: Blogs_per_Page } }, //index
        { path: '/article', component: article, props: { UserName: UserName, ProjectName: ProjectName } }, //
    ]
})

export default router