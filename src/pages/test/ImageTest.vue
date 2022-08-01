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
                <q-input v-model="image" type="file" label="Imagen Producto" />



                <div>
                    <q-btn label="Agregar" type="submit" color="primary" />
                    <q-btn label="Cancelar" type="reset" color="warning" class="q-ml-sm" />
                </div>
            </q-form>
            <br>
            <div class="col-md-6">

            </div>
        </div>


    </div>

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
        const image = ref('')
        const products = ref([])
        const onHide = () => {
            hide.value = !hide.value
        }
        const onReset = () => {
            name.value = ''
            description.value = ''
            price.value = ''
            image.value = ''
        }
        const onSubmit = () => {
            imagenStore.addImage(name.value, description.value, price.value, image.value)
            onReset()
        }
        return {
            imagenStore,
            titlle,
            hide,
            name,
            description,
            price,
            image,
            onHide,
            onReset,
            onSubmit,
            products

        }
    }
})
</script>
