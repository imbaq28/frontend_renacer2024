<template>
  <q-btn
    label="Cliernte Nuevo"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <div class="text-h4">Cliente Nuevo</div>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="row q-col-gutter-md" style="width: 300px">
            <div class="col-12">
              <q-input v-model="usuario.nombres" label="Nombres" />
            </div>
            <div class="col-12">
              <q-input
                v-model="usuario.primerApellido"
                label="Apellido Paterno"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="usuario.segundoApellido"
                label="Apellido Materno"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="usuario.numeroDocumento"
                label="Carnet de Identidad o NIT"
              />
            </div>

            <div class="col-12">
              <q-input v-model="usuario.celular" label="Numero de celular" />
            </div>

            <div class="col-12">
              <q-input filled v-model="usuario.correoElectronico" type="email">
                <template v-slot:before>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>

            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="usuario.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarUsuario"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />

              <q-btn
                v-if="editarUsuario"
                label="Modificar"
                color="primary"
                @click="modificarUsuario"
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
import { useQuasar } from "quasar";

const props = defineProps(["editarUsuario", "usu"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const $q = useQuasar();
const date = ref("2025/02/01");
//const tipos = ["Usuario", "Cliente", "no se sabe"];
const opciones = ["ACTIVO", "INACTIVO"];
const alert = ref(false);

const usuario = ref({
  id: "",
  nombres: "",
  primerApellido: "",
  segundoApellido: "",
  celular: "",
  correoElectronico: "",
  numeroDocumento: 0,
  estado: "ACTIVO",
  idRol: "924a9919-45af-4ca5-a22e-4da1e89c663d",
});

watch(
  () => props.editarUsuario,
  () => {
    if (props.editarUsuario) {
      alert.value = true;
      usuario.value = {
        id: props.usu.id,
        nombres: props.usu.nombres,
        primerApellido: props.usu.primerApellido,
        segundoApellido: props.usu.segundoApellido,
        celular: props.usu.celular,
        correoElectronico: props.usu.correoElectronico,
        numeroDocumento: props.usu.numeroDocumento,
        estado: props.usu.estado,
        idRol: props.usu.idRol,
      };
    }
  }
);
const enviarForm = async () => {
  try {
    console.log("USUARIOS", usuario.value);
    await api.post("/system/usuario", usuario.value);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "primary",
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
      message: "CLIENTE CREADO",
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
      message: "No se pudo crear el Cliente",
    });
    resetForm();
  }
};

const resetForm = () => {
  usuario.value = {
    id: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    celular: "",
    correoElectronico: "",
    numeroDocumento: 0,
    estado: "ACTIVO",
    idRol: "924a9919-45af-4ca5-a22e-4da1e89c663d",
  };
};

const modificarUsuario = async () => {
  try {
    console.log("MODIFI MAL", usuario.value);
    await api.put(`/system/usuario/${usuario.value.id}`, usuario.value);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "purple",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `USUARIO ${usuario.value.usuario} MODIFICADO`,
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
      message: "No se pudo MODIFICAR Usuario",
    });
  }
};

function cerrarModal() {
  alert.value = false;
  emit("cerrar");
  resetForm();
}
</script>

<style></style>
