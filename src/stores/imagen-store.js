import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios'


export const useImagenStore = defineStore('image', () => {
    const name = ref('');
    const description = ref('');
    const price = ref('');
    const images = ref([]);
    const products = ref([]);

    const addImage = async (name, description , price, images) => {
        const response = await api.post('/createProduct', {
            name ,
            description ,
            price ,
            images,
            
        });
        console.log(response);
        return response.data;
    }
    
    const getProducts = async () => {
        const response = await api.get('/listProduct');
        response.data.map(product => {
            products.value.push(product);
        } );
        return response.data;
      
    }

    const deleteProduct = async (id) => {
        const response = await api.delete(`/deleteProduct/${id}`);
        return response.data;
    }

    

    return {
        name,
        description,
        price,
        images ,
        products,
        addImage,
        getProducts
    }
});
