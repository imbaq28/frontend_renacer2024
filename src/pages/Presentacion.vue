<template>
  <q-page padding>
    <h4>TIPOS DE PRESENTACION</h4>

    <div>
      <VerPresentacion
        :refrescarTabla="refrescarTabla"
        @capturarDatos="capturarDatos"
      />
    </div>
  </q-page>
</template>

<script setup>
import VerPresentacion from "src/components/VerPresentacion.vue";
</script>

<style scoped type="text/css"></style>
