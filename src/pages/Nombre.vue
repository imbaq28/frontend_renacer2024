<template>
  <q-page padding>
    <h4>NOMBRE DE MEDICAMENTO</h4>

    <div>
      <VerNombre
        :refrescarTabla="refrescarTabla"
        @capturarDatos="capturarDatos"
      />
    </div>
  </q-page>
</template>

<script setup>
import VerNombre from "src/components/VerNombre.vue";
</script>

<style scoped type="text/css"></style>
