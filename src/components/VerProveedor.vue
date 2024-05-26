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
        <CrearProveedor
          :refrescarTabla="refrescarTabla"
          @capturarDatos="capturarDatos"
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
import CrearProveedor from "src/components/CrearProveedor.vue";
const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

//const refrescarTabla = ref(false);
const editarCategoria = ref(false);

const columns = [
  {
    name: "acciones",
    label: "Botones",
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
  { name: "direccion", label: "Direccion", field: "direccion", align: "left" },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
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
const rowCount = ref(10);
const rows = ref([]);

function removeRow() {
  loading.value = true;
  setTimeout(() => {
    const index = Math.floor(Math.random() * rows.value.length);
    rows.value = [
      ...rows.value.slice(0, index),
      ...rows.value.slice(index + 1),
    ];
    loading.value = false;
  }, 500);
}
async function traerDatos() {
  const proveedor = await api.get("/farmacia/proveedores");
  rows.value = proveedor.data.datos;
}

function modificarDatos(datos) {
  emit("capturarDatos", datos);
  //console.log('modificando Datos', datos);
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
        await api.delete("/farmacia/proveedores/" + id);
        console.log("Borrado de Proveedor correctamente");
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
