import { createRouter, createWebHistory } from "vue-router";

import AboutPage from "../views/AboutPage.vue";
import ContactPage from "../views/ContactPage.vue";
import GalleryPage from "../views/GalleryPage.vue";
import ServicesList from "../views/ServicesList.vue";
import HomePage from "@/views/HomePage.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import AdminPage from "@/views/AdminPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPage,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: GalleryPage,
  },
  {
    path: "/services",
    name: "Services",
    component: ServicesList,
  },
  {
    path: "/login",
    name: "Login",
    component: AdminLogin,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
