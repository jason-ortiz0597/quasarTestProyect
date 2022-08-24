<template>
  <div class="q-ma-md row">
    <div class="q-gutter-md col-4">
      <div class="row justify-between">
        <h6 class="q-my-none col-6">{{ titlle }}</h6>

        <q-btn color="orange-14" v-if="hide" icon="fa-solid fa-circle-plus" @click="onHide">
          <q-tooltip transition-show="flip-right" transition-hide="flip-left">
            Agregar Proveedor</q-tooltip>
        </q-btn>

        <q-btn color="secondary" v-else icon="fa-solid fa-rotate-right" @click="onHide" />
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" v-if="!hide">
        <q-input v-model="nameR" type="text" label="Razon Social" filled />
        <q-input v-model="address" type="text" label="Direccion" filled />
        <q-input v-model="phone" type="number" label="Telefono 1" filled />
        <q-input v-model="phone2" type="number2" label="Telefono 2" filled />
         <q-input v-model="email"  type="email" label="Correo" filled/>


        <div>
          <q-btn label="Agregar" type="submit" color="orange-14" />
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProvaiderTest",
  setup() {
    const titlle = ref("Proveedores Siipi")
    const hide = ref(true)
    const nameR = ref('')
    const address = ref('')
    const phone = ref('')
    const phone2 = ref('')
    const email = ref ('')

    const onHide = () => {
      hide.value = !hide.value;
    };

    const onReset = () => {
      nameR.value = ''
      address.value = ''
      phone.value = ''
      phone2.value =''
    }

    const onSubmit   = () => {
       console.log (nameR,address,phone,phone2)
    }

    return {
      titlle,
      hide,
      onHide,
      onReset,
      onSubmit,
      nameR,
      address,
      phone,
      phone2,
      email
    };
  },
});
</script>
