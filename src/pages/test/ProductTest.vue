<template>
<div class="q-ma-md row">
    <div class="q-gutter-md col-4">
         <div class="row justify-between">
             <h6 class="q-my-none col-6">{{ titlle }}</h6>
             
             <q-btn color="primary" v-if="hide" icon="check" label="Añadir" @click="onHide"  />
             <q-btn color="secondary"  v-else icon="home" label="Volver" @click="onHide" />
         </div>
    </div>
       
</div>
    
    <div class="row">
       
        <div class="col-md-6">
            
            <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                v-if="!hide"
            >
                <q-input v-model="name" type="text" label="Nombre Producto" filled />
               
                <q-input v-model="price" type="text" label="Precio Producto" filled />
                <q-checkbox label-right v-model="priority" label="Priorida" />
    
               
                <div>
                    <q-btn label="Agregar" type="submit" color="primary"/>
                    <q-btn label="Cancelar" type="reset" color="warning"  class="q-ml-sm" />
                </div>
            </q-form>
            <br>
            <div class="col-md-6">
                <q-list bordered>
                    <q-item clickable v-ripple v-for="({ id, name, price }) in items" :key="id">

                        <q-item-section>{{ id }}. - {{ name }} | {{ price }}</q-item-section>
                    </q-item>
                </q-list>
                <h6 v-if="!items.length" >No nay nada Aqui :)</h6>
            </div>
        </div>


    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'ProductTest',
    setup() {
        const titlle = ref('LISTA DE COMPRAS')
        const priority = ref(false)
        const name = ref('')
        const price = ref('')
        const hide = ref(true)
        const items = ref([
            {
                id: 1,
                name: 'Papel higienico',
                price: '$100',
            },
            {
                id: 2,
                name: 'Lavandina',
                price: '$100',
            },
            {
                id: 3,
                name: 'Cinta de seguridad',
                price: '$100',
            }
        ])
        const onSubmit  = () => {
            items.value.push({
                id: items.value.length + 1,
                name: name.value,
                price: price.value,
            })
            name.value = ''
            price.value = ''
            priority.value = false
        }
        const onReset = () => {
            name.value = ''
            price.value = ''
            priority.value = false
        }
        const onHide = () => {
            hide.value = !hide.value
            name.value = ''
            price.value = ''
            priority.value = false

        }
        return {
            titlle,
            items,
            priority,
            name,
            price,
            onSubmit,
            onReset,
            hide,
            onHide
        }
    }
})
</script>

