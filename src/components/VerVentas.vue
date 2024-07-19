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
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          label="DATOS A BUSCAR..."
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
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
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}

            <q-btn
              v-if="col.field === 'factura'"
              @click="verFactura(props.row)"
              color="red"
              icon="picture_as_pdf"
              style="width: 50px"
            >
            </q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <table>
                <tr>
                  <td>nombreProducto:</td>
                  <td>presentacion:</td>
                  <td>cantidad:</td>
                  <td>total:</td>
                </tr>
                <tr v-for="producto in props.row.productos" :key="producto.id">
                  <td>{{ producto.nombreProducto.nombre }}</td>
                  <td>{{ producto.nombreProducto.presentacion.nombre }}</td>
                  <td>{{ producto.pedidoProducto.cantidad }}</td>
                  <td>{{ producto.pedidoProducto.total }}</td>
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
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

//import jsPDF from "jspdf";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

//const refrescarTabla = ref(false);
const editarVentas = ref(false);
const clientes = ref({});
const clie = ref({});

async function verFactura(datos) {
  const factura = await api.get(`system/reportes/${datos.id}/generar-factura`);
  generarPDF(factura.data.datos);
  console.log("prueba", factura);
}
function generarPDF(datosPDF) {
  const base64String = datosPDF;
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  //const numero = rows.filter()
  link.download = `archivo.pdf`; // El nombre con el que se descargará el archivo
  document.body.appendChild(link);
  link.click();

  // Limpiar
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}

const columns = [
  {
    name: "nombres",
    required: true,
    label: "Vendedor",
    align: "left",
    field: (row) =>
      `${row.vendedor?.primerApellido ? row.vendedor?.primerApellido : ""} ${
        row.vendedor?.nombres ? row.vendedor?.nombres : ""
      }`,
    sortable: true,
  },

  {
    name: "primerApellido",
    align: "left",
    label: "Nombre del Cliente",
    field: (row) => row.cliente.primerApellido,
    sortable: true,
  },
  {
    name: "fechaPedido",
    label: "Fecha del pedido",
    field: "fechaPedido",
    align: "left",
    sortable: true,
  },
  {
    name: "numeroFactura",
    label: "Numero de Factura",
    field: "numeroFactura",
    align: "left",
  },
  {
    name: "total",
    label: "Total",
    field: "total",
    align: "left",
    sortable: true,
  },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
  {
    name: "factura",
    label: "Ver Factura",
    field: "factura",
    align: "left",
    sortable: true,
  },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");

const rows = ref([]);
const rol = ref({});
const codigo = ref("");

const datosVenta = ref({
  idCliente: "",
  fechaPedido: "",
  numeroFactura: "",
  total: 0,
  estado: "",
  id: "",
  productos: {},
});

async function traerDatos() {
  const pedidos = await api.get("/farmacia/ventas");
  rows.value = pedidos.data.datos;
  console.log("ventas", rows.value);

  const roles = await api.get(`/system/roles`);
  rol.value = roles.data.datos;
  codigo.value = rol.value.find((nombre) => nombre.nombre === "CLIENTE");

  const clientes = await api.get(`/system/usuario?idRol=${codigo.value.id}`);
  clie.value = clientes.data.datos;
  console.log("CLIENTES", clie.value);
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
