<template>
  <h4>VENTAS</h4>

  <div class="row q-col-gutter-xs">
    <div class="col-5">
      <div class="row">
        <q-select
          filled
          v-model="compra.idNombre"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="option"
          @filter="filterFn"
          hint="CLIENTE"
          emit-value
          map-options
          option-value="id"
          option-label="nombre"
          style="width: 300px; padding-bottom: 32px"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Medicamento inexistente
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          filled
          v-model="compra.idNombre"
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
          option-label="nombre"
          style="width: 300; padding-bottom: 32px"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Medicamento inexistente
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="row">
        <div class="col">
          <q-select
            filled
            v-model="compra.idProducto"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="medicamento"
            @filter="filterFn"
            hint="Nombre Comercial"
            emit-value
            map-options
            option-value="id"
            :option-label="
              (item) => (item === null ? null : item.nombreProducto?.nombre)
            "
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Medicamento inexistente
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col">
          <q-select
            filled
            v-model="compra.idNombre"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="option"
            @filter="filterFn"
            hint="Nombre Quimico"
            emit-value
            map-options
            option-value="id"
            option-label="nombre"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Medicamento inexistente
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-2">
          <q-input
            v-model="compra.cantidad"
            label="Cantidad"
            style="width: 55px"
          />
        </div>
        <div class="col-2">
          <q-input
            v-model="compra.precioCompra"
            label="Precio"
            style="width: 55px"
          />
        </div>

        <div class="col">
          <q-btn
            label="Agregar"
            color="primary"
            @click="agregar"
            style="width: 90px"
          />
        </div>
      </div>

      <q-table
        flat
        bordered
        title="Detalle de Venta"
        :rows="rows"
        rows-per-page-label="Medicamentos por pagina"
        :rows-per-page-options="[5, 10]"
        :columns="columns"
      >
        <q-td>
          <q-btn icon="ti-plus" color="green" style="width: 15px" />
        </q-td>
      </q-table>

      <div class="row">
        <div class="col-2">
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
            type="submit"
            style="width: 90px"
          />
        </div>
        <div class="col-5">
          <q-input
            v-model="total"
            label="Precio Total"
            item-aligned="rigth"
            style="width: 100px"
          />
        </div>
      </div>
    </div>
    <div class="col-5">
      <verVenta />
    </div>
  </div>

  <div class="row-1">
    <div class="col-1"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import verVenta from "src/components/verVenta.vue";

const rows = ref([]);

const columns = [
  {
    name: "acciones",
    label: "Agr/Eli",
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

const $q = useQuasar();
const option = ref([]);
const proveedores = ref([]);
const nombres = ref([]);
const alert = ref(false);
const total = ref(0);
const medicamento = ref({});

const compra = ref({
  id: "",
  idNombre: "",
  cantidad: 0,
  precioCompra: 0.0,
  estado: "ACTIVO",
});
async function venta() {
  const venta = {
    idCliente: "727f0262-2a02-4e70-894b-a8e44eed1fb9",
    total: total.value,
    productos: rows.value.map((row) => {
      return {
        idProducto: row.id,
        cantidad: row.cantidad,
        total: row.precioVenta,
      };
    }),
  };
  try {
    await api.post("/farmacia/ventas", venta);
  } catch (error) {
    console.log(error, "error venta no realizada");
  }
}
function agregar() {
  //productos.push(compra.value);
  //console.log(productos, "ESTOS SON LOS PRODS");
  const producto = medicamento.value.find(
    (med) => med.id === compra.value.idProducto
  );
  console.log(producto, "PRODUCTO TEST");
  const controlProd = rows.value.find((row) => row.id === producto.id);
  if (compra.value.cantidad <= producto.stock) {
    if (!controlProd) {
      rows.value.push({
        nombreComercial: producto.nombreProducto.nombre,
        precioUnitario: producto.precioUnitario,
        precioVenta: producto.precioVenta * compra.value.cantidad,
        cantidad: compra.value.cantidad,
        id: producto.id,
      });
      total.value = total.value + producto.precioVenta * compra.value.cantidad;
    } else {
      console.log("El producto ya se encuentra en la lista");
    }
  } else {
    console.log("El stock ya es menor");
  }
}
onMounted(async () => {
  const med = await api.get("/farmacia/medicamento");
  console.log("MEDICAMENTO DATOS", med.data.datos);
  medicamento.value = med.data.datos;

  const prov = await api.get("/farmacia/proveedores");
  console.log("se obtubo datos del proveedor", prov.data.datos);
  proveedores.value = prov.data.datos;

  const noms = await api.get("/farmacia/nombre");
  console.log("se obtubo datos del medicamento nombre", noms.data.datos);
  nombres.value = noms.data.datos;
  option.value = noms.data.datos;
});

function filterFn(val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    option.value = nombres.value.filter(
      (v) => v.nombre.toLowerCase().indexOf(needle) > -1
    );
  });
}
</script>
