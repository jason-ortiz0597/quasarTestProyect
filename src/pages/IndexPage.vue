<template>
  <div class=" text-black text-center q-pa-md ">
    <div >


      <div style="font-size: 10vh">
        BIENVENIDO A SIIPI SISTEMAS
        
      </div>
  
      <div class="text-h2 q-pa-md q-gutter-sm">
        Version en Desarrollo V-01
         
      </div>

      <div class="q-pa-md q-gutter-sm">
        <q-img
          src= "https://res.cloudinary.com/siibolivia/image/upload/v1659530058/product-imagesSiipi/qt5cajnne7ha8qg9q5rq.png"
          :ratio="16/9"
          spinner-color="primary"
          spinner-size="82px"
          style="max-width: 300px; height: 350px;"
         />
      </div>
      
      
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
