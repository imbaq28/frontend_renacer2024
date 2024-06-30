<template>
  <q-page padding>
    <h4>MENUS</h4>

    <div>
      <verMenu
        :refrescarTabla="refrescarTabla"
        @capturarDatos="capturarDatos"
      />
    </div>
  </q-page>
</template>

<script setup>
import verMenu from "src/components/verMenu.vue";
</script>

<style scoped type="text/css"></style>
