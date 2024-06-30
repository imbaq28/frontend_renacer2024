<template>
  <q-page padding>
    <h4>CLIENTES</h4>
    <verClientes
      :refrescarTabla="refrescarTabla"
      @capturarDatos="capturarDatos"
    />
    <div></div>
  </q-page>
</template>

<script setup>
import verClientes from "src/components/verClientes.vue";
</script>

<style scoped type="text/css"></style>
