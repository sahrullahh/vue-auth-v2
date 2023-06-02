import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { useStore } from "vuex";
// import store from "@/store";
import HomeView from "@/views/HomeView.vue";
import AuthLogin from "@/views/auth/Login.vue";
import AuthRegister from "@/views/auth/Register.vue";

// const store = useStore();

// function guest(to: any, from: any, next: any) {
//   if (store.state.authenticated) {
//     next({ name: "Dashboard" });
//   } else next();
// }

// function guard(to: any, from: any, next: any) {
//   if (store.state.authenticated) {
//     next();
//   } else next({ name: "Login" });
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    // beforeEnter: guard,
  },
  {
    path: "/login",
    name: "Login",
    component: AuthLogin,
    // beforeEnter: guest,
  },
  {
    path: "/register",
    name: "Register",
    component: AuthRegister,
    // beforeEnter: guest,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
