<template>
  <q-btn
    label="USUARIO NUEVO"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <div class="text-h4">Formulario de Adicion de USUARIO</div>

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
              <q-input v-model="usuario.usuario" label="Nombre de Usuario" />
            </div>
            <div class="col-12">
              <q-input v-model="usuario.contrasena" label="Contraseña" />
            </div>

            <div class="q-pa-md">
              <q-input
                filled
                v-model="usuario.fechaNacimiento"
                label="Fecha de Nacimiento"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="usuario.fechaNacimiento"
                        mask="DD-MM-YYYY"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="col-12">
              <q-input
                v-model="usuario.tipoDocumento"
                label="Tipo de documento"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="usuario.numeroDocumento"
                label="Carnet de Identidad o NIT"
              />
            </div>

            <div class="col-12">
              <q-input v-model="usuario.complemento" label="Complemento" />
            </div>

            <div class="col-12">
              <q-input v-model="usuario.telefono" label="Numero de Telefono" />
            </div>

            <div class="col-12">
              <q-input v-model="usuario.celular" label="Numero de celular" />
            </div>

            <div class="col-12">
              <q-input
                filled
                v-model="usuario.correoElectronico"
                type="email"
                suffix="@gmail.com"
              >
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
  tipoDocumento: "",
  complemento: "",
  fechaNacimiento: "1980/01/01",
  nombres: "",
  primerApellido: "",
  segundoApellido: "",
  usuario: "",
  contrasena: "",
  telefono: "",
  celular: "",
  correoElectronico: "",
  numeroDocumento: 0,
  estado: "ACTIVO",
});

watch(
  () => props.editarUsuario,
  () => {
    if (props.editarUsuario) {
      alert.value = true;
      usuario.value = {
        id: props.usu.id,
        tipoDocumento: props.usu.tipoDocumento,
        complemento: props.usu.complemento,
        fechaNacimiento: props.usu.fechaNacimiento,
        nombres: props.usu.nombres,
        primerApellido: props.usu.primerApellido,
        segundoApellido: props.usu.segundoApellido,
        usuario: props.usu.usuario,
        contrasena: props.usu.contrasena,
        telefono: props.usu.telefono,
        celular: props.usu.celular,
        correoElectronico: props.usu.correoElectronico,
        numeroDocumento: props.usu.numeroDocumento,
        estado: props.usu.estado,
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
      message: "USUARIO CREADO",
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
      message: "No se pudo guardar Usuario",
    });
    resetForm();
  }
};

const resetForm = () => {
  usuario.value = {
    id: "",
    tipoDocumento: "",
    complemento: "",
    fechaNacimiento: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    usuario: "",
    contrasena: "",
    telefono: "",
    celular: "",
    correoElectronico: "",
    numeroDocumento: 0,
    estado: "ACTIVO",
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
