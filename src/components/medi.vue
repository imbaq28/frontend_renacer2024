<div class="col"></div>
          <div class="row q-col-gutter-md" style="width: 500px">
            <q-select
              filled
              v-model="medicamento.idNombre"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="nombres"
              @filter="filterFn"
              hint="Nombre Comercial"
              emit-value
              map-options
              option-value="id"
              option-label="nombre"
              style="width: 250px; padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="row">
              <div class="col">
                <div class="col-12" style="width: 100px">
                  <q-input v-model="medicamento.stock" label="Stock" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="col-12" style="width: 200px">
                  <q-input
                    v-model="medicamento.precioVenta"
                    label="Precio de Venta"
                  />
                </div>
                <div class="col-12" style="width: 200px">
                  <q-input
                    v-model="medicamento.precioUnitario"
                    label="Precio unitario"
                  />
                </div>
              </div>
            </div>
            <div class="col-12" style="width: 200px">
              <q-select
                label="Estado"
                v-model="medicamento.estado"
                :options="opciones"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="medicamento.descripcion"
                label="Detalles"
                filled
                type="textarea"
              />
            </div>

            <div class="col-12">
              <q-btn
                v-if="!editarMedicamento"
                label="Submit"
                color="primary"
                type="submit"
                style="width: 90px"
              />
              <q-btn
                v-if="editarMedicamento"
                label="Modificar"
                color="primary"
                @click="modificarMedicamento"
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
