const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: { authRequired: true },
      },
      { path: "signup", component: () => import("pages/signup.vue") },
      { path: "login", component: () => import("pages/login.vue") },
      {
        path: "users",
        component: () => import("pages/users.vue"),
        meta: { isAdmin: true, authRequired: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
