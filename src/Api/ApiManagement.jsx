// ApiManagement.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inshortsapi.vercel.app/news',
});

export const fetchNews = async (params) => {
  try {
    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    throw error;
  }
};
