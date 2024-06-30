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
      :rows-per-page-options="[10, 15, 20, 25]"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Traer Datos"
          @click="traerDatos"
        />

        <CrearRol
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarRol="editarRol"
          :rol="roles"
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
          />
          <q-btn icon="delete" color="red" @click="borrarDatos(props.row.id)" />
          <q-btn
            icon="play_arrow"
            color="primary"
            @click="asignarMenu(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialogMenu" persistent>
      <div>
        <form action="">
          <q-select
            filled
            multiple
            v-model="menusSeleccionados"
            use-input
            fill-input
            input-debounce="0"
            :options="menusRoles"
            @filter="filterFn"
            hint="MENUS"
            emit-value
            map-options
            option-value="id"
            option-label="nombre"
          />
          <q-btn label="ACEPTAR" @click="guardarMenu()" />
          <q-btn v-close-popup label="CERRAR" />
        </form>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

import CrearRol from "./CrearRol.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);
const dialogMenu = ref(false);
const editarRol = ref(false);
const roles = ref({});
const menusSeleccionados = ref([]);

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
    label: "Rol",
    field: "nombre",
    sortable: true,
  },

  {
    name: "descripcion",
    label: "Descripcion",
    field: "descripcion",
    align: "left",
  },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");
const rows = ref([]);
const menusRoles = ref([]);
const ide = ref("");
async function traerDatos() {
  const roles = await api.get("/system/roles");
  rows.value = roles.data.datos;

  const menus = await api.get("/system/menu");
  menusRoles.value = menus.data.datos;
  //console.log("MENUSROLES", menusRoles.value);
}

async function guardarMenu() {
  const asignacion = await api.post(
    `/system/roles/${ide.value}/agregar-menu`,
    menusSeleccionados.value
  );
  console.log("ASIGNACION", asignacion);
}

function modificarDatos(datos) {
  editarRol.value = true;
  roles.value = datos;
}

function cerrar() {
  editarRol.value = false;
  roles.value = {};
}

async function asignarMenu(id) {
  dialogMenu.value = true;
  ide.value = id;
  console.log(dialogMenu.value, "ID");
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Rol",
      message: "¿Esta seguro de eliminar esta Rol?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        const eli = rows.value.find((nombre) => nombre.id === id);
        await api.delete("/system/roles/" + id);
        console.log("Borrado de Rol correctamente");
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: `Rol ${eli.nombre} ELIMINADO `,
        });
        await traerDatos();
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
      timeout: 4500,
      textColor: "white",
      actions: [{ icon: "close", color: "white" }],
      message: `No se pudo eliminar el Rol ${eli.nombre}`,
    });
  }
}
</script>
