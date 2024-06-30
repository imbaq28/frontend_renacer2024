<template>
  <q-btn
    label="NUEVA PRES"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos de la nueva PRESENTACION</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <div class="col-12">
              <q-input
                v-model="presentacion.nombre"
                label="Nombre del tipo de Presentacion:"
                :rules="[
                  (val) =>
                    !!val || 'El nombre de Presentación es obligatorio...',
                  (val) =>
                    val.length >= 3 ||
                    'El tipo de presentacion debe tener minimamente 3 letras',
                ]"
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

const props = defineProps(["editarPresentacion", "pres"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];
const $q = useQuasar();

const presentacion = ref({
  nombre: "",
  detalle: "",
  estado: "ACTIVO",
  id: "",
});

const alert = ref(false);

watch(
  () => props.editarPresentacion,
  () => {
    if (props.editarPresentacion) {
      alert.value = true;
      presentacion.value = {
        nombre: props.pres.nombre,
        detalle: props.pres.detalle,
        estado: props.pres.estado,
        id: props.pres.id,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    const pres = await api.post("/farmacia/presentacion", presentacion.value);
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "primary",
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
      message: `La Presentacion ${presentacion.value.nombre} a sido CREADA`,
    });
    resetForm();
    alert.value = false;
    emit("traerDatos");
  } catch (error) {
    console.log("error: " + error);
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "red-5",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `ERROR, No se pudo crear la presentacion ${presentacion.value.nombre}`,
    });
  }
};

const resetForm = () => {
  presentacion.value = {
    nombre: "",
    detalle: "",
    estado: "ACTIVO",
    id: "",
  };
};

const modificarPresentacion = async () => {
  try {
    await api.put(
      `/farmacia/presentacion/${presentacion.value.id}`,
      presentacion.value
    );
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "purple",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `El tipo de presentacion ${presentacion.value.nombre} a sido MODIFICADO`,
    });
    resetForm();
    emit("traerDatos");
    cerrarModal();
  } catch (error) {
    console.log("error: " + error);
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "red-5",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `ERROR, No se pudo MODIFICAR la presentacion ${presentacion.value.nombre}`,
    });
  }
};

function cerrarModal() {
  alert.value = false;
  emit("cerrar");
}
</script>

<style scoped type="text/css"></style>
