import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/auth/Login.vue";
const Dashboard = () => import("../views/Dashboard.vue");
const Error404 = () => import("../views/auth/Error404.vue");
const Logout = () => import("../views/auth/Logout.vue");
const Report = () => import("../views/Report.vue")

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "Error404",
    component: Error404,
  },
  {
    path: "/",
    name: "/",
    redirect: "/login",
  },  
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
  });
  
  export default router;