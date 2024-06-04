<script setup>
import { ref } from "vue";
import CrearCliente from "src/components/CrearCliente.vue";

const loading = ref([false, false]);

const progress = ref(false);

function simulateProgress(number) {
  loading.value[number] = true;

  setTimeout(() => {
    loading.value[number] = false;
  }, 3000);
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <h1>BIEVENIDOS</h1>
      <div>
        <q-btn
          :loading="loading[3]"
          color="primary"
          @click="simulateProgress(3)"
          to="/log/login"
          style="width: 150px"
        >
          Ingresar
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
.greeting {
  color: red;
  font-weight: bold;
}
.login {
  width: 500px;
  margin: 0 auto;
}
.imagen {
  width: 400px;
}
</style>
