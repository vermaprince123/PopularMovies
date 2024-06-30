import ApiConfig from './apiConfig';
import axiosInstance from './interceptor';


export const fetchMovies = async (query) => {
  try {
    const response = await axiosInstance.get(ApiConfig.discoverMovie, { params:{ ...query }});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  
    return {
      data:{
        token:'dummy_token'
      }
    }
  
  try {
    const response = await axiosInstance.post(ApiConfig.login, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
