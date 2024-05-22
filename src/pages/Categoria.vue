<template>
  <q-page padding>
    <h4>Agregar Categoria</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div class="row q-col-gutter-md" style="width: 500px">
        <div class="col-12">
          <q-input v-model="categoria.Categoria" label="Categoria: " />
        </div>

        <div class="col-12">
          <q-input
            v-model="categoria.detalles"
            label="Detalles"
            filled
            type="textarea"
          />
        </div>

        <div class="col-12" style="width: 200px">
          <q-select
            label="Estado"
            v-model="categoria.estado"
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

const opciones = ["H", "I", "null"];
const categoria = ref({
  id: 0,
  Categoria: "",
  Detalles: "",
  logo: "",
  estado: "",
});

const enviarForm = () => {
  console.log("Enviando Formulario");
};

const resetForm = () => {
  proveedor.value = {
    id: "0",
    Categoria: "",
    detalles: "",
    logo: "",
    estado: "",
  };
};
</script>

<style scoped type="text/css"></style>
