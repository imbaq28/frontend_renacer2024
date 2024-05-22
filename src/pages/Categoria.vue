<template>
  <q-page padding>
    <h4>Agregar Categoria</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div class="row q-col-gutter-md" style="width: 500px">
        <div class="col-12">
          <q-input v-model="categoria.nombre" label="Categoria: " />
        </div>

        <div class="col-12">
          <q-input
            v-model="categoria.detalle"
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
import { api } from 'boot/axios'

const opciones = ["ACTIVO", "INACTIVO"];
const categoria = ref({
  nombre: "",
  detalle: "",
  estado: "ACTIVO",
});

const  enviarForm = async() => {
  try {
    const cat = await api.post("/farmacia/categoria",categoria.value)
    console.log(cat)
  } catch (error) {
    console.log('error: ' + error)
  }
};

const resetForm = () => {
  proveedor.value = {
    categoria: "",
    detalles: "",
    estado: "ACTIVO",
  };
};
</script>

<style scoped type="text/css"></style>
