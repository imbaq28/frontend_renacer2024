<template>
  <q-btn
    label="NUEVA NOM"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos del nuevo NOMBRE</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <div class="col-12">
              <q-input
                v-model="nombree.nombre"
                label="Nombre del tipo de Nombre:"
              />
            </div>

            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="nombree.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarNombre"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />
              <q-btn
                v-if="editarNombre"
                label="Modificar"
                color="primary"
                @click="modificarNombre"
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
        <q-btn flat label="OK" color="primary" @click="cerrarModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { api } from "boot/axios";

const props = defineProps(["editarNombre", "nom"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];

const nombree = ref({
  nombre: "",
  estado: "ACTIVO",
  id: "",
});

const alert = ref(false);

watch(
  () => props.editarNombre,
  () => {
    if (props.editarNombre) {
      alert.value = true;
      nombree.value = {
        nombre: props.nom.nombre,
        estado: props.nom.estado,
        id: props.nom.id,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    const nom = await api.post("/farmacia/nombre", nombree.value);
    resetForm();
    alert.value = false;
    emit("traerDatos");
  } catch (error) {
    console.log("error: " + error);
  }
};

const resetForm = () => {
  nombree.value = {
    nombre: "",
    estado: "ACTIVO",
    id: "",
  };
};

const modificarNombre = async () => {
  try {
    await api.put(`/farmacia/nombre/${nombree.value.id}`, nombree.value);
    resetForm();
    emit("traerDatos");
    cerrarModal();
  } catch (error) {
    console.log("error: " + error);
  }
};

function cerrarModal() {
  alert.value = false;
  emit("cerrar");
}
</script>

<style scoped type="text/css"></style>
