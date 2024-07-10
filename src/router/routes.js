import { LocalStorage } from "quasar";

const guardApp = (to, from, next) => {
  if (LocalStorage.getItem("user")) {
    next();
  } else {
    LocalStorage.clear();

    next("/");
  }
};

const guardMenu = (to, from, next) => {
  if (LocalStorage.getItem("user")) {
    const user = LocalStorage.getItem("user");
    const menu = user.menus;
    const buscarMenu = menu.find((m) => m.ruta === to.path);
    if (buscarMenu) {
      next();
    } else {
      next(from.path);
    }
  } else {
    LocalStorage.clear();

    next("/");
  }
};

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
    beforeEnter: guardApp,
    component: () => import("layouts/Test2Layout.vue"),
    children: [
      {
        //beforeEnter: guardMenu,
        path: "bienvenidos",
        component: () => import("src/pages/Bienvenida.vue"),
      },

      {
        beforeEnter: guardMenu,
        path: "medicamento",
        component: () => import("src/pages/Medicamento.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "nombre",
        component: () => import("src/pages/Nombre.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "categoria",
        component: () => import("src/pages/Categoria.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "presentacion",
        component: () => import("src/pages/Presentacion.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "proveedores",
        component: () => import("src/pages/Proveedores.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "usuario",
        component: () => import("src/pages/Usuario.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "cliente",
        component: () => import("src/pages/Cliente.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "crearrol",
        component: () => import("src/components/CrearRol.vue"),
      },

      {
        beforeEnter: guardMenu,
        path: "ventas",
        component: () => import("src/pages/VentasRealizadas.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "ventas2",
        component: () => import("src/pages/Ventas2.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "reportes",
        component: () => import("src/pages/Reportes.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "compras",
        component: () => import("src/pages/Compra.vue"),
      },
      {
        beforeEnter: guardMenu,
        path: "roles",
        component: () => import("src/pages/Roles.vue"),
      },
      {
        beforeEnter: guardMenu,
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
