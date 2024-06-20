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
          option-label="usuario"
          style="width: 300px; padding-bottom: 32px"
          text-color="red"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                CLIENTE inexistente
              </q-item-section>
            </q-item>
          </template>
        </q-select>
