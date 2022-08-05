<template>


    <div class="q-ma-md row">
        <div class="q-gutter-md col-4">
            <div class="row justify-between">
                <h6 class="q-my-none col-6">{{ titlle }}</h6>

                <q-btn color="primary" v-if="hide" icon="add" label="Nuevo" @click="onHide" />
                <q-btn color="secondary" v-else icon="replay" label="Volver" @click="onHide" />

            </div>
        </div>
        <q-btn label="listarProductos"  icon="receipt_long" @click="list" color="secondary" class="q-ml-sm"   />
    </div>

    <div class="row">

        <div class="col-md-6">

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" v-if="!hide" >
                <q-input v-model="name" type="text" label="Nombre Producto" filled />
                <q-input v-model="description" type="text" label="Descripcion Breve Producto" filled />
                <q-input v-model="price" type="text" label="Precio Producto" filled />
                <q-file color="teal" filled v-model="file" label="Label">
                    <template v-slot:prepend>
                        <q-icon name="cloud_upload" />
                    </template>
                </q-file>



                <div>
                    <q-btn label="Agregar" type="submit" color="primary" />
                    <q-btn label="Cancelar" type="reset" color="grey" class="q-ml-sm" />


                </div>
            </q-form>
            <br>
            <div class="col-md-6">
                <div class="q-pa-md q-gutter-md">

                    <q-list bordered  >
                        <q-item v-for="({ name, description, price, image }, index) in imagenStore.products"
                            :key="index" clickable v-ripple>
                            <q-item-section>
                                {{ index + 1 }}
                            </q-item-section>

                            <q-item-section>
                                {{ name }}
                            </q-item-section>
                            <q-item-section>
                                {{ description }}
                            </q-item-section>
                            <q-item-section>
                                {{ price }}
                            </q-item-section>

                            <q-item-section>
                                <q-img :src="image.secure_url" />
                            </q-item-section>

                            <q-item-section>
                                <div class="q-ml-md">
                                    <q-btn class="q-ml-xs" color="negative" flat round icon="delete" />
                                    <q-btn class="q-ml-xs" color="primary" flat round icon="visibility"
                                        @click="confirm=true">
                                    </q-btn>

                                </div>

                            </q-item-section>


                        </q-item>

                    </q-list>

                    <q-btn color="primary" icon="redo"  @click="hide2" v-if="ocultar" />
                   

                </div>
            </div>
        </div>


    </div>


    <q-dialog v-model="confirm"    >
        <q-card >
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">IMAGEN DEL PRODUCTO</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-img   :src="image.secure_url" v-for="({ image }, index) in imagenStore.products" :key="index" />
            </q-card-section>
        </q-card>
    </q-dialog>





</template>

<script>
import { defineComponent, ref } from 'vue'
import { useImagenStore } from 'stores/imagen-store'

export default defineComponent({
    name: 'ImageTest',
    setup() {
        const imagenStore = useImagenStore()
        const titlle = ref('Producto con Imagenes')
        const hide = ref(true)
        const name = ref('')
        const description = ref('')
        const price = ref('')
        const products = ref([])
        const file = ref([])
        const confirm = ref(false)
        const ocultar = ref(false)
       
        const icon = ref(false)







        const onHide = () => {
            hide.value = !hide.value
        }
        const onReset = () => {
            name.value = ''
            description.value = ''
            price.value = ''
            file.value = []

        }

        const onSubmit = () => {
            let formData = new FormData()
            formData.append('name', name.value)
            formData.append('description', description.value)
            formData.append('price', price.value)
            formData.append('image', file.value)
            imagenStore.addImage(formData)

        }

        const list = () => {
            imagenStore.getProducts()
            ocultar.value = !ocultar.value
          
            
        }

        const hide2 = () => {
             window.location.reload()
            
        }

      







        return {
            imagenStore,
            titlle,
            hide,
            name,
            description,
            price,
            onHide,
            onReset,
            products,
            file,
            onSubmit,
            list,
            confirm,
            icon,
            hide2,
            ocultar
           
        
            
        



        }
    }
})
</script>
