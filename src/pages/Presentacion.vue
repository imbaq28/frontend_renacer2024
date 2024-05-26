<template>
  <q-page padding>
    <h4>Agregar Presentacion</h4>

    <q-form @submit="enviarForm" @reset="resetForm">
      <div>
        <VerPresentacion
          :refrescarTabla="refrescarTabla"
          @capturarDatos="capturarDatos"
        />
      </div>
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
          <q-btn
            v-if="!editarPresentacion"
            label="Submit"
            color="primary"
            type="submit"
            style="width: 90px"
          />
          <q-btn
            v-if="editarPresentacion"
            label="Modificar"
            color="primary"
            @click="modificarPresentacion"
            style="width: 90px"
          />
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
import { api } from "boot/axios";
import VerPresentacion from "src/components/VerPresentacion.vue";

const opciones = ["ACTIVO", "INACTIVO"];
const refrescarTabla = ref(false);
const editarPresentacion = ref(false);

const presentacion = ref({
  nombre: "",
  detalle: "",
  estado: "ACTIVO",
  id: "",
});

const enviarForm = async () => {
  try {
    const prov = await api.post("/farmacia/presentacion", presentacion.value);
    resetForm();
    refrescarTabla.value = true;
    setTimeout(() => {
      refrescarTabla.value = false;
    }, 500);
  } catch (error) {
    console.log("error: " + error);
  }
};

const resetForm = () => {
  presentacion.value = {
    nombre: "",
    detalle: "",
    estado: "ACTIVO",
    id: "",
  };
  editarPresentacion.value = false;
};

const capturarDatos = (datos) => {
  editarPresentacion.value = true;
  presentacion.value = {
    nombre: datos.nombre,
    detalle: datos.detalle,
    estado: datos.estado,
    id: datos.id,
  };
  console.log("capturados", datos);
};

const modificarPresentacion = async () => {
  try {
    await api.put(
      `/farmacia/presentacion/${presentacion.value.id}`,
      presentacion.value
    );
    resetForm();
    refrescarTabla.value = true;
    setTimeout(() => {
      refrescarTabla.value = false;
    }, 500);
  } catch (error) {
    console.log("error: " + error);
  }
};
</script>

<style scoped type="text/css"></style>
