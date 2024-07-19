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
      <template #body-cell-imagen="props">
        <q-td :props="props">
          <img :src="props.row.imagen" style="width: 50px" />
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
//const nombre = ref({});

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
    label: "Nombre Comercial",
    field: "nombre",
  },
  {
    name: "idPresentacion",
    label: "Presentación",
    field: (row) => row.presentacion.nombre,
    align: "left",
  },
  {
    name: "idCategoria",
    label: "Categoria",
    field: (row) => row.categoria.nombre,
    align: "left",
  },
  {
    name: "nombreQuimico",
    label: "Nombre Químico",
    field: "nombreQuimico",
    align: "left",
  },
  {
    name: "descripcion",
    label: "Descripción",
    field: "descripcion",
    align: "left",
  },
  { name: "imagen", label: "Imagen", field: "imagen", align: "left" },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");
const rows = ref([]);
const nombre = ref([]);

async function traerDatos() {
  const nombre = await api.get("/farmacia/nombre");
  rows.value = nombre.data.datos;
  console.log("MEDICAMENTOS> ", rows.value);
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
        const nombreMedicamento = rows.value.find((nombre) => id === nombre.id);
        await api.delete("/farmacia/nombre/" + id);
        console.log("Borrado de Nombre correctamente");
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: `Nombre de medicamento ${nombreMedicamento.nombre} ELIMINADO`,
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
