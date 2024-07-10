<template>
  <q-page padding>
    <h4>VENTAS REALIZADAS</h4>
    <VerVentas
      :refrescarTabla="refrescarTabla"
      @capturarDatos="capturarDatos"
    />
  </q-page>
</template>

<script setup>
import VerVentas from "src/components/VerVentas.vue";
</script>

<style scoped type="text/css"></style>
