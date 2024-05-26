<template>
  <q-page padding>
    <h4>Agregar Proveedores</h4>

    <!--<pre>{{ producto }}</pre>-->
      <div>
        <VerProveedor
          :refrescarTabla="refrescarTabla"
          @capturarDatos="capturarDatos"
        />
      </div>

  </q-page>
</template>

<script setup>

import VerProveedor from "src/components/VerProveedor.vue";

</script>

<style scoped type="text/css"></style>
