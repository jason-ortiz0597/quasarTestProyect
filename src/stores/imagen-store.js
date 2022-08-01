import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios'


export const useImagenStore = defineStore('image', () => {
    const name = ref('');
    const description = ref('');
    const price = ref('');
    const image = ref('');
    const products = ref([]);

    const addImage = async (name, description , price, image) => {
        const response = await api.post('/createProduct', {
            name,
            description,
            price,
            image
        });
        return response.data;
    }

    

    return {
        name,
        description,
        price,
        image,
        products,
        addImage
    }
});
