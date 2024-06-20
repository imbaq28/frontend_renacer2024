<template>
  <q-page padding>
    <h3>ROLES</h3>
    <verRoles :refrescarTabla="refrescarTabla" @capturarDatos="capturarDatos" />
  </q-page>
</template>

<script setup>
import verRoles from "src/components/verRoles.vue";
</script>
