<template>
  <q-page padding>
    <h4>Categorias</h4>

    <div>
      <VerCategoria
        :refrescarTabla="refrescarTabla"
        @capturarDatos="capturarDatos"
      />
    </div>
  </q-page>
</template>

<script setup>
import VerCategoria from "src/components/VerCategoria.vue";
</script>

<style scoped type="text/css"></style>
