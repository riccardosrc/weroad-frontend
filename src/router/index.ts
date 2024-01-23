/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "",
      redirect: "/travels",
    },
    {
      path: "/travels",
      name: "travels",
      component: () => import("@/pages/travels/travels.vue"),
    },
    {
      path: "/travels/:slug",
      name: "travel",
      props: true,
      component: () => import("@/pages/travels/travel.vue"),
    },
    {
      path: "/tours",
      name: "tours",
      component: () => import("@/pages/tours/tours.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/auth/login.vue"),
    },
    {
      path: "/:notFound(.*)",
      redirect: "/travels",
    },
  ],
});

export default router;
