<template>
  <q-page padding>
    <h4>Agregar Categoria</h4>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <div>
        <CrearCategoria
          :refrescarTabla="refrescarTabla"
          @capturarDatos="capturarDatos"
        />
      </div>
      <div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="col"></div>
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
          <q-btn
            v-if="!editarCategoria"
            label="Submit"
            color="primary"
            type="submit"
            style="width: 90px"
          />
          <q-btn
            v-if="editarCategoria"
            label="Modificar"
            color="primary"
            @click="modificarCategoria"
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
import CrearCategoria from "src/components/CrearCategoria.vue";

const opciones = ["ACTIVO", "INACTIVO"];
const refrescarTabla = ref(false);
const editarCategoria = ref(false);

const categoria = ref({
  nombre: "",
  detalle: "",
  estado: "ACTIVO",
  id: "",
});

const enviarForm = async () => {
  try {
    const cat = await api.post("/farmacia/categoria", categoria.value);
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
  categoria.value = {
    nombre: "",
    detalle: "",
    estado: "ACTIVO",
    id: "",
  };
  editarCategoria.value = false;
};

const capturarDatos = (datos) => {
  editarCategoria.value = true;
  categoria.value = {
    nombre: datos.nombre,
    detalle: datos.detalle,
    estado: datos.estado,
    id: datos.id,
  };
  console.log("capturados", datos);
};
const modificarCategoria = async () => {
  try {
    await api.put(`/farmacia/categoria/${categoria.value.id}`, categoria.value);
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
