<template>
  <q-page padding>
    <h4>Agregar Proveedores</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div class="row q-col-gutter-md" style="width: 500px">
        <div class="col-12">
          <q-input
            v-model="proveedor.nombre"
            label="Nombre del Proveedor:"
            item-aligned="left"
          />
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
      <div>
        <VerProveedor />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import VerProveedor from "src/components/VerProveedor.vue";
const proveedor = ref({
  nombre: "",
  nit: 0,
  detalles: "",
  estado: "ACTIVO",
});

const opciones = ["ACTIVO", "INACTIVO"];

const enviarForm = async () => {
  try {
    const prov = await api.post("/farmacia/proveedores", proveedor.value);
    resetForm();
    console.log(prov);
  } catch (error) {
    console.log("error: " + error);
  }
};

const resetForm = () => {
  proveedor.value = {
    nombre: "",
    nit: 0,
    detalles: "",
    estado: "ACTIVO",
  };
};
</script>

<style scoped type="text/css"></style>
