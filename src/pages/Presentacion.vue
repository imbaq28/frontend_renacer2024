<template>
  <q-page padding>
    <h4>Agregar Presentacion</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div class="row q-col-gutter-md" style="width: 500px">
        <div class="col-12">
          <q-input
            v-model="presentacion.Presentacion"
            label="Tipo de Presentacion: "
          />
        </div>

        <div class="col-12">
          <q-input
            v-model="presentacion.detalles"
            label="Detalles"
            filled
            type="textarea"
          />
        </div>

        <div class="col-12" style="width: 200px">
          <q-select
            label="Estado"
            v-model="presentacion.estado"
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
const opciones = ["maxima", "moderada", "minima"];

const presentacion = ref({
  id: 0,
  Presentacion: "",
  detalles: "",
  logo: "",
  estado: "",
});

const enviarForm = () => {
  console.log("Enviando Formulario");
};

const resetForm = () => {
  Presentacion.value = {
    id: "0",
    Presentacion: "",
    detalles: "",
    logo: "",
    estado: "",
  };
};
</script>

<style scoped type="text/css"></style>
