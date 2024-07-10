<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
    >
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
    <q-btn color="primary" label="DOWNLOAD PDF" @click="donwloadPDF()" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

import jsPDF from "jspdf";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

//const refrescarTabla = ref(false);
const editarVentas = ref(false);
const clientes = ref({});
const clie = ref({});

function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0,
    });
  }
  return result;
}

function donwloadPDF() {
  var headers = createHeaders(["id", "nombre", "nit", "direccion", "estado"]);
  console.log(rows.value, "TEST");
  const body = rows.value.map((row) => {
    return {
      id: row.id,
      nombre: row.nombre,
      nit: row.nit,
      direccion: row.direccion,
      estado: row.estado,
    };
  });
  const pdf = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
  console.log("DATOS", body);
  pdf.table(10, 10, body, headers, { autoSize: true });
  pdf.save("asd.pdf");
}

const columns = [
  {
    name: "name",
    required: true,
    label: "Productos",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "idCliente",
    align: "left",
    label: "Nombre del Cliente",
    field: (row) => row.idCliente,
    sortable: true,
  },
  {
    name: "fechaPedido",
    label: "Fecha del pedido",
    field: "fechaPedido",
    align: "left",
  },
  {
    name: "numeroFactura",
    label: "Numero de Factura",
    field: "numeroFactura",
    align: "left",
  },
  { name: "total", label: "Total", field: "total", align: "left" },
  { name: "estado", label: "Estado", field: "estado", align: "left" },
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
