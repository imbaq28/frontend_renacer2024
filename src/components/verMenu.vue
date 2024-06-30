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

        <CrearMenu
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarMenu="editarMenu"
          :men="menu"
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
import CrearMenu from "src/components/CrearMenu.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarMenu = ref(false);
const menu = ref({});

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
    label: "Nombre de Menu",
    field: "nombre",
  },
  {
    name: "ruta",
    align: "left",
    label: "Ruta",
    field: "ruta",
  },
  { name: "icono", label: "Icono", field: "icono", align: "left" },
  { name: "orden", label: "Orden", field: "orden", align: "left" },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");
const rows = ref([]);

async function traerDatos() {
  const menu = await api.get("/system/menu");
  rows.value = menu.data.datos;
}

function modificarDatos(datos) {
  editarMenu.value = true;
  menu.value = datos;
}

function cerrar() {
  editarMenu.value = false;
  menu.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar MENU",
      message: "¿Esta seguro de eliminar esta MENU?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        await api.delete("/system/menu/" + id);
        console.log("Borrado de MENU correctamente");
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: "MENU ELIMINADO",
        });
        await traerDatos();
      })
      .onOk(async () => {})
      .onCancel(() => {})
      .onDismiss(() => {});
  } catch (error) {
    console.log(error);
  }
}
</script>
