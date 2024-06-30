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
      :rows-per-page-options="[10, 15, 20, 25]"
      :loading="loading"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Traer Datos"
          @click="traerDatos"
        />

        <CrearPresentacion
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarPresentacion="editarPresentacion"
          :pres="presentacion"
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import CrearPresentacion from "./CrearPresentacion.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarPresentacion = ref(false);
const presentacion = ref({});

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
    label: "Presentacion",
    field: "nombre",
    sortable: true,
  },
  { name: "detalle", label: "Descripcion", field: "detalle", align: "left" },
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
const rows = ref([]);

async function traerDatos() {
  const presentacion = await api.get("/farmacia/presentacion");
  rows.value = presentacion.data.datos;
}

function modificarDatos(datos) {
  editarPresentacion.value = true;
  presentacion.value = datos;
}

function cerrar() {
  editarPresentacion.value = false;
  presentacion.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Presentacion",
      message: "¿Esta seguro de eliminar esta Presentacion?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        const eleEli = rows.value.find((nombre) => id === nombre.id);
        await api.delete("/farmacia/presentacion/" + id);
        console.log("Borrado de Presentacion correctamente");
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: `Presentacion ${eleEli.nombre} Eliminada`,
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
