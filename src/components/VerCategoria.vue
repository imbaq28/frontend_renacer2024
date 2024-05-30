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

        <CrearCategoria
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarCategoria="editarCategoria"
          :cat="categoria"
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
import CrearCategoria from "src/components/CrearCategoria.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarCategoria = ref(false);
const categoria = ref({});

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
  { name: "detalle", label: "Descripcion", field: "detalle", align: "left" },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");
const rows = ref([]);

async function traerDatos() {
  const categoria = await api.get("/farmacia/categoria");
  rows.value = categoria.data.datos;
}

function modificarDatos(datos) {
  editarCategoria.value = true;
  categoria.value = datos;
}

function cerrar() {
  editarCategoria.value = false;
  categoria.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Categoria",
      message: "¿Esta seguro de eliminar esta Categoria?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        await api.delete("/farmacia/categoria/" + id);
        console.log("Borrado de Categoria correctamente");
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
