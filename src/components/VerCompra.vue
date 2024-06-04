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

        <CrearCompra
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarCompra="editarCompra"
          :comp="compra"
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
import CrearCompra from "src/components/CrearCompra.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarCompra = ref(false);
const compra = ref({});

const columns = [
  {
    name: "acciones",
    label: "Botones",
    align: "left",
    field: "acciones",
  },
  {
    name: "id_nombre",
    label: "Nombre Comercial",
    align: "left",
    field: (row) => row.nombreProducto.nombre,
  },

  { name: "cantidad", label: "Cantidad", field: "cantidad" },

  { name: "observaciones", label: "Observaciones", field: "observaciones" },

  {
    name: "fecha_vencimiento",
    label: "Fecha de vencimiento",
    field: "fechaVencimiento",
  },

  { name: "lote", label: "Numero de lote", field: "lote" },

  {
    name: "precioCompra",
    label: "Precio de Compra",
    field: "precioCompra",
  },

  {
    name: "idProveedor",
    label: "Proveedor",
    field: (row) => row.proveedor.nombre,
  },

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
  const compra = await api.get("/farmacia/compras");
  rows.value = compra.data.datos;
  console.log("Esto es una compra", compra);
}

function modificarDatos(datos) {
  editarCompra.value = true;
  compra.value = datos;
}

function cerrar() {
  editarCompra.value = false;
  compra.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Compra",
      message: "¿Esta seguro de eliminar esta COmpra?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        await api.delete("/farmacia/compras/" + id);
        console.log("Borrado de Medicamento correctamente");
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: "COMPRA DE MEDICAMENTO ELIMINADA",
        });
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
