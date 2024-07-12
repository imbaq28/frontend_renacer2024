<template>
  <q-btn
    label="Crear Cliente"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <div class="text-h4">Crear Cliente</div>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="row q-col-gutter-md" style="width: 300px">
            <div class="col-12" style="width: 100px">
              <div class="col-12">
                <q-select
                  filled
                  v-model="usuario.idRol"
                  :options="opcionesRol"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  hint="Rol"
                  emit-value
                  map-options
                  option-value="id"
                  option-label="nombre"
                  readonly
                  style="width: 250px; padding-bottom: 32px"
                />
              </div>
            </div>
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
              <q-input v-model="usuario.celular" label="Número de celular" />
            </div>

            <div class="col-12">
              <q-input
                filled
                v-model="usuario.correoElectronico"
                type="email"
                label="Correo Electrónico"
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
        <q-btn flat label="CANCELAR" color="primary" @click="cerrarModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
const opcionesRol = ref([]);

const props = defineProps(["editarUsuario", "usu"]);
const emit = defineEmits(["traerDatos", "cerrar", "clienteCreado"]);

const $q = useQuasar();
const date = ref("2025/02/01");
//const tipos = ["Usuario", "Cliente", "no se sabe"];
const opciones = ["ACTIVO", "INACTIVO"];
const alert = ref(false);
const codigo = ref("");
const rol = ref({});

const usuario = ref({
  id: "",
  nombres: "",
  primerApellido: "",
  segundoApellido: "",
  celular: "",
  correoElectronico: "",
  numeroDocumento: 0,
  estado: "ACTIVO",
  idRol: codigo.value.id,
  fechaNacimiento: "1990/01/01",
});
//localhost:3000/api/system/usuario?idRol=a7d22363-9401-462e-a5cf-a4b5fde77c31
async function traerDatos() {
  const rol = await api.get(`/system/roles`);
  opcionesRol.value = rol.data.datos;
  codigo.value = opcionesRol.value.find(
    (nombre) => nombre.nombre === "CLIENTE"
  );
  //console.log("CODIGO", codigo.value);
  // const usu = await api.get(`/system/usuario?idRol=${codigo.value.id}`);
  // console.log("DATOS DATOS", usu);
  //rows.value = usu.data.datos;
  //console.log("DATOS DATOS", rows.value);
  usuario.value.idRol = codigo.value.id;
  rol.value = opcionesRol.value.find(
    (nombre) => nombre.id === usuario.value.idRol
  );
  console.log("DATOS cLIENTE", codigo.value);

  //console.log("se ejecuto", usuario.value.idRol);
}
onMounted(async () => {
  traerDatos();
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
        idRol: codigo.value.id,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    console.log("USUARIOS", usuario.value);
    $q.dialog({
      title: "CLIENTE CREADO",
      message:
        "El cliente a sido creado satisfactoriamente, puede tener una vista del sistema como visitante...",
    });
    const usercreado = await api.post("/system/usuario", usuario.value);
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
    emit("clienteCreado", { usercreado: usercreado.data.datos });
  } catch (error) {
    console.log("error: " + error.message);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "red-5",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: "No se pudo crear el Cliente",
    });
    resetForm();
    traerDatos();
  }
};

const resetForm = () => {
  usuario.value = {
    id: "",
    idRol: codigo.value.id,
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    celular: "",
    correoElectronico: "",
    numeroDocumento: 0,
    estado: "ACTIVO",
    fechaNacimiento: "1990/01/01",
  };
  traerDatos();
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
  traerDatos();
  resetForm();
}
</script>

<style></style>
