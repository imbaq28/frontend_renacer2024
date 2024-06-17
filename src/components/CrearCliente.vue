<template>
  <div></div>

  <q-btn
    label="CLIENTE NUEVO"
    color="primary"
    @click="alert = true"
    style="width: 150px"
  />
  <q-dialog v-model="alert" :ref="resetForm()">
    <q-card>
      <q-card-section>
        <div class="text-h6">Formulario de Adicion</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <h4>CLIENTE</h4>

        <q-form @submit="enviarForm" @reset="resetForm">
          <div class="row q-col-gutter-md" style="width: 500px">
            <div class="col-12">
              <q-input v-model="persona.Nombre" label="Nombres Completo" />
            </div>
            <div class="col-12">
              <q-input v-model="persona.Nombre" label="Apellido Paterno" />
            </div>
            <div class="col-12">
              <q-input v-model="persona.Nombre" label="Apellido Materno" />
            </div>
            <div class="col-12">
              <q-input v-model="persona.ci" label="Carnet de Identidad o NIT" />
            </div>
            <div class="col-12">
              <q-input v-model="persona.Celular" label="Numero de celular" />
            </div>
            <div class="col-12">
              <q-input v-model="persona.Correo" label="Correo Electrónico" />
            </div>
            <div class="col-12">
              <q-input
                v-model="persona.Correo"
                label="Detalles"
                type="textarea"
              />
            </div>
            <div class="col-12" style="width: 200px">
              <q-select
                label="Tipo de Persona"
                v-model="persona.Tipo"
                :options="tipos"
                :readonly="true"
              />
            </div>
            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="persona.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-btn label="Submit" color="primary" type="submit" />
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
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
const tipos = ["Usuario", "Cliente", "no se sabe"];
const opciones = ["Habilitado", "inhabilitado", "no se sabe"];

const persona = ref({
  id: 0,
  Nombre: "",
  Paterno: "",
  Materno: "",
  Usuario: "",
  Celular: "",
  Correo: "",
  Detalles: "",
  ci: 0,
  Tipo: "Cliente",
  logo: "",
  estado: "Habilitado",
});
const alert = ref(false);
</script>

<style></style>
