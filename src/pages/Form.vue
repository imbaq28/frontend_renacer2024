<template>
  <q-page padding>
    <h4>Agregar Producto</h4>

    <pre>{{ producto }}</pre>
    <q-form class="row q-col-gutter-md">
      <div class="col-12 col-sm-6">
        <q-input v-model="producto" label="Producto" />
      </div>

      <div class="col-12 col-sm-6">
        <q-select label="Prioridad" v-model="seleccion" :options="opciones" />
      </div>

      <div class="col-12 col-sm-6">
        <q-select label="Categoria" v-model="seleccion" :options="opciones" />
      </div>
      <q-separator inset />

      <div class="col-12 col-sm-6">
        <q-input v-model="producto" label="Presentacion" />
      </div>
      <q-separator inset />

      <div class="col-12 col-sm-6">
        <q-select label="Proveedor" v-model="seleccion" :options="opciones" />
      </div>
      <q-separator inset />

      <div class="col-12 col-sm-6">
        <q-input v-model="producto" label="Stock" />
      </div>
      <q-separator inset />

      <div class="col-12 col-sm-6">
        <q-input v-model="producto" label="Detalles" />
      </div>
      <div class="col-12">
        <q-btn label="Submit" color="primary" type="submit" />
        <q-btn
          label="Reset"
          color="primary"
          outline
          class="q-ml-sm"
          ripple="false"
          type="reset"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const producto = ref(null);
    const seleccion = ref(null);
    const opciones = ["maxima", "moderada", "minima"];
    return {
      producto,
      seleccion,
      opciones,
    };
  },
};
</script>
