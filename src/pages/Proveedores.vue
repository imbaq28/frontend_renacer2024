<template>
  <q-page padding>
    <h4>Agregar Proveedores</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div class="row q-col-gutter-md" style="width: 500px">
        <div class="col-12">
          <q-input v-model="proveedor.nombre" label="Nombre del Proveedor" />
        </div>

        <div class="col-12">
          <q-input v-model="proveedor.nit" label="NIT" />
        </div>

        <div class="col-12">
          <q-input
            v-model="proveedor.detalles"
            label="Detalles"
            filled
            type="textarea"
          />
        </div>

        <div class="col-12" style="width: 200px">
          <q-select
            label="Estado"
            v-model="proveedor.estado"
            :options="opciones"
          />
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
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const proveedor = ref({
  id: 0,
  nombre: "",
  nit: 0,
  Detalles: "",
  logo: "",
  estado: "",
});

const seleccion = ref(null);
const opciones = ["maxima", "moderada", "minima"];

const enviarForm = () => {
  console.log("Enviando Formulario");
};

const resetForm = () => {
  proveedor.value = {
    id: "0",
    nombre: "ADN",
    nit: 0,
    detalles: "",
    logo: "",
    estado: "",
  };
};
</script>

<style scoped type="text/css"></style>
