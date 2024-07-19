<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      rows-per-page-label="Medicamentos por pagina"
      :rows-per-page-options="[10, 15, 20, 25]"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-input
          borderless
          dense
          debounce="300"
          style="width: 300px"
          color="primary"
          v-model="filter"
          label="Buscador de Medicamentos"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body-cell-acciones="props">
        <q-td :props="props" style="width: 50px">
          <q-btn
            v-if="permiso"
            icon="edit"
            color="primary"
            @click="modificarDatos(props.row)"
            padding="4px"
          />
          <q-btn
            v-if="permiso"
            icon="delete"
            color="red"
            @click="borrarDatos(props.row.id)"
            padding="4px"
          />
        </q-td>
      </template>
      <template #body-cell-imagen="props">
        <q-td :props="props">
          <img :src="props.row.nombreProducto.imagen" style="width: 50px" />
        </q-td>
      </template>
      <template #body-cell-proveedor="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            color="accent"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'"
          />
        </q-td>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <br />
            <div class="text-left">
              <table>
                <tr>
                  <td>Proveedor:</td>
                  <td>Cantidad:</td>
                </tr>
                <tr v-for="producto in props.row.detalles" :key="producto.id">
                  <td>{{ producto.proveedor.nombre }}</td>
                  <td>{{ producto.cantidad }}</td>
                </tr>
              </table>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
//import CrearMedicamento from "src/components/CrearMedicamento.vue";
//import CrearCompra from "./CrearCompra.vue";
//import jsPDF from "jspdf";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);
const editarMedicamento = ref(false);
const medicamento = ref({});
const loading = ref(false);
const filter = ref("");
const rows = ref([]);
const userRoles = ref("");
const permiso = ref(true);

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

async function traerDatos() {
  try {
    const medicamento = await api.get("/farmacia/medicamento");
    rows.value = medicamento.data.datos;
    userRoles.value = $q.localStorage.getItem("user").roles.nombre;
    console.log("LISTA DE MEDICAMENTOS", rows.value);
    if (userRoles.value === "INVITADO") {
      permiso.value = false;
    } else {
      permiso.value = true;
    }
  } catch (error) {
    console.log(error, "ERROR AL TRAER DATOS");
  }
}

function modificarDatos(datos, rol) {
  try {
    console.log("MODIFICANDO MEDICAMENTO", medicamento.value);
    editarMedicamento.value = true;
    medicamento.value = datos;
  } catch (error) {
    console.log(error);
  }
}

function cerrar() {
  editarMedicamento.value = false;
  medicamento.value = {};
}

async function borrarDatos(id, rol) {
  try {
    $q.dialog({
      title: "Eliminar Medicamento",
      message: "¿Esta seguro de eliminar esta Medicamento?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        await api.delete("/farmacia/medicamento/" + id);
        console.log("Borrado de Medicamento correctamente");
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

  {
    name: "proveedor",
    label: "Proveedor(es)",
    field: (row) => row.detalles?.idProveedor,
  },

  {
    name: "idPresentacion",
    label: "PRESENTACIÓN",
    field: (row) => row.nombreProducto.presentacion.nombre,
  },

  {
    name: "precio_venta",
    label: "Precio de venta",
    field: "precioVenta",
  },

  {
    name: "precio_unitario",
    label: "Precio Unitario",
    field: "precioUnitario",
  },

  { name: "stock", label: "Stock", field: "stock", sortable: true },
  //{ name: "cantidad_minima", label: "Stock Minimo", field: "cantidadMinima" },
  {
    name: "imagen",
    label: "Imagen",
    field: (row) =>
      `${row.nombreProducto?.imagen ? row.nombreProducto?.imagen : ""}`,
    align: "left",
    sortable: true,
  },
  { name: "estado", label: "Estado", field: "estado" },
];
</script>
