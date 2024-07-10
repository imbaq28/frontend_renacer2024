<template>
  <div
    class="text-h3 text-center q-pa-sm q-page padding"
    style="font-family: Single Day, cursive"
  >
    <br />

    Sistema Web de Compras, Ventas y Control de Inventario
    <br />
    de Productos y Medicamentos
  </div>
  <div class="login">
    <div class="col-6">
      <q-img src="/images/ren.jpg" class="imagen"> </q-img>
    </div>
  </div>

  <div class="row">
    <div class="col"></div>
    <div class="col-5">
      <div class="bg-secondary text-center" style="max-width: 400px">
        <div class="row">
          <div class="col">
            <div>
              <q-input
                v-model="usuario"
                filled
                type="text"
                label="Ingrese su Usuario"
              />
            </div>
          </div>
          <div class="col">
            <div>
              <q-btn
                :loading="loading[3]"
                color="primary"
                @click="ingresarSistema"
                style="width: 150px"
              >
                Ingresar
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Loading...
                </template>
              </q-btn>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div>
              <q-input
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Ingrese contraseña"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="col">
            <div>
              <CrearUsuario />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CrearUsuario from "src/components/CrearUsuario.vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

const router = useRouter();
const isPwd = ref(true);
const email = ref("");
const password = ref("");
const usuario = ref("");
const loading = ref([false, false, false, false, false, false]);
const $q = useQuasar();
const progress = ref(false);

function simulateProgress(number) {
  // we set loading state
  loading.value[number] = true;

  // simulate a delay
  setTimeout(() => {
    // we're done, we reset loading state
    loading.value[number] = false;
  }, 3000);
}

async function ingresarSistema() {
  try {
    const usu = await api.post(`/system/usuario/login`, {
      usuario: usuario.value,
      contrasena: password.value,
    });
    console.log(usu, "USS PASS");
    $q.localStorage.set("user", usu.data.datos);
    router.push("/farmacia/bienvenidos");
  } catch (error) {
    console.log("error", error);
  }
}
</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
.login {
  width: 500px;
  margin: 0 auto;
}
.imagen {
  width: 400px;
}
</style>
