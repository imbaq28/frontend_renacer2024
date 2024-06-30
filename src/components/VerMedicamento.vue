<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      rows-per-page-label="Medicamentos por pagina"
      :rows-per-page-options="[10, 15, 20, 25]"
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

        <CrearMedicamento
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarMedicamento="editarMedicamento"
          :med="medicamento"
        />

        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body-cell-acciones="props">
        <q-td :props="props" style="width: 50px">
          <q-btn
            icon="edit"
            color="primary"
            @click="modificarDatos(props.row)"
            padding="4px"
          />
          <q-btn
            icon="delete"
            color="red"
            @click="borrarDatos(props.row.id)"
            padding="4px"
          />
        </q-td>
      </template>
    </q-table>
    <q-btn color="primary" label="DOWNLOAD PDF" @click="donwloadPDF()" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import CrearMedicamento from "src/components/CrearMedicamento.vue";
//import CrearCompra from "./CrearCompra.vue";
import jsPDF from "jspdf";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);
const editarMedicamento = ref(false);
const medicamento = ref({});
const loading = ref(false);
const filter = ref("");
const rows = ref([]);

const columns = [
  {
    name: "acciones",
    label: "Edit/Eli",
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
    name: "precio_venta",
    label: "Precio de venta",
    field: "precioVenta",
  },

  {
    name: "precio_unitario",
    label: "Precio Unitario",
    field: "precioUnitario",
  },

  { name: "stock", label: "Stock", field: "stock", sortable: true },
  { name: "cantidad_minima", label: "Stock Minimo", field: "cantidadMinima" },
  { name: "estado", label: "Estado", field: "estado" },
];

function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0,
    });
  }
  return result;
}

function donwloadPDF() {
  var headers = createHeaders([
    "nombreComercial",
    "precioVenta",
    "precioUnitario",
    "stock",
    "estado",
  ]);
  console.log(rows.value, "TEST");
  const body = rows.value.map((row) => {
    return {
      nombreComercial: row.nombreProducto.nombre,
      precioVenta: String(row.precioVenta),
      precioUnitario: String(row.precioUnitario),
      stock: String(row.stock),
      estado: row.estado,
    };
  });
  console.log("BODY", body);
  const pdf = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
  pdf.table(10, 10, body, headers, { autoSize: true });
  pdf.save("asd.pdf");
}

onMounted(async () => {
  await traerDatos();
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

async function traerDatos() {
  try {
    const medicamento = await api.get("/farmacia/medicamento");
    rows.value = medicamento.data.datos;
    console.log(medicamento);
  } catch (error) {
    console.log(error, "ERROR TRAER DATOS");
  }
}

function modificarDatos(datos) {
  try {
    console.log("MODIFICANDO MEDICAMENTO", medicamento.value);
    editarMedicamento.value = true;
    medicamento.value = datos;
  } catch (error) {
    console.log(error);
  }
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
      .onOk(async () => {
        // console.log('>>>> second OK catcher')
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  } catch (error) {
    console.log(error);
  }
}
</script>
