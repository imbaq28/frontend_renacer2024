<template>
  <h4>VENTAS</h4>

  <div class="col">
    <div class="row">
      <div class="col-3">
        <q-input
          label="CLIENTE"
          v-model="cliente"
          readonly
          style="width: 250px; padding-bottom: 32px"
        />
      </div>
      <div class="col2">
        <q-select
          filled
          v-model="nit"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="option"
          @filter="filterFn"
          hint="NIT"
          emit-value
          map-options
          option-value="id"
          option-label="numeroDocumento"
          style="width: 200px; padding-bottom: 32px"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                NIT inexistente
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div>
        <CrearCliente
          @traerDatos="traerDatosCliente"
          @clienteCreado="clienteCreado"
          @cerrar="cerrar"
          :clie="cliente"
        />
      </div>
    </div>

    <div>
      <q-table
        flat
        bordered
        title="Treats"
        :rows="rows"
        rows-per-page-label="Medicamentos por pagina"
        :rows-per-page-options="[5, 10]"
        :columns="columns2"
        row-key="id"
        :filter="filter"
        :loading="loading"
        style="width: 1100px"
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            :disable="loading"
            label="Traer Datos"
            @click="traerDatos"
          />

          <q-space />

          <q-input
            borderless
            dense
            debounce="300"
            color="primary"
            v-model="filter"
            label="Medicamento a buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #body-cell-acciones="props">
          <q-td :props="props">
            <q-btn
              icon="ti-plus"
              color="orange"
              @click="agregar(props.row.id)"
              style="width: 25px"
              padding="1px"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="row">
      <div class="col-7">
        <q-table
          flat
          bordered
          title="Detalle de Venta"
          :rows="rows2"
          rows-per-page-label="Medicamentos por pagina"
          :rows-per-page-options="[5, 10]"
          :columns="columns"
          style="width: 970px"
        >
          <template #body-cell-acciones="props">
            <q-td :props="props" style="width: 50px">
              <q-btn
                icon="ti-cut"
                color="purple"
                padding="1px"
                @click="eliminarItem(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="col">
        <q-input
          v-model="total"
          label="Precio Total"
          item-aligned="rigth"
          style="width: 100px"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-1">
        <q-btn
          label="ACEPTAR"
          color="primary"
          @click="venta"
          style="width: 90px"
        />
      </div>
      <div class="col-5">
        <q-btn
          label="CANCELAR"
          color="primary"
          @click="resetForm"
          style="width: 90px"
        />
      </div>
      <div class="col-5"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import CrearCliente from "src/components/CrearCliente.vue";

const nit = ref("");

const rows = ref([]);
const rows2 = ref([]);
const cliente = ref("S/N");
const $q = useQuasar();
let timer;

const option = ref([]);
const proveedores = ref([]);
const nombres = ref([]);
const alert = ref(false);
const total = ref(0);
const medicamento = ref({});
const usuarios = ref([]);
const cantidad = ref();
const medicamentos = ref([]);
const usu = ref("");
const loading = ref(false);
const filter = ref("");
const Clientes = ref([]);
const rol = ref({});
const codigo = ref("");

async function clienteCreado(cliente) {
  await traerDatosCliente();
  console.log("Se creo un cliente", cliente.usercreado.id);
  nit.value = cliente.usercreado.id;
}

const resetForm = () => {
  (rows2.value = []),
    (cliente.value = "S/N"),
    (total.value = 0),
    (nit.value = "");
};

async function traerDatos() {
  const med = await api.get("/farmacia/medicamento");
  medicamento.value = med.data.datos;
  rows.value = med.data.datos;

  const prov = await api.get("/farmacia/proveedores");
  proveedores.value = prov.data.datos;

  await traerDatosCliente();
  const noms = await api.get("/farmacia/nombre");
  // console.log("se obtubo datos del medicamento nombre", noms.data.datos);
  nombres.value = noms.data.datos;
  //console.log("prueba", rows2.value);
}

onMounted(async () => {
  traerDatos();
});

watch(nit, () => {
  if (nit.value) {
    const usuario = usuarios.value.find((u) => u.id === nit.value);
    //console.log(usuario, "USUARIO");
    cliente.value = `${usuario.nombres} ${usuario.primerApellido} ${
      usuario.segundoApellido ? usuario.segundoApellido : ""
    }`;
  }
});

async function traerDatosCliente() {
  const roles = await api.get(`/system/roles`);
  rol.value = roles.data.datos;
  codigo.value = rol.value.find((nombre) => nombre.nombre === "CLIENTE");

  const clien = await api.get(`/system/usuario?idRol=${codigo.value.id}`);

  usuarios.value = clien.data.datos;
  option.value = clien.data.datos;
}

