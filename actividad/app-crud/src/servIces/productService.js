// services/productService.js
import axios from 'axios';

// IMPORTANTE: Reemplaza esta URL con la que te da MockAPI
const BASE_URL = 'https://6921a0df512fb4140be0d2d0.mockapi.io/api/v1';

// ========== USUARIOS ==========
export async function getAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

export async function loginUser(usuario, clave) {
  try {
    const usuarios = await getAllUsers();
    return usuarios.find(u => u.usuario === usuario && u.clave === clave);
  } catch (error) {
    console.error('Error en login:', error);
    return null;
  }
}

// ========== PRODUCTOS ==========
export async function getAllProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
}

export async function createProduct(product) {
  try {
    const response = await axios.post(`${BASE_URL}/productos`, product);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
}

export async function updateProduct(id, product) {
  try {
    const response = await axios.put(`${BASE_URL}/productos/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
}