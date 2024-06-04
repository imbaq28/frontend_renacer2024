<template>
  <q-page padding>
    <h4>COMPRA</h4>

    <div>
      <VerCompra
        :refrescarTabla="refrescarTabla"
        @capturarDatos="capturarDatos"
      />
    </div>
  </q-page>
</template>

<script setup>
import VerCompra from "src/components/VerCompra.vue";
</script>

<style scoped type="text/css"></style>
