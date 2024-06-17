<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[10, 15, 20, 25]"
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
        <CrearProveedor
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarProveedor="editarProveedor"
          :prov="proveedor"
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
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import CrearProveedor from "src/components/CrearProveedor.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

//const refrescarTabla = ref(false);
const editarProveedor = ref(false);
const proveedor = ref({});
const provs = ref({});

const columns = [
  {
    name: "acciones",
    label: "Edit/Eli",
    align: "left",
    field: "acciones",
  },

  {
    name: "nombre",
    align: "left",
    label: "Nombre del Proveedor",
    field: "nombre",
    sortable: true,
  },
  { name: "nit", label: "NIT", field: "nit", align: "left" },
  { name: "direccion", label: "Direccion", field: "direccion", align: "left" },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");
const rows = ref([]);

async function traerDatos() {
  const proveedor = await api.get("/farmacia/proveedores");
  rows.value = proveedor.data.datos;
  provs.value = proveedor.data.datos;
}

function modificarDatos(datos) {
  editarProveedor.value = true;
  proveedor.value = datos;
}

function cerrar() {
  editarProveedor.value = false;
  proveedor.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Proveedor",
      message: "¿Esta seguro de eliminar este Proveedor?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        const del = provs.value.find((nombre) => nombre.id === id);
        await api.delete("/farmacia/proveedores/" + id);
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: `PROVEEDOR ${del.nombre} ELIMINADO`,
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
    $q.notify({
      position: "bottom",
      timeout: 3500,
      color: "red-5",
      textColor: "White",
      actions: [{ icon: "close", color: "white" }],
      message: `ERROR, el Proveedor ${del.nombre} no pudo ser eliminado`,
    });
  }
}
</script>
