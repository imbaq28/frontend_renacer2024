<template>
  <q-page padding>
    <h4>Reportes</h4>
    <div>
      <div>
        <q-btn
          color="primary"
          class="glossy"
          rounded
          label="Reporte de proveedores"
          @click="donwloadProveedores()"
        />
      </div>
      <br />
      <div>
        <q-btn
          class="glossy"
          rounded
          color="primary"
          label="Reporte de Stocks"
          @click="donwloadStocks()"
        />
      </div>
      <br />
      <div>
        <q-btn
          class="glossy"
          rounded
          color="primary"
          label="Reporte de Fechas de vencimiento"
          @click="donwloadFechas()"
        />
      </div>
      <br />
      <div>
        <q-btn
          class="glossy"
          rounded
          color="primary"
          label="Reporte de Clientes"
          @click="donwloadFechas()"
        />
      </div>
      <br />
      <div>
        <q-btn
          class="glossy"
          rounded
          color="primary"
          label="Reporte compras"
          @click="donwloadFechas()"
        />
      </div>
      <br />
      <div>
        <q-btn
          class="glossy"
          rounded
          color="primary"
          label="Reporte de medicamentos"
          @click="donwloadFechas()"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import jsPDF from "jspdf";

const proveedor = ref({});
const rows = ref([]);

const stocks = ref({});
const rows2 = ref([]);

const fechas = ref({});
const rows3 = ref([]);

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

async function donwloadProveedores() {
  const proveedor = await api.get("/farmacia/proveedores");
  rows.value = proveedor.data.datos;

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
  pdf.save("proveedores.pdf");
}

async function donwloadStocks() {
  const stocks = await api.get("/system/reportes/cantidad-minima");
  rows2.value = stocks.data.datos;
  var headers = createHeaders([
    "nombreComercial",
    "precioVenta",
    "precioUnitario",
    "stock",
    "estado",
  ]);
  console.log(rows2.value, "TEST");
  const body = rows2.value.map((row) => {
    return {
      nombreComercial: row.nombreProducto.nombre,
      precioVenta: String(row.precioVenta),
      precioUnitario: String(row.precioUnitario),
      stock: String(row.stock),
      estado: row.estado,
    };
  });
  console.log("BODY", body);
  const pdf = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
  pdf.table(10, 10, body, headers, { autoSize: true });
  pdf.save("stocks.pdf");
}

async function donwloadFechas() {
  const fechas = await api.get("/system/reportes/fecha-vencimiento");
  rows3.value = fechas.data.datos;
  console.log("fechassss", fechas);
  var headers = createHeaders([
    "nombre",
    "cantidad",
    "fechaVencimiento",
    "proveedor",
    "estado",
  ]);
  console.log(rows3.value, "TEST");
  const body = rows3.value.map((row) => {
    return {
      nombre: row.nombreProducto.nombre,
      cantidad: String(row.cantidad),
      fechaVencimiento: row.fechaVencimiento,
      proveedor: row.proveedor.nombre,
      estado: row.estado,
    };
  });
  const pdf = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
  console.log("DATOS", body);
  pdf.table(10, 10, body, headers, { autoSize: true });
  pdf.save("fechasvencimiento.pdf");
}
</script>
