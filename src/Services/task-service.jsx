import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = "http://localhost:8080/api/tasks"
const TaskService = {
    create:async (data) => {
        try {
            const header = {
                headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
                }}
                console.log(header)
          const response = await axios.post(`${API_BASE_URL}`, data,header);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      update:async (id,data) => {
        try {
            const header = {
                headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
                }}
                console.log(header)
          const response = await axios.put(`${API_BASE_URL}/${id}`, data,header);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    getByUser:async (idUser) => {
        try {
            const header = {
                headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
                }}
                
          const response = await axios.get(`${API_BASE_URL}/user/${idUser}`,header);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      delete:async (id) => {
        try {
            const header = {
                headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
                }}
                
          const response = await axios.delete(`${API_BASE_URL}/${id}`,header);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
}

export default TaskService;