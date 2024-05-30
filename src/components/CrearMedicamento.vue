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
            <div class="col-12">
              <q-input
                v-model="medicamento.nombreComercial"
                label="Nombre comercial"
              />
            </div>

            <div class="col-12">
              <q-select
                label="Nombre Quimico"
                v-model="medicamento.idNombre"
                :options="nombres"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
              />
            </div>

            <div class="col-12">
              <q-select
                label="Presentación"
                v-model="medicamento.idPresentacion"
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
                v-model="medicamento.idCategoria"
                :options="categorias"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
              />
            </div>
            <div class="col-12">
              <q-select
                label="Imagen"
                v-model="medicamento.imagen"
                :options="opciones"
              />
            </div>
            <div class="col-12">
              <q-select
                label="Proveedor"
                v-model="medicamento.idProveedor"
                :options="proveedores"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
              />
            </div>
            <div class="row">
              <div class="col">
                <div class="col-12" style="width: 100px">
                  <q-input v-model="medicamento.stock" label="Stock" />
                </div>
                <div class="col-12" style="width: 200px">
                  <q-input
                    v-model="medicamento.precioCompra"
                    label="Precio de Compra"
                  />
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
              <q-input v-model="medicamento.lote" label="Numero de Lote" />
            </div>
            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="medicamento.estado"
                :options="opciones"
              />
            </div>
            <div class="col-12">
              <div class="q-pa-md">
                <q-input
                  filled
                  v-model="medicamento.fechaVencimiento"
                  mask="date"
                  :rules="['date']"
                  label="Fecha de Vencimiento"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="medicamento.fechaVencimiento">
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

//const date = ref("2025/02/01");
const medicamento = ref({
  id: "",
  idNombre: "4e4a88b4-d8ea-406c-b64b-60b38ab6b7ac",
  idCategoria: "",
  descripcion: "",
  fechaVencimiento: "2025/01/01",
  imagen: "",
  lote: "",
  nombreComercial: "aspirina",
  precioCompra: 0.0,
  idPresentacion: "f5ed9b0c-46c9-422d-a785-e30533af26df",
  idProveedor: "a825ae7a-e203-40e7-9287-17b0ae2bf435",
  precioVenta: 0.0,
  precioUnitario: 0.0,
  stock: 0,
  estado: "ACTIVO",
});

const alert = ref(false);
const categorias = ref([]);
const proveedores = ref([]);
const presentaciones = ref([]);
const nombres = ref([]);

onMounted(async () => {
  const cat = await api.get("/farmacia/categoria");
  console.log("se ejecuto", cat.data.datos);
  categorias.value = cat.data.datos;

  const prov = await api.get("/farmacia/proveedores");
  console.log("se ejecuto", prov.data.datos);
  proveedores.value = prov.data.datos;

  const pres = await api.get("/farmacia/presentacion");
  console.log("se ejecuto", pres.data.datos);
  presentaciones.value = pres.data.datos;

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
        idCategoria: props.med.idCategoria,
        descripcion: props.med.descripcion,
        fechaVencimiento: props.med.fechaVencimiento,
        imagen: props.med.imagen,
        lote: props.med.lote,
        nombreComercial: props.med.nombreComercial,
        precioCompra: props.med.precioCompra,
        idPresentacion: props.med.idPresentacion,
        idProveedor: props.med.idProveedor,
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
    idCategoria: "",
    descripcion: "",
    fechaVencimiento: "",
    imagen: "",
    lote: "",
    nombreComercial: "",
    precioCompra: 0.0,
    idPresentacion: "",
    idProveedor: "",
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
