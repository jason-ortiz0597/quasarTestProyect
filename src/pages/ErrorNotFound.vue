<template>
  <div class="fullscreen bg-grey text-white text-center q-pa-md flex flex-center">
      <img
      alt="Logo Error"
      src="~assets/error1.jpg"

      class="absolute"
      baground-size="cover"
    >
    <div>
      
      <div style="font-size: 30vh">
        404
      </div>
     
    

      <div class="text-h2 " style="opacity:.6">
        Oops. AQUI NO HAY NADA 
      </div>

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/" label="Go Home" no-caps />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
