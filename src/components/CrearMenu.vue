<template>
  <q-btn
    label="NUEVO MENU"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos del nuevo MENU</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <div class="col-12">
              <q-input
                v-model="menu.nombre"
                label="Nombre del Menu:"
                :rules="[
                  (val =
                    (val && val.length > 0) ||
                    'El nombre de la Menu es obligatorio...'),
                ]"
              />
            </div>

            <div class="col-12">
              <q-input v-model="menu.ruta" label="Ruta" filled />
            </div>

            <div class="col-12">
              <q-input v-model="menu.icono" label="Icono" filled />
            </div>

            <div class="col-12">
              <q-input v-model="menu.orden" label="Orden" filled />
            </div>

            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="menu.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarMenu"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />

              <q-btn
                v-if="editarMenu"
                label="Modificar"
                color="primary"
                @click="modificarMenu"
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

const props = defineProps(["editarMenu", "men"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];

const $q = useQuasar();

const menu = ref({
  nombre: "",
  ruta: "",
  icono: "",
  orden: "",
  estado: "ACTIVO",
  id: "",
});

const alert = ref(false);

watch(
  () => props.editarMenu,
  () => {
    if (props.editarMenu) {
      alert.value = true;
      menu.value = {
        nombre: props.men.nombre,
        ruta: props.men.ruta,
        icono: props.men.icono,
        orden: props.men.orden,
        estado: props.men.estado,
        id: props.men.id,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    if (menu.value.nombre.length > 0) {
      const men = await api.post("/system/menu", menu.value);
      $q.notify({
        position: "bottom",
        timeout: 4500,
        color: "primary",
        textColor: "white",
        actions: [{ icon: "close", color: "white" }],
        message: "MENU CREADO",
      });
      resetForm();
      alert.value = false;
      emit("traerDatos");
    } else {
      $q.notify({
        position: "bottom",
        timeout: 4500,
        color: "red-5",
        textColor: "White",
        actions: [{ icon: "close", color: "white" }],
        message: "El nombre del MENU es obligarotiro",
      });
    }
  } catch (error) {
    console.log("error: " + error);
  }
};

const resetForm = () => {
  menu.value = {
    nombre: "",
    ruta: "",
    icono: "",
    orden: "",
    estado: "ACTIVO",
    id: "",
  };
};

const modificarMenu = async () => {
  try {
    const valorCambiado = await api.put(
      `/system/menu/${menu.value.id}`,
      menu.value
    );
    console.log("MODI MENU", valorCambiado);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "purple",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `Menu ${menu.value.nombre} MODIFICADO`,
    });
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
  resetForm();
}
</script>
<style scoped type="text/css"></style>
