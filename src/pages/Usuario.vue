<template>
  <q-page padding>
    <h4>USUARIOS</h4>
    <VerUsuario
      :refrescarTabla="refrescarTabla"
      @capturarDatos="capturarDatos"
    />
  </q-page>
</template>

<script setup>
import VerUsuario from "src/components/VerUsuario.vue";
</script>

<style scoped type="text/css"></style>
