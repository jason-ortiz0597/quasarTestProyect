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

                <q-input v-model="price" type="number" label="Precio Producto" filled />
                <q-checkbox label-right v-model="priority" label="Priorida" />


                <div>
                    <q-btn :disable="name.length < 3 || price.length < 0" label="Agregar" type="submit"
                        color="primary" />
                    <q-btn label="Cancelar" type="reset" color="warning" class="q-ml-sm" />
                </div>
            </q-form>
            <br>
            <div class="col-md-6">
                <q-list bordered separator>
                    <q-item clickable v-ripple
                        v-for="({ id, name, price, purchased, highpriority }, index) in reverseItems" :key="id"
                        class="static-class" :class="{ strikeout: purchased, priority: highpriority }"
                        @click="tooglePurchased(reverseItems[index])">

                        <q-item-section>{{ index + 1 }}. </q-item-section>
                        <q-item-section> {{ name }} </q-item-section>
                        <q-item-section>{{ price }}  Bs</q-item-section>



                        <q-item-section>
                            <div>
                                <q-btn color="primary" class="q-ml-sm" flat icon="edit"
                                    @click="onUpdate(reverseItems[index])" />
                                <q-btn color="secondary" class="q-ml-sm" flat icon="delete"
                                    @click="onDelete(reverseItems[index])" />
                            </div>


                        </q-item-section>




                           
                    </q-item>
                     <q-btn color="primary" icon="print"  @click="onGenerate" />
                    
                </q-list>


                <h6 v-if="!items.length">No nay nada Aqui :)</h6>
            </div>
        </div>


    </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';


export default defineComponent({
    name: 'ProductTest',
    setup() {
        const titlle = ref('LISTA DE COMPRAS')
        const priority = ref(false)
        const highpriority = ref(false)
        const name = ref('')
        const price = ref('')
        const hide = ref(true)
        const items = ref([])
        const onSubmit = () => {
            items.value.push({
                id: items.value.length + 1,
                name: name.value,
                price: price.value,
                highpriority: priority.value,
            })
            name.value = ''
            price.value = ''
            priority.value = false
            highpriority.value = false
        }
        const onReset = () => {
            name.value = ''
            price.value = ''
            priority.value = false
            highpriority.value = false
        }
        const onHide = () => {
            hide.value = !hide.value
            name.value = ''
            price.value = ''
            priority.value = false
            highpriority.value = false

        }
        const tooglePurchased = (item) => {
            item.purchased = !item.purchased
        }
        const reverseItems = computed(() => {
            return [...items.value].reverse()
        })

        const onUpdate = (item) => {
            items.value = items.value.filter(i => i.id !== item.id)
            name.value = item.name
            price.value = item.price
            priority.value = item.highpriority
            highpriority.value = item.highpriority
            hide.value = false

        }
        const onDelete = (item) => {
            items.value = items.value.filter(i => i.id !== item.id)
        }

        const onGenerate = () => {
            const doc = new jsPDF()
            const total = items.value.reduce((acc, item) => acc + item.price, 0)
           

            doc.text('LISTA DE COMPRAS', 10, 10)
            //doc.addImage('https://res.cloudinary.com/siibolivia/image/upload/v1659629993/product-imagesSiipi/ghupsavgptbsi3gpxwff.jpg', 'jpg', 10, 20, 50, 50)
            
            
            doc.autoTable({
                head: [
                    ['ID', 'Nombre', 'Precio', 'Prioridad']
                    
                ],
                body: items.value.map(item => [
                    item.id, item.name, item.price, item.highpriority ? 'Si' : 'No'
                ])
            })
            //doc.text(`Total: ${total} Bs`, 10, doc.autoTable.previous.finalY + 10)
            doc.save('lista.pdf')
        }

        return {
            titlle,
            items,
            priority,
            highpriority,
            name,
            price,
            onSubmit,
            onReset,
            hide,
            onHide,
            tooglePurchased,
            reverseItems,
            onUpdate,
            onDelete,
            onGenerate
        }
    }
})
</script>

<style >
.strikeout {
    text-decoration: line-through;
    color: #e75c11;
}

.strikeout:hover {
    color: #98de0b;
}

.priority {
    color: #570deb;
}
</style>

