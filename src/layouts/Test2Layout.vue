<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="primary" style="font-size: medium">
      <q-toolbar>
        <q-toolbar-title class="text-h3 text-center"
          >FARMACIA RENACER</q-toolbar-title
        >
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            v-for="menu in usuario.roles.menus"
            :key="menu.id"
            clickable
            v-ripple
            :to="menu.ruta"
            exact
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon :name="menu.icono" />
            </q-item-section>

            <q-item-section> {{ menu.nombre }} </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="cerrarSesion">
            <q-item-section avatar>
              <q-icon name="close" />
            </q-item-section>

            <q-item-section> Cerrar Sesion </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="images/farmrenbola.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold" style="color: red">
            Bienvenido {{ usuario.nombres }}
          </div>

          <verPerfil />
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import verPerfil from "src/components/verPerfil.vue";
//import VerPerfil from "src/components/verPerfil.vue";
const $q = useQuasar();
const drawer = ref(false);
const usuario = $q.localStorage.getItem("user");
const router = useRouter();
//const usuario = ref({});
//const editarUsuario = ref(false);

//const rows = ref([]);
//console.log("usuario LOG", user);

function cerrarSesion() {
  console.log("Cerrando sesion...");
  $q.localStorage.clear();
  router.push("/log/login");
}
/*
async function traerDatos() {
  const usuario = await api.get("/system/usuario");
  rows.value = usuario.data.datos;
}*/

function redirectToLink() {
  verPerfil;
}
</script>

<style lang="scss">
.my-menu-link {
  color: rgb(255, 255, 255);
  background: #667dd8;
}
body {
  font-family: "Single Day";
  font-weight: 600;
  font-style: normal;
}
</style>
