<template>
  <q-btn
    label="NUEVO MED"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos del nuevo MEDICAMENTO</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <q-select
              filled
              v-model="medicamento.idNombre"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="nombres"
              @filter="filterFn"
              hint="Nombre Comercial"
              emit-value
              map-options
              option-value="id"
              option-label="nombre"
              style="width: 250px; padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="row">
              <div class="col">
                <div class="col-12" style="width: 100px">
                  <q-input v-model="medicamento.stock" label="Stock" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="col-12" style="width: 200px">
                  <q-input
                    v-model="medicamento.precioVenta"
                    label="Precio de Venta"
                  />
                </div>
                <div class="col-12" style="width: 200px">
                  <q-input
                    v-model="medicamento.precioUnitario"
                    label="Precio unitario"
                  />
                </div>
              </div>
            </div>
            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="medicamento.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="medicamento.descripcion"
                label="Detalles"
                filled
                type="textarea"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarMedicamento"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />
              <q-btn
                v-if="editarMedicamento"
                label="Modificar"
                color="primary"
                @click="modificarMedicamento"
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

const props = defineProps(["editarMedicamento", "med"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];

const medicamento = ref({
  id: "",
  idNombre: "",
  precioVenta: 0.0,
  precioUnitario: 0.0,
  stock: 0,
  estado: "ACTIVO",
});

const alert = ref(false);

const nombres = ref([]);

onMounted(async () => {
  const noms = await api.get("/farmacia/nombre");
  console.log("se ejecuto", noms.data.datos);
  nombres.value = noms.data.datos;
});

watch(
  () => props.editarMedicamento,
  () => {
    if (props.editarMedicamento) {
      alert.value = true;
      medicamento.value = {
        id: props.med.id,
        idNombre: props.med.idNombre,
        /*idCategoria: props.med.idCategoria,
        descripcion: props.med.descripcion,
        fechaVencimiento: props.med.fechaVencimiento,
        imagen: props.med.imagen,
        lote: props.med.lote,
        nombreComercial: props.med.nombreComercial,
        precioCompra: props.med.precioCompra,
        idPresentacion: props.med.idPresentacion,
        idProveedor: props.med.idProveedor,*/
        precioVenta: props.med.precioVenta,
        precioUnitario: props.med.precioUnitario,
        stock: props.med.stock,
        estado: props.med.estado,
      };
    }
  }
);

const enviarForm = async () => {
  try {
    console.log("MEDICAMENTO", medicamento.value);

    const med = await api.post("/farmacia/medicamento", medicamento.value);
    resetForm();
    alert.value = false;
    emit("traerDatos");
  } catch (error) {
    console.log("error: " + error);
  }
};

const resetForm = () => {
  medicamento.value = {
    id: "",
    idNombre: "",
    /*idCategoria: "",
    descripcion: "",
    fechaVencimiento: "",
    imagen: "",
    lote: "",
    nombreComercial: "",
    precioCompra: 0.0,
    idPresentacion: "",
    idProveedor: "",*/
    precioVenta: 0.0,
    precioUnitario: 0.0,
    stock: 0,
    estado: "ACTIVO",
  };
};

const modificarMedicamento = async () => {
  try {
    await api.put(
      `/farmacia/medicamento/${medicamento.value.id}`,
      medicamento.value
    );
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
