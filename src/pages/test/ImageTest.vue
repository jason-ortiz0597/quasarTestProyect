<template>


    <div class="q-ma-md row">
        <div class="q-gutter-md col-4">
            <div class="row justify-between">
                <h6 class="q-my-none col-6">{{ titlle }}</h6>

                <q-btn color="primary" v-if="hide" icon="check" label="Añadir" @click="onHide" />
                <q-btn color="secondary" v-else icon="home" label="Volver" @click="onHide" />
            </div>
        </div>

    </div>

    <div class="row">

        <div class="col-md-6">

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" v-if="!hide">
                <q-input v-model="name" type="text" label="Nombre Producto" filled />
                <q-input v-model="description" type="text" label="Descripcion Breve Producto" filled />
                <q-input v-model="price" type="text" label="Precio Producto" filled />
                <q-file v-model="images" label="Pick files" outlined use-chips multiple style="max-width: 300px" />



                <div>
                    <q-btn label="Agregar" type="submit" color="primary" />
                    <q-btn label="Cancelar" type="reset" color="warning" class="q-ml-sm" />
                    <q-btn label="listarProductos" @click="list" color="secondary" class="q-ml-sm" />

                </div>
            </q-form>
            <br>
            <div class="col-md-6">

            </div>
        </div>


    </div>
    <div class="q-pa-md q-gutter-md">

        <q-list bordered style="max-height: 500px ; max-width: 500px">
            <q-item v-for="({ name, description, price, image }, index) in imagenStore.products" :key="index" clickable
                v-ripple>
                <q-item-section>
                    {{ name }} - {{ description }} - {{ price }}
                </q-item-section>

                <q-item-section>
                    <q-img :src="image.secure_url" />
                </q-item-section>

                <q-item-section>
                    <div class="q-ml-md">
                        <q-btn class="q-ml-sm" color="negative" round icon="delete" />
                        <q-btn class="q-ml-sm" color="primary" round icon="done" />

                    </div>
                </q-item-section>


            </q-item>




        </q-list>

    </div>


    <div class="q-pa-md">
        <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" />
    </div>



</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
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
        const images = ref([])
        const rows = ref([])
        const columns = ref([
            {
                name: 'name',
                label: 'Nombre',
                align: 'left'
            },
            {
                name: 'description',
                label: 'Descripcion',
                align: 'left'
            },
            {
                name: 'price',
                label: 'Precio',
                align: 'left'
            },
            {
                name: 'image',
                label: 'Imagen',
                align: 'left'
            }
    
        ])

        



        const onHide = () => {
            hide.value = !hide.value
        }
        const onReset = () => {
            name.value = ''
            description.value = ''
            price.value = ''
            images.value = []

        }

        const onSubmit = () => {
            imagenStore.addImage(name.value, description.value, price.value, images.value)
            console.log(imagenStore.images)

        }

        const list = () => {
            imagenStore.getProducts()
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
            images,
            onSubmit,
            list,
            rows,
            columns
        }
    }
})
</script>
