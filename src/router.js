import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        public: true
      }
    },
    {
      path: "/signup",
      name: "signup",
      meta: {
        public: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/SignUp.vue")
    },
    {
      path: "/",
      name: "home",
      meta: {},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home.vue")
    },
    {
      path: "/addhostel",
      name: "addhostel",
      meta: {},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/AddHostel.vue")
    }
  ]
});
