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








        <q-item
            clickable
            v-ripple
            to="/farmacia/usuario"
            exact
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> USUARIOS </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/cliente"
            exact
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> CLIENTES </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/medicamento"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> STOCKS Y PRECIOS DE VENTA </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/proveedores"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> PROVEEDORES</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/categoria"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> CATEGORIAS</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/presentacion"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> PRESENTACIÓN </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/nombre"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> MEDICAMENTO </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/compras"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> COMPRAS </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/roles"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> ROLES </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/farmacia/menu"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="today" />
            </q-item-section>

            <q-item-section> MENUS </q-item-section>
          </q-item>
        </q-list>

        <q-item
          clickable
          v-ripple
          to="/farmacia/ventas2"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="today" />
          </q-item-section>

          <q-item-section> VENTAS </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/farmacia/reportes"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="today" />
          </q-item-section>

          <q-item-section> REPORTES </q-item-section>
        </q-item>
