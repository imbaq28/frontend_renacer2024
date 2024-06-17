<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[10, 15, 20, 25]"
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
        <q-td :props="props" style="width: 50px">
          <q-btn
            icon="edit"
            color="primary"
            @click="modificarDatos(props.row)"
            style="width: 25px"
            padding="2px"
          />
          <q-btn
            icon="delete"
            color="red"
            @click="borrarDatos(props.row.id)"
            style="width: 25px"
            padding="2px"
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
import CrearCompra from "src/components/CrearCompra.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarCompra = ref(false);
const compra = ref({});

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
  const nom = await api.get("/farmacia/nombre");
  nombres.value = nom.data.datos;
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
const nombres = ref([]);

async function traerDatos() {
  const compra = await api.get("/farmacia/compras");
  rows.value = compra.data.datos;
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
      message: "¿Esta seguro de eliminar esta Compra?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        const nomComp = rows.value.find((nombre) => nombre.id === id);
        console.log("AAAAAAAAAAAAAA", nomComp, id);
        await api.delete("/farmacia/compras/" + id);
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: `Compra de medicamento ${nomComp.nombreProducto.nombre} ELIMINADA`,
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
