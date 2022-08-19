<template>
    <div class="q-pa-md">
        <q-btn color="primary" icon="add" @click="confirm = true" />

        <q-table title="Clientes" :rows="rows" :columns="columns" row-key="id" :filter="filter">

            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />

                    </template>

                </q-input>


            </template>


            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="primary" icon="edit" flat round @click="updateCustomer(props.row._id)" />
                    <q-btn color="negative" icon="delete" flat round @click="deleteCustomer(props.row._id)" />

                </q-td>
            </template>

            <template v-slot:no-data="{ icon, message, filter }">
                <div class="full-width row flex-center text-accent q-gutter-sm">
                    <q-icon size="2em" name="sentiment_dissatisfied" />
                    <span>
                        Well this is sad... {{ message }}
                    </span>
                    <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                </div>
            </template>


        </q-table>

        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <div class="justify-center">
                        <span class="q-ml-sm">Añadir Una Cliente</span>
                        <q-form @submit="addCustomer" class="q-gutter-md">

                            <q-input v-model="ci" type="number" label="Carnet de Identidad" />
                            <q-input v-model="name" type="text" label="Nombre Cliente" />
                            <q-input v-model="lastname" type="text" label="Apellido Cliente" />
                            <q-input v-model="email" type="text" label="Email" />
                            <q-input v-model="phone" type="text" label="Telefono" />
                            <q-input v-model="address" type="text" label="Direccion" />
                            <q-input v-model="city" type="text" label="Ciudad" />

                            <div>
                                <q-btn flat label="Añadir" type="submit" color="primary" />
                                <q-btn flat label="Cancelar" color="warning" v-close-popup />
                            </div>

                        </q-form>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>



        <q-dialog v-model="confirm2" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <div class="justify-center">
                        <span class="q-ml-sm">Actualizar Una Cliente</span>
                        <q-form @submit="updateCustomer(id)" class="q-gutter-md">

                            <q-input v-model="ci" type="number" label="Carnet de Identidad" />
                            <q-input v-model="name" type="text" label="Nombre Cliente" />
                            <q-input v-model="lastname" type="text" label="Apellido Cliente" />
                            <q-input v-model="email" type="text" label="Email" />
                            <q-input v-model="phone" type="text" label="Telefono" />
                            <q-input v-model="address" type="text" label="Direccion" />
                            <q-input v-model="city" type="text" label="Ciudad" />

                            <div>
                                <q-btn flat label="Añadir" type="submit" color="primary" />
                                <q-btn flat label="Cancelar" color="warning" v-close-popup />
                            </div>

                        </q-form>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>


    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from "src/boot/axios";
import { useQuasar } from 'quasar'


export default {
    setup() {
        const rows = ref([])
        const confirm = ref(false)
        const confirm2 = ref(false)
        const ci = ref('')
        const name = ref('')
        const lastname = ref('')
        const email = ref('')
        const phone = ref('')
        const address = ref('')
        const city = ref('')
        const $q = useQuasar()
        const columns = [

            {
                name: 'ci',
                required: true,
                label: 'ci',
                align: 'left',
                field: row => row.ci,
                format: val => `${val}`,
                sortable: true
            },
            { name: 'name', align: 'center', label: 'name', field: 'name', sortable: true },
            { name: 'lastname', label: 'lastname', field: 'lastname', sortable: true },
            { name: 'email', label: 'email', field: 'email', sortable: true },
            { name: 'phone', label: 'phone', field: 'phone', sortable: true },
            { name: 'address', label: 'address', field: 'address', sortable: true },
            { name: 'city', label: 'city', field: 'city', sortable: true },
            { name: 'actions', label: 'actions', field: 'actions', sortable: true }
        ]
        const getCustomer = async () => {
            try {
                const response = await api.get('/listCustomer')
                rows.value = response.data

            } catch (error) {
                console.log(error)
            }

        }

        const addCustomer = async () => {
            try {
                await api.post('/createCustomer', {
                    ci: ci.value,
                    name: name.value,
                    lastname: lastname.value,
                    email: email.value,
                    phone: phone.value,
                    address: address.value,
                    city: city.value
                })
                ci.value = ''
                name.value = ''
                lastname.value = ''
                email.value = ''
                phone.value = ''
                address.value = ''
                city.value = ''
                $q.notify({
                    color: 'positive',
                    message: 'Cliente añadido correctamente'

                })


                await getCustomer()



            } catch (error) {
                console.log(error)
            }
        }

        const deleteCustomer = async (id) => {
            console.log(id)
            try {

                $q.dialog({
                    title: 'Eliminar Cliente',
                    message: '¿Estas seguro de eliminar este cliente?',
                    color: 'negative',
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {

                    await api.delete(`/deleteCustomer/${id}`)

                    $q.notify({
                        color: 'negative',
                        message: 'Cliente eliminado correctamente'

                    })
                    await getCustomer()

                })

            } catch (error) {
                console.log(error)
            }
        }

        const updateCustomer = async (id) => {
            console.log(id)
            try {

                await api.put(`/updateCustomer/${id}`, {
                    ci: ci.value,
                    name: name.value,
                    lastname: lastname.value,
                    email: email.value,
                    phone: phone.value,
                    address: address.value,
                    city: city.value
                })
                ci.value = ''
                name.value = ''
                lastname.value = ''
                email.value = ''
                phone.value = ''
                address.value = ''
                city.value = ''
                $q.notify({
                    color: 'positive',
                    message: 'Cliente actualizado correctamente'

                })

                await getCustomer()
                confirm2.value = false
            } catch (error) {
                console.log(error)
            }


        }

        onMounted(() => {
            getCustomer()
        })
        return {
            columns,
            rows,
            filter: ref(''),
            addCustomer,
            deleteCustomer,
            updateCustomer,
            confirm,
            confirm2,
            ci,
            name,
            lastname,
            email,
            phone,
            address,
            city

        }
    }
}
</script>
