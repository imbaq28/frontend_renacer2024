<template>
  <q-page padding>
    <h4>Agregar Presentacion</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div class="row q-col-gutter-md" style="width: 500px">
        <div class="col-12">
          <q-input
            v-model="presentacion.nombre"
            label="Tipo de Presentacion: "
          />
        </div>

        <div class="col-12">
          <q-input
            v-model="presentacion.detalle"
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
      <div>
        <VerPresentacion />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import VerPresentacion from "src/components/VerPresentacion.vue";

const opciones = ["ACTIVO", "INACTIVO"];

const presentacion = ref({
  nombre: "",
  detalle: "",
  estado: "ACTIVO",
});

const enviarForm = async () => {
  try {
    const pres = await api.post("/farmacia/presentacion", presentacion.value);
    resetForm();
    console.log(pres);
  } catch (error) {
    console.log("error: " + error);
  }
};

const resetForm = () => {
  presentacion.value = {
    nombre: "",
    detalle: "",
    estado: "ACTIVO",
  };
};
</script>

<style scoped type="text/css"></style>
