const routes = [
  {
    path: "/",

    component: () => import("layouts/TestLayout.vue"),
    children: [
      //{ path: "", component: () => import("pages/IndexPage.vue") },
      //{ path: "login", component: () => import("pages/log.vue") },
      //{ path: "login", component: () => import("src/pages/LoginPage.vue") },
    ],
  },
  {
    path: "/log",

    component: () => import("layouts/Layout.vue"),
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
        path: "usuario",
        component: () => import("src/pages/Usuario.vue"),
      },
      {
        path: "cliente",
        component: () => import("src/pages/Cliente.vue"),
      },
      {
        path: "crearrol",
        component: () => import("src/components/CrearRol.vue"),
      },
      {
        path: "ventas",
        component: () => import("src/pages/Ventas.vue"),
      },
      {
        path: "compras",
        component: () => import("src/pages/Compra.vue"),
      },
      {
        path: "roles",
        component: () => import("src/pages/Roles.vue"),
      },
      {
        path: "menu",
        component: () => import("src/pages/Menu.vue"),
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
