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

        <CrearNombre
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarNombre="editarNombre"
          :nom="nombre"
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
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

import CrearNombre from "./CrearNombre.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarNombre = ref(false);
const nombre = ref({});

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
    label: "Categoria",
    field: "nombre",
    sortable: true,
  },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");
const rows = ref([]);

async function traerDatos() {
  const nombre = await api.get("/farmacia/nombre");
  rows.value = nombre.data.datos;
}

function modificarDatos(datos) {
  editarNombre.value = true;
  nombre.value = datos;
}

function cerrar() {
  editarNombre.value = false;
  nombre.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Nombre",
      message: "¿Esta seguro de eliminar este Nombre?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        await api.delete("/farmacia/nombre/" + id);
        console.log("Borrado de Nombre correctamente");
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
