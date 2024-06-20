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
            clickable
            v-ripple
            to="/farmacia/usuario"
            exact
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> USUARIOS </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/cliente"
            exact
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> CLIENTES </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/medicamento"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> STOCKS Y PRECIOS DE VENTA </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/proveedores"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> PROVEEDORES</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/categoria"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> CATEGORIAS</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/presentacion"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> PRESENTACIÓN </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/ventas"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> VENTAS </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/nombre"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> MEDICAMENTO </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/compras"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> COMPRAS </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/roles"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> ROLES </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/menu"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> MENUS </q-item-section>
          </q-item>
        </q-list>

        <q-item
          clickable
          v-ripple
          to="/farmacia/ventas2"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="today" />
          </q-item-section>

          <q-item-section> VENTAS2 </q-item-section>
        </q-item>
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
          <div class="text-weight-bold">Farmacia RENACER</div>
          <div>@rstoenescu</div>
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

const drawer = ref(false);
</script>

<style lang="scss">
.my-menu-link {
  color: rgb(255, 255, 255);
  background: #667dd8;
}
body {
  font-family: "Single Day", cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
