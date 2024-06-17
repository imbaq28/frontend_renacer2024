<template>
  <q-btn
    label="NUEVA COMPRA"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />

  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos de la nueva COMPRA</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <q-select
              filled
              v-model="compra.idNombre"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="option"
              @filter="filterFn"
              hint="Nombre Comercial"
              emit-value
              map-options
              option-value="id"
              option-label="nombre"
              style="width: 250px; padding-bottom: 32px"
              :rules="[
                (val) => !!val || 'El nombre del Medicamento es obligatorio...',
                (val) =>
                  val.length > 3 ||
                  'El medicamento debe tener minimamente 3 letras...',
              ]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Medicamento inexistente
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="col-12" style="width: 100px">
              <q-input
                v-model="compra.cantidad"
                label="Cantidad"
                :readonly="editarCompra"
              />
            </div>

            <div class="col-12" style="width: 100px">
              <q-select
                label="Estado"
                v-model="compra.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12" style="width: 125px">
              <q-input v-model="compra.lote" label="Lote" />
            </div>
            <div class="col-12" style="width: 75px">
              <q-input v-model="compra.precioCompra" label="Precio de Compra" />
            </div>

            <div class="q-pa-md">
              <q-input
                filled
                v-model="compra.fechaVencimiento"
                label="Fecha de Vencimiento"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="compra.fechaVencimiento"
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
                v-model="compra.observaciones"
                label="Observaciones"
                filled
                type="textarea"
              />
            </div>

            <div class="col-12">
              <q-select
                filled
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                label="Proveedor"
                v-model="compra.idProveedor"
                :options="option2"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarCompra"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />
              <q-btn
                v-if="editarCompra"
                label="Modificar"
                color="primary"
                @click="modificarCompra"
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

const $q = useQuasar();

const props = defineProps(["editarCompra", "comp"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];

const date = ref("2025/02/01");
const compra = ref({
  id: "",
  idNombre: "",
  cantidad: 0,
  observaciones: "",
  fechaVencimiento: "2025/01/01",
  lote: "",
  precioCompra: 0.0,
  idProveedor: "",
  estado: "ACTIVO",
});

const alert = ref(false);

const proveedores = ref([]);
const nombres = ref([]);
const option = ref([]);
const option2 = ref([]);

onMounted(async () => {
  const prov = await api.get("/farmacia/proveedores");
  //console.log("se ejecuto", prov.data.datos);
  proveedores.value = prov.data.datos;
  option2.value = prov.data.datos;

  const noms = await api.get("/farmacia/nombre");
  //console.log("se ejecuto", noms.data.datos);
  nombres.value = noms.data.datos;
  option.value = noms.data.datos;
});

watch(
  () => props.editarCompra,
  () => {
    if (props.editarCompra) {
      alert.value = true;
      compra.value = {
        id: props.comp.id,
        idNombre: props.comp.idNombre,
        cantidad: props.comp.cantidad,
        observaciones: props.comp.observaciones,
        fechaVencimiento: props.comp.fechaVencimiento,
        lote: props.comp.lote,
        precioCompra: props.comp.precioCompra,
        idProveedor: props.comp.idProveedor,
        estado: props.comp.estado,
      };
    }
  }
);
function filterFn(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    option.value = nombres.value.filter(
      (v) => v.nombre.toLowerCase().indexOf(needle) > -1
    );
  });
}

const enviarForm = async () => {
  try {
    await api.post("/farmacia/compras", compra.value);
    const nombreMedicamento = nombres.value.find(
      (nombre) => nombre.id === compra.value.idNombre
    );
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "primary",
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
      message: `Compra del medicamento ${nombreMedicamento.nombre} ACTUALIZADO`,
    });
    resetForm();
    alert.value = false;
    emit("traerDatos");
  } catch (error) {
    console.log("error: " + error);
    resetForm();
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "red-5",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: "No se pudo crear el medicamento...",
    });
    cerrarModal();
  }
};

const resetForm = () => {
  compra.value = {
    id: "",
    idNombre: "",
    cantidad: 0,
    observaciones: "",
    fechaVencimiento: "2025/01/01",
    lote: "",
    precioCompra: 0.0,
    idProveedor: "",
    estado: "ACTIVO",
  };
};

const modificarCompra = async () => {
  try {
    await api.put(`/farmacia/compras/${compra.value.id}`, compra.value);
    const nombreMedicamento = nombres.value.find(
      (nombre) => nombre.id === compra.value.idNombre
    );
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "purple",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `COMPRA ${nombreMedicamento.nombre} MODIFICADA`,
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
