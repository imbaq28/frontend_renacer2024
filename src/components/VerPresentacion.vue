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
      <template #body-cell-acciones="props">
        <q-td :props="props">
          <q-btn icon="edit" color="primary" />
          <q-btn icon="delete" color="red" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

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
    label: "Presentacion",
    field: "nombre",
    sortable: true,
  },
  { name: "detalle", label: "Descripcion", field: "detalle", align: "left" },
  { name: "estado", label: "Estado", field: "estado" },
];

onMounted(async () => {
  const presentacion = await api.get("/farmacia/presentacion");
  rows.value = presentacion.data.datos;
  console.log(presentacion.data.datos);
});

const loading = ref(false);
const filter = ref("");
const rowCount = ref(10);
const rows = ref([]);
function addRow() {
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
}

function removeRow() {
  loading.value = true;
  setTimeout(() => {
    const index = Math.floor(Math.random() * rows.value.length);
    rows.value = [
      ...rows.value.slice(0, index),
      ...rows.value.slice(index + 1),
    ];
    loading.value = false;
  }, 500);
}
</script>
