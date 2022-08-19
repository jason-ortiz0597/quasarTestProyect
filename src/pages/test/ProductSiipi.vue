<template>

    <div class="q-ma-md row">
        <div class="col-8">
            <div class="row justify-between">

                <h6 class="q-my-none col-6">PRODUCTOS</h6>
                <q-btn color="positive" icon="add" label="Nuevo" no-caps @click="(editar = true)" v-if="!editar" />
                <q-btn color="negative" icon="cancel" label="Terminar" @click="(editar = false)" v-else />


            </div>
            <div class="q-pa-none">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" v-if="editar">
                    <q-input v-model="name" type="text" label="Nombre Del Producto" filled />
                    <q-input v-model="description" type="text" label="Descripcion Del Producto" filled />
                    <q-select v-model="category"  label="seleccione una categoria" filled use-input  hide-selected >
                        <template v-slot:after>
                            <q-btn color="positive" round dense flat icon="add" @click="catDialog = true">
                                <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-orange ">
                                    Añadir Nueva Categoria</q-tooltip>
                            </q-btn>
                        </template>
                    </q-select>

                    <q-select v-model="subcategoria" label="seleccione una subcategoria" filled>
                        <template v-slot:after>
                            <q-btn color="positive" round dense flat icon="add" @click="subcatDialog = true">
                                <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-orange ">
                                    Añadir Nueva SubCategoria</q-tooltip>
                            </q-btn>
                        </template>
                    </q-select>

                    <q-select v-model="clase" label="seleccione una clase" filled>
                        <template v-slot:after>
                            <q-btn color="positive" round dense flat icon="add" @click="classDialog = true">
                                <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-orange ">
                                    Añadir Nueva Clase</q-tooltip>
                            </q-btn>
                        </template>
                    </q-select>

                    <q-input v-model="unidad" type="text" label="Unidad de Producto" filled />
                    <q-checkbox right-label v-model="estado" label="Estado del Producto" />


                    <div>
                        <q-btn label="Agregar" type="submit" color="primary" />
                        <q-btn label="Cancelar" type="reset" color="warning" class="q-ml-sm" />
                    </div>
                </q-form>

            </div>
        </div>
    </div>

    <q-dialog v-model="catDialog" persistent>
        <q-card>
            <q-card-section class="row items-center">


                <div class="justify-center">
                    <span class="q-ml-sm">Añadir Una Nueva Categoria</span>
                    <q-form @submit="onSubmitCategoria" class="q-gutter-md">
                        <q-input v-model="nombreCat" type="text" label="Nombre Categoria" />
                        <q-input v-model="descripCat" type="text" label="Descripcion" />
                        <q-checkbox right-label v-model="estadoCat" label="Estado de Categoria" />
                        <div>
                            <q-btn flat label="Añadir" type="submit" color="primary" />
                            <q-btn flat label="Cancelar" color="warning" v-close-popup />
                        </div>

                    </q-form>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>

    <q-dialog v-model="subcatDialog" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <div class="justify-center">
                    <span class="q-ml-sm">Añadir Una Nueva SubCategoria</span>
                    <q-form @submit="onSubmitSubCategoria" class="q-gutter-md">
                        <q-input v-model="nombreSubCat" type="text" label="Nombre SubCategoria" />
                        <q-input v-model="descripSubCat" type="text" label="Descripcion" />
                        <q-checkbox right-label v-model="estadoSubCat" label="Estado de SubCategoria" />
                        <div>
                            <q-btn flat label="Añadir" type="submit" color="primary" />
                            <q-btn flat label="Cancelar" color="warning" v-close-popup />
                        </div>

                    </q-form>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>

     <q-dialog v-model="classDialog" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <div class="justify-center">
                    <span class="q-ml-sm">Añadir Una Nueva Clase</span>
                    <q-form @submit="onSubmitClase" class="q-gutter-md">
                        <q-input v-model="nombreClase" type="text" label="Nombre Clase" />
                        <q-input v-model="descripClase" type="text" label="Descripcion" />
                        <q-checkbox right-label v-model="estadoClase" label="Estado de Clase" />
                        <div>
                            <q-btn flat label="Añadir" type="submit" color="primary" />
                            <q-btn flat label="Cancelar" color="warning" v-close-popup />
                        </div>

                    </q-form>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>


</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from 'src/boot/axios';

export default defineComponent({
    name: 'CreateProduct',
    setup() {
        const nombre = ref('');
        const descripcion = ref('');
        const categoria = ref('');
        const subcategoria = ref('');
        const clase = ref('');
        const unidad = ref('');
        const estado = ref(false);
        const editar = ref(false);
        const catDialog = ref(false);
        const nombreCat = ref('');
        const descripCat = ref('');
        const estadoCat = ref(false);
        const subcatDialog = ref(false);
        const nombreSubCat = ref('');
        const descripSubCat = ref('');
        const estadoSubCat = ref(false);
        const classDialog = ref(false);
        const nombreClase = ref('');    
        const descripClase = ref('');
        const estadoClase = ref(false);
        const onSubmit = () => {
            console.log('submit');
        }
        const onReset = () => {
            nombre.value = '';
            descripcion.value = '';
            categoria.value = '';
            subcategoria.value = '';
            clase.value = '';
            unidad.value = '';
            estado.value = false;
        }
        const onSubmitCategoria = () => {
            api.post('/api/categoria/createCat', {
                nombre: nombreCat.value,
                descripcion: descripCat.value,
                estado: estadoCat.value
            }).then(res => {
                nombreCat.value = '';
                descripCat.value = '';
                estadoCat.value = false;
                catDialog.value = false;
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }

        const onSubmitSubCategoria = () => {
            api.post('/api/subcategoria/createSub', {
                nombre: nombreSubCat.value,
                descripcion: descripSubCat.value,
                estado: estadoSubCat.value
            }).then(res => {
                nombreSubCat.value = '';
                descripSubCat.value = '';
                estadoSubCat.value = false;
                subcatDialog.value = false;
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
        const onSubmitClase = () => {
            api.post('/api/clase/createClase', {
                nombre: nombreClase.value,
                descripcion: descripClase.value,
                estado: estadoClase.value
            }).then(res => {
                nombreClase.value = '';
                descripClase.value = '';
                estadoClase.value = false;
                classDialog.value = false;
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
        
        
        return {
            onSubmit,
            onReset,
            nombre,
            descripcion,
            categoria,
            subcategoria,
            clase,
            unidad,
            estado,
            editar,
            catDialog,
            nombreCat,
            descripCat,
            estadoCat,
            onSubmitCategoria,
            subcatDialog,
            nombreSubCat,
            descripSubCat,
            estadoSubCat,
            onSubmitSubCategoria,
            classDialog,
            nombreClase,
            descripClase,
            estadoClase,
            onSubmitClase,
            
            
    
        }
    }
})
</script>