async function venta() {
  if (nit.value) {
    try {
      $q.dialog({
        title: "VENTA",
        message: "¿Esta seguro que desea realizar la venta?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          const usuario = usuarios.value.find((u) => u.id === nit.value);
          usu.value = usuario.id;
          const venta = {
            idCliente: usu.value,
            total: total.value,
            productos: rows2.value.map((row) => {
              return {
                idProducto: row.id,
                cantidad: row.cantidad,
                total: row.precioVenta,
              };
            }),
          };
          $q.loading.show();
          const ventas = await api.post("/farmacia/ventas", venta);
          console.log("Venta realizada...", ventas);
          const factura = await api.get(
            `system/reportes/${ventas.data.datos.id}/generar-factura`
          );
          generarPDF(factura.data.datos);
          $q.loading.hide();
          $q.notify({
            position: "bottom",
            timeout: 3500,
            color: "green-5",
            textColor: "White",
            actions: [{ icon: "close", color: "white" }],
            message: `Venta realizada...`,
          });
          resetForm();
          traerDatos();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    } catch (error) {
      console.log(error, "error venta no realizada");
      $q.notify({
        position: "bottom",
        timeout: 3500,
        color: "red-5",
        textColor: "White",
        actions: [{ icon: "close", color: "white" }],
        message: `ERROR, la venta no pudo ejecutarse...`,
      });
    }
  } else {
    try {
      $q.dialog({
        title: "VENTA SIN NIT:",
        message:
          "¿Esta seguro que desea realizar la venta sin un NIT para la factura?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          const usuario = usuarios.value.find(
            (u) => u.numeroDocumento === "0" || u.numeroDocumento === "00"
          );
          usu.value = usuario.id;
          const venta = {
            idCliente: usu.value,
            total: total.value,
            productos: rows2.value.map((row) => {
              return {
                idProducto: row.id,
                cantidad: row.cantidad,
                total: row.precioVenta,
              };
            }),
          };
          $q.loading.show();
          const ventas = await api.post("/farmacia/ventas", venta);
          const factura = await api.get(
            `system/reportes/${ventas.data.datos.id}/generar-factura`
          );
          generarPDF(factura.data.datos);
          $q.loading.hide();
          console.log("Venta realizada sin NIT...");
          $q.notify({
            position: "bottom",
            timeout: 3500,
            color: "green-5",
            textColor: "White",
            actions: [{ icon: "close", color: "white" }],
            message: `Venta realizada...`,
          });
          resetForm();
          traerDatos();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    } catch (error) {
      console.log("ERROR", error);
    }
  }
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

function agregar(id) {
  const controlProd = rows.value.find((row) => row.id === id);
  //console.log(rows2.value, "DATAAAAAAAAA");
  try {
    $q.dialog({
      title: "Cantidad para Agregar",
      message: "¿Cuantos desea agregar?",
      cancel: true,
      persistent: true,
      prompt: {
        model: 1,
        type: "number",
        min: 1,
        step: 1,
      },
    })
      .onOk((data) => {
        controlProd.cantidad = parseInt(data);
        const algo = rows2.value.find((p) => p.id === id);
        //console.log(data, "ALGO");
        //const repetido = rows2.value.map(algo.value.id);
        //console.log("REPETIDO", repetido);
        if (
          controlProd.cantidad <= controlProd.stock &&
          controlProd.cantidad > 0 &&
          !algo
        ) {
          rows2.value.push({
            nombreComercial: controlProd.nombreProducto.nombre,
            precioUnitario: controlProd.precioUnitario,
            precioVenta: controlProd.precioUnitario * controlProd.cantidad,
            cantidad: controlProd.cantidad,
            id: controlProd.id,
          });

          total.value =
            total.value + controlProd.precioUnitario * controlProd.cantidad;
          console.log("VERIFICANDO", total.value);
        } else {
          if (algo) {
            algo.cantidad = algo.cantidad + parseInt(data);
            algo.precioVenta = algo.precioUnitario * algo.cantidad;
            total.value = total.value + algo.precioUnitario * data;
          } else {
            console.log(
              "La cantidad tiene que ser mayor a cero o la cantidad es menor al stock del medicamento"
            );
          }
        }
      })
      .onCancel(() => {})
      .onDismiss(() => {
        //
      });
  } catch (error) {
    console.log("Erro", error);
  }
}
function eliminarItem(row) {
  console.log("INDEX", row);
  total.value = total.value - row.precioVenta;
  const index = this.rows2.indexOf(row);

  if (index > -1) {
    // Elimina la fila del array de datos
    this.rows2.splice(index, 1);
  }
}

function filterFn(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    option.value = usuarios.value.filter(
      //(v) => v.usuario.toLowerCase().indexOf(needle) > -1,
      (v) => v.numeroDocumento.toLowerCase().indexOf(needle) > -1
    );
  });
}

function cerrar() {
  //editarCliente.value = false;
  Clientes.value = {};
}

const columns = [
  {
    name: "acciones",
    label: "Eliminar",
    align: "left",
    field: "acciones",
  },
  {
    name: "id_nombre",
    label: "Nombre Comercial",
    align: "left",
    field: "nombreComercial",
  },
  {
    name: "precio_unitario",
    label: "Precio Unitario",
    field: "precioUnitario",
  },

  { name: "cantidad", label: "Cantidad", field: "cantidad" },
  {
    name: "precio_venta",
    label: "Precio de venta",
    field: "precioVenta",
  },

  //{ name: "estado", label: "Estado", field: "estado" },
];

const columns2 = [
  {
    name: "acciones",
    label: "Agregar",
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
    name: "nombreQuimico",
    label: "Nombre Químico",
    field: (row) => row.nombreProducto.nombreQuimico,
    align: "left",
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

  { name: "stock", label: "Stock", field: "stock" },
  { name: "estado", label: "Estado", field: "estado" },
];
</script>
