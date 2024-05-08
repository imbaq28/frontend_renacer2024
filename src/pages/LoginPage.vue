<script setup>
import { ref } from 'vue'
const password = ref('')
const isPwd = ref(true)
const email = ref('')
</script>

<template>
  <div class="login">
    <q-img
          src="/images/ren.jpg"
          :ratio="16/9"
          class="bg-primary"
        />
        <div class="text-h1 text-pink-2">Hola</div>
    <div class="bg-secondary">
      <q-input v-model="password" filled type="text" hint="Email" />

        <q-input v-model="email" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
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
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
.login {
  width: 500px;
  margin: 0 auto;
}
</style>
