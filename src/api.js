import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchRecipes = () => axios.get(`${API_URL}/recipes`);
export const addRecipe = (recipe) => axios.post(`${API_URL}/recipes`, recipe);
export const updateRecipe = (id, updatedRecipe) => axios.put(`${API_URL}/recipes/${id}`, updatedRecipe);
export const deleteRecipe = (id) => axios.delete(`${API_URL}/recipes/${id}`);

export const sendMessage = (message) => axios.post(`${API_URL}/messages`, message);