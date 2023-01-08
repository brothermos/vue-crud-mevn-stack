import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import AddPost from "../views/AddPost";
import Post from "../views/Post.vue";
import EditPost from "../views/EditPost.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/add-post",
        name: "add-post",
        component: AddPost,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/post/:id",
        name: "post",
        component: Post,
    },
    {
        path: "/edit-post/:id",
        name: "edit-post",
        component: EditPost,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
