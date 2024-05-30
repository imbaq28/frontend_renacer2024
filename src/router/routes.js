const routes = [
  {
    path: "/",

    component: () => import("layouts/TestLayout.vue"),
    children: [
      //{ path: "", component: () => import("pages/IndexPage.vue") },
      //{ path: "login", component: () => import("pages/log.vue") },
      { path: "login", component: () => import("src/pages/LoginPage.vue") },
    ],
  },
  {
    path: "/farmacia",
    component: () => import("layouts/Test2Layout.vue"),
    children: [
      {
        path: "medicamento",
        component: () => import("src/pages/Medicamento.vue"),
      },
      {
        path: "nombre",
        component: () => import("src/pages/Nombre.vue"),
      },
      {
        path: "categoria",
        component: () => import("src/pages/Categoria.vue"),
      },
      {
        path: "presentacion",
        component: () => import("src/pages/Presentacion.vue"),
      },
      {
        path: "proveedores",
        component: () => import("src/pages/Proveedores.vue"),
      },
      {
        path: "clientes",
        component: () => import("src/pages/Clientes.vue"),
      },
      {
        path: "crearusuario",
        component: () => import("src/components/CrearUsuario.vue"),
      },
      {
        path: "ventas",
        component: () => import("src/pages/Ventas.vue"),
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
