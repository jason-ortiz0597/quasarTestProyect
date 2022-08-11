import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios'


export const useImagenStore = defineStore('image', () => {
    const name = ref('');
    const description = ref('');
    const price = ref('');
    const image = ref([]);
    const products = ref([]);


   /* const addImage = async (name, description, price) => {
        try {
            const response = await api.post('/createProduct', {
                name,
                description,
                price,
                
            });
           
            
        } catch (error) {
            console.log(error);
        }

    }*/

    const getProducts = async () => {
        try {
            const response = await api.get('/listProduct');
            response.data.map(product => {
                products.value.push(product);
            });

            return response.data;
        } catch (error) {
            console.log(error);
        }

    }

    const deleteProduct = async (_id) => {
        try {
            const response = await api.delete(`/deleteProduct/${_id}`);
            products.value = products.value.filter(product => product._id !== _id);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateProduct = async (_id) => {
        try {
            const response = await api.put(`/updateProduct/${_id}`,{
                name,
                description,
                price,
                image
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
        
    }





    return {
        name,
        description,
        price,
        image,
        products,
       // addImage,
        getProducts,
        deleteProduct,
        updateProduct

    }
});
