import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    /////FESTIVALS/////
    {
      path: "/festivals",
      name: "festivals_index",
      component: () => import("./views/festivals/Index.vue")
    },
    {
      path: "/festivals/create",
      name: "festivals_create",
      component: () => import("./views/festivals/Create.vue")
    },
    {
      path: "/festivals/:id",
      name: "festivals_show",
      component: () => import("./views/festivals/Show.vue")
    },
    {
      path: "/festivals/:id",
      name: "festivals_edit",
      component: () => import("./views/festivals/Edit.vue")
    },
    //////////////////

    /////PERFORMERS/////
    {
      path: "/performers",
      name: "performers_index",
      component: () => import("./views/performers/Index.vue")
    },
    {
      path: "/performers/create",
      name: "performers_create",
      component: () => import("./views/performers/Create.vue")
    },
    {
      path: "/performers/:id",
      name: "performers_show",
      component: () => import("./views/performers/Show.vue")
    },
    {
      path: "/performers/:id",
      name: "performers_edit",
      component: () => import("./views/performers/Edit.vue")
    },
    //////////////////

    /////SHOWS/////
    {
      path: "/shows",
      name: "shows_index",
      component: () => import("./views/shows/Index.vue")
    },
    {
      path: "/shows/create",
      name: "shows_create",
      component: () => import("./views/shows/Create.vue")
    },
    {
      path: "/shows/:id",
      name: "shows_show",
      component: () => import("./views/shows/Show.vue")
    },
    {
      path: "/shows/:id",
      name: "shows_edit",
      component: () => import("./views/shows/Edit.vue")
    },
    //////////////////

    /////STAGE/////
    {
      path: "/stages",
      name: "stages_index",
      component: () => import("./views/stages/Index.vue")
    },
    {
      path: "/stages/create",
      name: "stages_create",
      component: () => import("./views/stages/Create.vue")
    },
    {
      path: "stages/:id",
      name: "stages_show",
      component: () => import("./views/stages/Show.vue")
    },
    {
      path: "/stages/:id",
      name: "stages_edit",
      component: () => import("./views/stages/Edit.vue")
    },
    //////////////////
    {
      path: "/login",
      name: "login",
      component: () => import("./components/cognito/login.vue"),
      meta: {
        noAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./components/cognito/register.vue"),
      meta: {
        noAuth: true
      }
    },
    {
      path: "/confirm",
      name: "confirm",
      component: () => import("./components/cognito/confirm.vue"),
      meta: {
        noAuth: true
      }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (!to.matched.some(record => record.meta.noAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (localStorage.getItem("token")) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })

export default router;
