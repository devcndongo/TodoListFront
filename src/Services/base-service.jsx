import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = "http://localhost:8080"

const ApiService = {
    register: async (data) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/sign-up`, data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      auth: async (data) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/authenticate`, data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      
      getId: async (id) => {
        try {
          const header = {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            }}
          const response = await axios.get(`${API_BASE_URL}/api/users/${id}`,header);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      logout:async () => {
        try {
            const header = {
                headers: {
                  Authorization: `${Cookies.get('token')}`,
                }}
          const response = await axios.get(`${API_BASE_URL}/logout`,header);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
};

export default ApiService;
