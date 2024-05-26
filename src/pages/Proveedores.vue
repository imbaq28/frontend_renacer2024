<template>
  <q-page padding>
    <h4>Agregar Proveedores</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div>
        <VerProveedor
          :refrescarTabla="refrescarTabla"
          @capturarDatos="capturarDatos"
        />
      </div>
      <div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="col"></div>

      <div class="col-12">
        <q-btn
          v-if="!editarProveedor"
          label="Submit"
          color="primary"
          type="submit"
          style="width: 90px"
        />
        <q-btn
          v-if="editarProveedor"
          label="Modificar"
          color="primary"
          @click="modificarProveedor"
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
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import VerProveedor from "src/components/VerProveedor.vue";

const opciones = ["ACTIVO", "INACTIVO"];
const refrescarTabla = ref(false);
const editarProveedor = ref(false);

const proveedor = ref({
  nombre: "",
  nit: 0,
  direccion: "",
  estado: "ACTIVO",
  id: "",
});

const enviarForm = async () => {
  try {
    const prov = await api.post("/farmacia/proveedores", proveedor.value);
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
  proveedor.value = {
    nombre: "",
    nit: 0,
    direccion: "",
    estado: "ACTIVO",
    id: "",
  };
  editarProveedor.value = false;
};

const capturarDatos = (datos) => {
  editarProveedor.value = true;
  proveedor.value = {
    nombre: datos.nombre,
    nit: datos.nit,
    direccion: datos.direccion,
    estado: datos.estado,
    id: datos.id,
  };
  console.log("capturados", datos);
};

const modificarProveedor = async () => {
  try {
    await api.put(
      `/farmacia/proveedores/${proveedor.value.id}`,
      proveedor.value
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
