<template>
  <q-page padding>
    <div style="font-size: 75px">MEDICAMENTOS</div>

    <!--<pre>{{ producto }}</pre>-->
    <q-form @submit="enviarForm" @reset="resetForm">
      <Inventario />
      <div class="row q-col-gutter-md" style="width: 500px">
        <div class="col-12">
          <q-input
            v-model="producto.nombre_comercial"
            label="Nombre comercial"
          />
        </div>

        <div class="col-12">
          <q-input v-model="producto.nombre" label="Nombre Quimico" />
        </div>

        <div class="col-12">
          <q-select
            label="Presentación"
            v-model="producto.presentacion_id"
            :options="opciones"
          />
        </div>

        <div class="col-12">
          <q-select
            label="Categoria"
            v-model="producto.categoria"
            :options="opciones"
          />
        </div>
        <div class="col-12">
          <q-select
            label="Proveedor"
            v-model="producto.proveedor_id"
            :options="opciones"
          />
        </div>
        <div class="row">
          <div class="col">
            <div class="col-12" style="width: 100px">
              <q-input v-model="producto.stock" label="Stock" />
            </div>
            <div class="col-12" style="width: 200px">
              <q-input
                v-model="producto.precio_compra"
                label="Precio de Compra"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="col-12" style="width: 200px">
              <q-input
                v-model="producto.precio_venta"
                label="Precio de Venta"
              />
            </div>
            <div class="col-12" style="width: 200px">
              <q-input
                v-model="producto.precio_unitario"
                label="Precio unitario"
              />
            </div>
          </div>
        </div>
        <div class="col-12" style="width: 200px">
          <q-input v-model="producto.lote" label="Numero de Lote" />
        </div>
        <div class="col-12" style="width: 200px">
          <q-select
            label="Estado"
            v-model="producto.estado"
            :options="opciones"
          />
        </div>
        <div class="col-12">
          <div class="q-pa-md">
            <q-input
              filled
              v-model="producto.fecha_vencimiento"
              mask="date"
              :rules="['date']"
              label="Fecha de Vencimiento"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="producto.fecha_vencimiento">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="col-12">
          <q-input
            v-model="producto.descripcion"
            label="Detalles"
            filled
            type="textarea"
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
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import Inventario from "src/components/Inventario.vue";
const producto = ref({
  id: "0",
  nombre: "Acido Desoxirribunocleico",
  categoria: "",
  descripcion: "",
  fecha_vencimiento: "",
  imagen: "",
  lote: "",
  nombre_comercial: "ADN",
  precio_compra: 0.0,
  precio_venta: 0.0,
  precio_unitario: 0.0,
  presentacion_id: "",
  proveedor_id: "",
  precio_unitario: "",
  stock: 0,
  estado: "",
  date: ref("2019/02/01"),
});

const seleccion = ref(null);
const opciones = ["maxima", "moderada", "minima"];

const enviarForm = () => {
  console.log("Enviando Formulario");
};

const resetForm = () => {
  producto.value = {
    id: "0",
    nombre: "",
    categoria: "",
    descripcion: "",
    fecha_vencimiento: "",
    imagen: "",
    lote: "",
    nombre_comercial: "",
    precio_compra: 0.0,
    precio_venta: 0.0,
    precio_unitario: 0.0,
    presentacion_id: "",
    proveedor_id: "",
    precio_unitario: "",
    stock: 0,
    estado: "",
    date: ref("2019/02/01"),
  };
};
</script>

<style scoped type="text/css"></style>
