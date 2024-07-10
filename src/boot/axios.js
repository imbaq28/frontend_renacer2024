import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

//const api = axios.create({ baseURL: "http://localhost:3000/api" });
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000, // Tiempo máximo de espera de 5 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

/*api.interceptors.request.use(
  (config) => {
    // Aquí puedes obtener el token de autorización de donde lo tengas almacenado (por ejemplo, localStorage)
    const token = user?.token;

    //const token = localStorage.getItem("token");

    // Si tienes un token, añádelo a la cabecera 'Authorization'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Manejo de errores del interceptor
    return Promise.reject(error);
  }
);*/

/*
let user = LocalStorage.getItem("user");

api.interceptors.request.use(function (config) {
  const token = user.token;
  config.headers.Authorization = `${token}`;
  return config;
});
*/

export default boot(({ app }) => {
  api.interceptors.request.use(
    async (config) => {
      let user = LocalStorage.getItem("user");
      const accessToken = user?.token;
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
