<template>
  <div></div>

  <q-btn
    label="CATEGORIA"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />

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
          label="Add row"
          @click="addRow"
        />
        <q-btn
          v-if="rows.length !== 0"
          class="q-ml-sm"
          color="primary"
          :disable="loading"
          label="Remove row"
          @click="removeRow"
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
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "acciones",
    label: "Botones",
    align: "left",
  },
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Categoria",
    field: "nombre",
    sortable: true,
  },
  { name: "detalle", label: "Descripcion", field: "detalle", sortable: true },
  { name: "estado", label: "Estado", field: "estado" },
];

const originalRows = [
  {
    id: 1,
    nombre: "Botella",
    detalle: 6.0,
    estado: 24,
  },
  {
    id: 2,
    nombre: 237,
    detalle: 9.0,
    estado: 37,
  },
  {
    id: 3,
    nombre: 262,
    detalle: 16.0,
    estado: 23,
  },
  {
    id: 4,
    nombre: 305,
    detalle: 3.7,
    estado: 67,
  },
  {
    id: 5,
    nombre: 356,
    detalle: 16.0,
    estado: 49,
  },
  {
    id: 6,
    nombre: 375,
    detalle: 0.0,
    estado: 94,
  },
  {
    id: 7,
    nombre: 392,
    detalle: 0.2,
    estado: 98,
  },
  {
    id: 8,
    nombre: 408,
    detalle: 3.2,
    estado: 87,
  },
  {
    id: 9,
    nombre: 452,
    detalle: 25.0,
    estado: 51,
  },
  {
    id: 10,
    nombre: 518,
    detalle: 26.0,
    estado: 65,
  },
];

export default {
  setup() {
    const loading = ref(false);
    const filter = ref("");
    const rowCount = ref(10);
    const rows = ref([...originalRows]);

    return {
      columns,
      rows,

      loading,
      filter,
      rowCount,

      // emulate fetching data from server
      addRow() {
        loading.value = true;
        setTimeout(() => {
          const index = Math.floor(Math.random() * (rows.value.length + 1)),
            row = originalRows[Math.floor(Math.random() * originalRows.length)];

          if (rows.value.length === 0) {
            rowCount.value = 0;
          }

          row.id = ++rowCount.value;
          const newRow = { ...row }; // extend({}, row, { name: `${row.name} (${row.__count})` })
          rows.value = [
            ...rows.value.slice(0, index),
            newRow,
            ...rows.value.slice(index),
          ];
          loading.value = false;
        }, 500);
      },

      removeRow() {
        loading.value = true;
        setTimeout(() => {
          const index = Math.floor(Math.random() * rows.value.length);
          rows.value = [
            ...rows.value.slice(0, index),
            ...rows.value.slice(index + 1),
          ];
          loading.value = false;
        }, 500);
      },
    };
  },
};
</script>
