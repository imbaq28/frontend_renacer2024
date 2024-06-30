<template>
  <q-btn
    label="NUEVO ROL"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos del nuevo ROL</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <div class="col-12">
              <q-input
                v-model="roles.nombre"
                label="Nombre del tipo de ROL:"
                style="width: 250px"
                :rules="[
                  (val =
                    (val && val.length > 0) ||
                    'El nombre de la ROL es obligatorio...'),
                ]"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="roles.descripcion"
                label="Descripcion"
                filled
                type="textarea"
              />
            </div>

            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="roles.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarRol"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />

              <q-btn
                v-if="editarRol"
                label="Modificar"
                color="primary"
                @click="modificarRol"
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
import { ref, watch, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const props = defineProps(["editarRol", "rol"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];

const $q = useQuasar();
const option = ref([]);

onMounted(async () => {
  const rols = await api.get("/system/roles");
  console.log("se obtubo datos del rol", rols.data.datos);
  option.value = rols.data.datos;
});

const roles = ref({
  nombre: "",
  descripcion: "",
  estado: "ACTIVO",
  id: "",
});

const alert = ref(false);

watch(
  () => props.editarRol,
  () => {
    if (props.editarRol) {
      alert.value = true;
      roles.value = {
        nombre: props.rol.nombre,
        descripcion: props.rol.descripcion,
        estado: props.rol.estado,
        id: props.rol.id,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    const rol = await api.post("/system/roles", roles.value);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "primary",
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
      message: `ROL ${roles.value.nombre} CREADO`,
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
      message: "No se pudo crear el ROL",
    });
  }
};

const resetForm = () => {
  roles.value = {
    nombre: "",
    descripcion: "",
    estado: "ACTIVO",
    id: "",
  };
};

const modificarRol = async () => {
  try {
    await api.put(`/system/roles/${roles.value.id}`, roles.value);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "purple",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `ROL ${roles.value.nombre} MODIFICADO`,
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
      message: `No se pudo modificar el rol ${roles.value.nombre}`,
    });
  }
};

function cerrarModal() {
  alert.value = false;
  emit("cerrar");
}
</script>
<style scoped type="text/css"></style>
