import { Product } from '../types/Product';

// const BASE_URL = 'https://back-taskapp.onrender.com/tasks';
const BASE_URL = 'http://localhost:3000/products';

export const ProductService = {
  
    // Obtener todas las tareas
    getAllProducts: async (): Promise<Product[]> => {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        return data;
    },

    // Obtener una tarea
    getOneProduct: async (id: number): Promise<Product> => {
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        return data;
    },

    // Obtener tareas en una categoria
    getProductInCategory: async (category: string): Promise<Product[]> => {
        const response = await fetch(`${BASE_URL}?category=${category}`);
        const data = await response.json();
        return data;
    },

    // Eliminar una tarea
    deleteProduct: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/${id}`, {
          method: 'DELETE',
        });
    },

    // Usamos PATCH para actualizar solo un campo
    updateStateTask: async (id: number, newState: string): Promise<Product> => {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                estado: newState
            })
        })
        .then(res => res.json())
        .then(json => {
            return json;
        })
        .catch(error => error);
    },


  createTask: async (task : Product):Promise<Product> => {

    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    const data = await response.json();
    return data;
    
},

};
