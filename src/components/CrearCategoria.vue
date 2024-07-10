<template>
  <q-btn
    label="NUEVA CATEGORIA"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos de la nueva CATEGORIA</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <div class="col-12">
              <q-input
                v-model="categoria.nombre"
                label="Nombre del tipo de Categoria:"
                :rules="[
                  (val) => !!val || 'El nombre de Categoria es obligatorio...',
                  (val) =>
                    val.length > 3 ||
                    'La categoria debe tener minimamente 3 letras',
                ]"
              />
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
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="CANCELAR" color="primary" @click="cerrarModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const props = defineProps(["editarCategoria", "cat"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];

const $q = useQuasar();

const categoria = ref({
  nombre: "",
  detalle: "",
  estado: "ACTIVO",
  id: "",
});

const alert = ref(false);

watch(
  () => props.editarCategoria,
  () => {
    if (props.editarCategoria) {
      alert.value = true;
      categoria.value = {
        nombre: props.cat.nombre,
        detalle: props.cat.detalle,
        estado: props.cat.estado,
        id: props.cat.id,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    await api.post("/farmacia/categoria", categoria.value);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "primary",
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
      message: `CATEGORIA ${categoria.value.nombre} CREADA...`,
    });
    resetForm();
    alert.value = false;
    emit("traerDatos");
  } catch (error) {
    console.log("error: " + error);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "red-5",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: "EROOR, No se pudo guardar la categoria...",
    });
  }
};

const resetForm = () => {
  categoria.value = {
    nombre: "",
    detalle: "",
    estado: "ACTIVO",
    id: "",
  };
};

const modificarCategoria = async () => {
  try {
    await api.put(`/farmacia/categoria/${categoria.value.id}`, categoria.value);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "purple",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `Categoria ${categoria.value.nombre} MODIFICADA`,
    });
    resetForm();
    emit("traerDatos");
    cerrarModal();
  } catch (error) {
    console.log("error: " + error);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "red-5",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `EROOR, No se pudo Modificar la categoria ${categoria.value.nombre}`,
    });
  }
};

function cerrarModal() {
  alert.value = false;
  emit("cerrar");
  resetForm();
}
</script>
<style scoped type="text/css"></style>
