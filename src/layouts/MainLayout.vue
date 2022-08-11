<template>

  <q-layout view="lHh Lpr lFf" style="height: 300px" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-blue">
      <q-toolbar class="bg-primary glossy text-white">
        <q-btn @click="drawer = !drawer" flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar size="80px">
          <q-img
            src="https://res.cloudinary.com/siibolivia/image/upload/v1659459482/product-imagesSiipi/bf2fhs1hckgyxpcqniri.png" />

          />
        </q-avatar>

        <q-toolbar-title class="text-center">SIIIPI SISTEMAS</q-toolbar-title>

        <q-btn flat round dense icon="home" to="/" />
        <q-btn flat round dense icon="person" />
      </q-toolbar>

    </q-header>

    <!-- Drawer Begin. -->

    <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="500" bordered class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list bordered class="rounded-borders">

          <!-- Expansion Menu Begin. -->
          <q-expansion-item :content-inset-level="0.5" expand-separator icon="warehouse" label="Almace Siipi">
            <q-item clickable v-ripple :active="link === 'productos'" @click="link = 'productos'"
              active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="menu_book" />
              </q-item-section>

              <q-item-section>Productos</q-item-section>
            </q-item>

            <q-item clickable v-ripple :active="link === 'entradaProductos'" @click="link = 'entradaProductos'"
              active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>

              <q-item-section>Entradas de Productos</q-item-section>
            </q-item>

            <q-item clickable v-ripple :active="link === 'salidaProductos'" @click="link = 'salidaProductos'"
              active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="west" />
              </q-item-section>

              <q-item-section>Salida de Productos</q-item-section>
            </q-item>

            <q-item clickable v-ripple :active="link === 'inventario'" @click="link = 'inventario'"
              active-class="my-menu-link">
              <q-item-section avatar>
                <q-icon name="inventory" />
              </q-item-section>

              <q-item-section>Inventario de Productos</q-item-section>
            </q-item>
          </q-expansion-item>
          <!-- Expansion Menu End. -->
          <q-expansion-item :content-inset-level="0.5" expand-separator icon="science" label="Mis Practicas">
            <q-item clickable v-ripple :active="link === 'productosTest'" @click="link = 'productosTest'"
              active-class="my-menu-link" to="/productTest">
              <q-item-section avatar>
                <q-icon name="shopping_bag" />
              </q-item-section>

              <q-item-section>Lista de Compras</q-item-section>
            </q-item>
            <q-item clickable v-ripple :active="link === 'imageTest'" @click="link = 'imageTest'"
              active-class="my-menu-link" to="/imageTest">
              <q-item-section avatar>
                <q-icon name="photo_camera" />
              </q-item-section>

              <q-item-section>Imagenes Siipi</q-item-section>
            </q-item>

          
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- Drawer End. -->

    <q-page-container>
      <q-page padding>
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<script>
import { ref } from 'vue'


export default {
  setup() {
    return {
      drawer: ref(false),
      link: ref('')
    }
  }
}
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>