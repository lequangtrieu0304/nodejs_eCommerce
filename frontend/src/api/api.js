import axios from "axios"
import { getUserInfo } from "../localStorage";

export const getProducts = async () => {
    try{
        const response = await axios({
            url: `http://localhost:3001/api/products`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axios({
            url: `http://localhost:3001/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if( response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }

        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const createProduct = async () => {
    try {
        const {token} = getUserInfo();
        const response = await axios({
            url: `http://localhost:3001/api/products`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if(response.statusText !== 'Created'){
            throw new Error(response.data.message);
        }
        console.log(response.data);
        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const updatedProduct = async (product) => {
    try {
        const {token} = getUserInfo();
        const response = await axios({
            url: `http://localhost:3001/api/products/${product._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: product,
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }

        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const uploadProductImage = async (formData) => {
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `http://localhost:3001/api/uploadImg`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            data: formData,
        });

        if(response.statusText !== 'Created'){
            throw new Error(response.data.message);
        }

        return response.data;
    }
    catch(err){
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const getOrder = async (id) => {
    try {
        const {token} = getUserInfo();
        const response = await axios({
            url: `http://localhost:3001/api/orders/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err) {
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const createOrder = async (order) => {
    const {token} = getUserInfo();
    try{
        const response = await axios({
            url: 'http://localhost:3001/api/orders/create-order',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: order,
        });
        if(response.statusText !== 'Created') {
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch (err){
        return {
            error: err.response.data.message || err.message 
        }
    }
}

export const signin = async ({email, password}) => {
    try{
        const response = await axios({
            url: `http://localhost:3001/api/users/signin`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
        
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err) {
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const register = async ({name, email, password}) => {
    try{
        const response = await axios({
            url: `http://localhost:3001/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'Created'){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err) {
        return {
            error: err.response.data.message || err.message
        }
    }
}

export const update = async ({name, email, password}) => {
    try{
        const {_id, token} = getUserInfo();
        const response = await axios({
            url: `http://localhost:3001/api/users/update/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message)
        }
        return response.data;
    }
    catch(err) {
        return {
            error: err.response.data.message || err.message
        }
    }
}