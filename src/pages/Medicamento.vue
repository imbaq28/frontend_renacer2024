<template>
  <q-page padding>
    <h4>MEDICAMENTOS</h4>

    <div>
      <VerMedicamento
        :refrescarTabla="refrescarTabla"
        @capturarDatos="capturarDatos"
      />
    </div>
  </q-page>
</template>

<script setup>
import VerMedicamento from "src/components/VerMedicamento.vue";
</script>

<style scoped type="text/css"></style>
