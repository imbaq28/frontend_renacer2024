<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
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
        <q-td :props="props" style="width: 100px">
          <q-btn
            icon="edit"
            color="primary"
            @click="modificarDatos(props.row)"
          />
          <q-btn icon="delete" color="red" @click="borrarDatos(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import CrearMedicamento from "src/components/CrearMedicamento.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarMedicamento = ref(false);
const medicamento = ref({});

const columns = [
  {
    name: "acciones",
    label: "Botones",
    align: "left",
    field: "acciones",
  },
  {
    name: "id_nombre",
    label: "Nombre Quimico",
    align: "left",
    field: (row) => row.nombreProducto.nombre,
  },

  {
    name: "id_categoria",
    label: "Categoria",
    field: (row) => row.categoria.nombre,
  },

  { name: "descripcion", label: "Descripcion", field: "descripcion" },

  {
    name: "fecha_vencimiento",
    label: "Fecha de vencimiento",
    field: "fechaVencimiento",
  },

  {
    name: "imagen",
    label: "Imagen",
    field: "imagen",
  },

  { name: "lote", label: "Numero de lote", field: "lote" },

  {
    name: "nombre_comercial",
    align: "center",
    label: "Nombre Comercial",
    field: "nombreComercial",
  },

  {
    name: "precio_compra",
    label: "Precio de Compra",
    field: "precioCompra",
  },

  {
    name: "id_presentacion",
    label: "Presentacion",
    field: (row) => row.presentacion.nombre,
  },

  {
    name: "id_proveedor",
    label: "Proveedor",
    field: (row) => row.proveedor.nombre,
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

const loading = ref(false);
const filter = ref("");
const rows = ref([]);

async function traerDatos() {
  const medicamento = await api.get("/farmacia/medicamento");
  rows.value = medicamento.data.datos;
  console.log(medicamento);
}

function modificarDatos(datos) {
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
