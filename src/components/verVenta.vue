<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      rows-per-page-label="Medicamentos por pagina"
      :rows-per-page-options="[5, 10]"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Traer Datos"
          @click="traerDatos"
        />

        <q-space />

        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          label="Medicamento a buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body-cell-acciones="props">
        <q-td :props="props">
          <q-btn
            icon="ti-plus"
            color="orange"
            @click="agregar(props.row.id)"
            style="width: 25px"
            padding="1px"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
//import { data } from "autoprefixer";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarMedicamento = ref(false);
//const medicamento = ref({});
const nombres = ref([]);
const fila = ref([]);

onMounted(async () => {
  await traerDatos();

  const noms = await api.get("/farmacia/nombre");
  //console.log("se obtubo datos del medicamento nombre", noms.data.datos);
  nombres.value = noms.data.datos;
});

watch(
  () => props.refrescarTabla,
  async () => {
    if (props.refrescarTabla) {
      await traerDatos();
      console.log("cambio el valor");
    }
  }
);

const loading = ref(false);
const filter = ref("");
const rows = ref([]);

async function traerDatos() {
  const medicamento = await api.get("/farmacia/medicamento");
  rows.value = medicamento.data.datos;
  //console.log("TEST MEDI", medicamento.data.datos);
}

function modificarDatos(datos) {
  console.log("MODIFICANDO MEDICAMENTO", medicamento.value);
  editarMedicamento.value = true;
  medicamento.value = datos;
}

function cerrar() {
  editarMedicamento.value = false;
  medicamento.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Medicamento",
      message: "¿Esta seguro de eliminar esta Medicamento?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        await api.delete("/farmacia/medicamento/" + id);
        console.log("Borrado de Medicamento correctamente");
        await traerDatos();
      })
      .onOk(async () => {})
      .onCancel(() => {})
      .onDismiss(() => {});
  } catch (error) {
    console.log(error);
  }
}
const cantidad = ref();

function agregar(id) {
  const controlProd = rows.value.find((row) => row.id === id);
  //console.log("RTERSTD", controlProd);
  try {
    $q.dialog({
      title: "Cantidad para Agregar",
      message: "¿Cuantos desea agregar?",
      cancel: true,
      persistent: true,
      prompt: {
        type: "number",
        min: 1,
      },
    })
      .onOk(async (data) => {
        controlProd.cantidad = parseInt(data);
        console.log("+CANTIDAD", controlProd);
        if (cantidad.value <= controlProd.stock) {
          console.log("Cantidad enviada");
        } else {
          console.log("El stock es menor");
        }
        //await traerDatos();
      })

      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  } catch (error) {
    console.log(error, "ERROR");
  }
}

const columns = [
  {
    name: "acciones",
    label: "Agregar",
    align: "left",
    field: "acciones",
  },
  {
    name: "id_nombre",
    label: "Nombre Comercial",
    align: "left",
    field: (row) => row.nombreProducto.nombre,
  },

  {
    name: "nombreQuimico",
    label: "Nombre Químico",
    field: "nombreQuimico",
    field: (row) => row.nombreProducto.nombreQuimico,
  },

  {
    name: "precio_venta",
    label: "Precio de venta",
    field: "precioVenta",
  },

  {
    name: "precio_unitario",
    label: "Precio Unitario",
    field: "precioUnitario",
  },

  { name: "stock", label: "Stock", field: "stock" },
  { name: "estado", label: "Estado", field: "estado" },
];
</script>
