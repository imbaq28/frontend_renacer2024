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

        <CrearUsuario
          @traerDatos="traerDatos"
          @cerrar="cerrar"
          :editarUsuario="editarUsuario"
          :usu="usuario"
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
    <q-btn color="primary" label="DOWNLOAD PDF" @click="donwloadPDF()" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import CrearUsuario from "src/components/CrearUsuario.vue";

const $q = useQuasar();
const props = defineProps(["refrescarTabla"]);
const emit = defineEmits(["capturarDatos"]);

const editarUsuario = ref(false);
const usuario = ref({});

const columns = [
  {
    name: "acciones",
    label: "Botones",
    align: "left",
    field: "acciones",
  },

  {
    name: "id_rol",
    label: "Rol",
    align: "left",
    field: (row) => row.roles.nombre,
  },

  {
    name: "tipo_documento",
    align: "left",
    label: "Tipo de Documento",
    field: "tipoDocumento",
  },
  {
    name: "numero_documento",
    label: "Numero de Documento",
    field: "numeroDocumento",
    align: "left",
  },
  {
    name: "complemento",
    label: "Complemento",
    field: "complemento",
    align: "left",
  },
  {
    name: "fecha_nacimiento",
    label: "Fecha de Nacimiento",
    field: "fechaNacimiento",
    align: "left",
  },
  {
    name: "usuario",
    label: "Nombre de Usuario",
    field: "usuario",
    align: "left",
  },
  {
    name: "contrasena",
    label: "Contraseña",
    field: "contrasena",
    align: "left",
  },
  {
    name: "nombres",
    label: "Nombres",
    field: "nombres",
    align: "left",
  },
  {
    name: "primer_apellido",
    label: "Apellido Paterno",
    field: "primerApellido",
    align: "left",
  },

  {
    name: "segundo_apellido",
    label: "Apellido Materno",
    field: "segundoApellido",
    align: "left",
  },

  {
    name: "telefono",
    label: "Telefono",
    field: "telefono",
    align: "left",
  },

  {
    name: "celular",
    label: "Numero de Celular",
    field: "celular",
    align: "left",
  },

  {
    name: "correo_electronico",
    label: "Correo Electronico",
    field: "correoElectronico",
    align: "left",
  },

  {
    name: "estado",
    label: "Estado",
    field: "estado",
    align: "left",
  },
];

onMounted(async () => {
  await traerDatos();
});

const loading = ref(false);
const filter = ref("");
const rows = ref([]);

async function traerDatos() {
  const usuario = await api.get("/system/usuario");
  rows.value = usuario.data.datos;
  console.log("ROW", rows.value);
}

function modificarDatos(datos) {
  editarUsuario.value = true;
  usuario.value = datos;
}

function cerrar() {
  editarUsuario.value = false;
  usuario.value = {};
}

async function borrarDatos(id) {
  try {
    $q.dialog({
      title: "Eliminar Usuario",
      message: "¿Esta seguro de eliminar este USUARIO?",
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        const borrado = await api.delete("/system/usuario/" + id);
        console.log("Borrado de USUARIO correctamente");
        $q.notify({
          position: "bottom",
          timeout: 4500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
          message: `USUARIO ${borrado.value.nombre}ELIMINADA`,
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
  }
}
</script>
