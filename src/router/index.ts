/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { authGetters } from "@/store/modules/auth";
import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

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
      path: "/travels/config",
      name: "travel-config",
      component: () => import("@/pages/travels/travel-config.vue"),
      meta: {
        restricted: true,
      },
    },
    {
      path: "/travels/:slug",
      name: "travel",
      props: true,
      component: () => import("@/pages/travels/travel.vue"),
    },
    {
      path: "/travels/:travelSlug/add-tour",
      name: "add-tour",
      props: true,
      component: () => import("@/pages/tours/tour-config.vue"),
      meta: {
        restricted: true,
      },
    },
    {
      path: "/tours",
      name: "tours",
      component: () => import("@/pages/tours/tours.vue"),
    },
    {
      path: "/tours/:tourId/config",
      name: "tour-config",
      props: true,
      component: () => import("@/pages/tours/tour-config.vue"),
      meta: {
        restricted: true,
      },
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

router.beforeEach((to) => {
  return true;
  const store = useStore();
  const isAuth = store.getters[authGetters.isAuth];
  const isRestrictedRoute = to.meta.restricted;
  if (isRestrictedRoute && !isAuth) {
    return { path: "/travels" };
  }
  return true;
});

export default router;
