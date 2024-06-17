<template>
  <q-btn
    label="NUEVO NOM"
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
                label="Nombre Comercial:"
                :rules="[
                  (val) => !!val || 'El nombre Comercial es obligatorio...',
                  (val) =>
                    val.length >= 3 ||
                    'El Nombre Comercial debe tener minimamente 3 letras',
                ]"
              />
            </div>

            <div class="col-12">
              <q-select
                label="Presentación"
                v-model="nombree.idPresentacion"
                :options="presentaciones"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
              />
            </div>
            <div class="col-12">
              <q-select
                label="Categoria"
                v-model="nombree.idCategoria"
                :options="categorias"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="nombree.nombreQuimico"
                label="Nombre Químico:"
              />
            </div>

            <div class="col-12">
              <q-input v-model="nombree.descripcion" label="Descripción:" />
            </div>

            <div class="col-12">
              <q-input v-model="nombree.imagen" label="Imágen:" />
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
import { ref, watch, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const props = defineProps(["editarNombre", "nom"]);
const emit = defineEmits(["traerDatos", "cerrar"]);
const $q = useQuasar();

const opciones = ["ACTIVO", "INACTIVO"];

const nombree = ref({
  nombre: "",
  idPresentacion: "",
  idCategoria: "",
  nombreQuimico: "",
  descripcion: "",
  imagen: "",
  estado: "ACTIVO",
  id: "",
});

const alert = ref(false);
const categorias = ref([]);
const presentaciones = ref([]);

onMounted(async () => {
  const cat = await api.get("/farmacia/categoria");
  console.log("se ejecuto", cat.data.datos);
  categorias.value = cat.data.datos;

  const pres = await api.get("/farmacia/presentacion");
  console.log("se ejecuto", pres.data.datos);
  presentaciones.value = pres.data.datos;
});

watch(
  () => props.editarNombre,
  () => {
    if (props.editarNombre) {
      alert.value = true;
      nombree.value = {
        nombre: props.nom.nombre,
        idPresentacion: props.nom.idPresentacion,
        idCategoria: props.nom.idCategoria,
        nombreQuimico: props.nom.nombreQuimico,
        descripcion: props.nom.descripcion,
        imagen: props.nom.imagen,
        estado: props.nom.estado,
        id: props.nom.id,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    const nom = await api.post("/farmacia/nombre", nombree.value);
    $q.notify({
      position: "bottom",
      timeout: 4500,
      color: "primary",
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
      message: `Medicamento ${nombree.value.nombre} Creado`,
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
      message: `ERROR, no se pudo crear el Medicamento ${nombree.value.nombre}`,
    });
  }
};

const resetForm = () => {
  nombree.value = {
    nombre: "",
    idPresentacion: "",
    idCategoria: "",
    nombreQuimico: "",
    descripcion: "",
    imagen: "",
    estado: "ACTIVO",
    id: "",
  };
};

const modificarNombre = async () => {
  try {
    await api.put(`/farmacia/nombre/${nombree.value.id}`, nombree.value);
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "purple",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `El medicamento ${nombree.value.nombre} a sido MODIFICADO`,
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
}
</script>

<style scoped type="text/css"></style>
