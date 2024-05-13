const routes = [
  {
    path: "/",
    component: () => import("layouts/Test2Layout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      //{ path: "login", component: () => import("pages/log.vue") },
      { path: "login", component: () => import("src/pages/LoginPage.vue") },
      { path: "/form", component: () => import("src/pages/Form.vue") },
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
