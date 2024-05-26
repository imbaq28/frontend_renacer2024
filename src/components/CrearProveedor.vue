<template>
  <q-btn
    label="PROVEEDOR NUEVO"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" persistent >
    <q-card>
      <q-card-section class="q-pt-none">
        <h4>Datos del Nuevo Proveedor</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <div class="col-12">
              <q-input
                v-model="proveedor.nombre"
                label="Nombre del Proveedor:"
              />
            </div>

            <div class="col-12">
              <q-input v-model="proveedor.nit" label="NIT" />
            </div>

            <div class="col-12">
              <q-input
                v-model="proveedor.direccion"
                label="Direccion"
                filled
                type="textarea"
              />
            </div>

            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="proveedor.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarProveedor"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />
              <q-btn
                v-if="editarProveedor"
                label="Modificar"
                color="primary"
                @click="modificarProveedor"
                style="width: 90px"
              />
              <q-btn
                label="Reset"
                color="primary"
                outline
                class="q-ml-sm"
                ripple="false"
                type="reset"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="cerrarModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { api } from "boot/axios";

const props = defineProps(["editarProveedor", "prov"]);
const emit = defineEmits(["traerDatos", "cerrar"]);

const opciones = ["ACTIVO", "INACTIVO"];

const proveedor = ref({
  nombre: "",
  nit: 0,
  direccion: "",
  estado: "ACTIVO",
  id: "",
});
const alert = ref(false);

watch(()=> props.editarProveedor,()=>{
  if(props.editarProveedor){
    alert.value = true
    proveedor.value = {
      nombre: props.prov.nombre,
      nit: props.prov.nit,
      direccion: props.prov.direccion,
      estado: props.prov.estado,
      id: props.prov.id
    }
  }
})

const enviarForm = async () => {
  try {
    const prov = await api.post("/farmacia/proveedores", proveedor.value);
    resetForm();
    alert.value = false;
    emit("traerDatos");

  } catch (error) {
    console.log("error: " + error);
  }
};

const resetForm = () => {
  proveedor.value = {
    nombre: "",
    nit: 0,
    direccion: "",
    estado: "ACTIVO",
    id: "",
  };
};


const modificarProveedor = async () => {
  try {
    await api.put(
      `/farmacia/proveedores/${proveedor.value.id}`,
      proveedor.value
    );
    resetForm();
    emit("traerDatos");
    cerrarModal()

  } catch (error) {
    console.log("error: " + error);
  }
};

function cerrarModal() {
  alert.value = false;
  emit("cerrar");
}

</script>

<style scoped type="text/css"></style>
