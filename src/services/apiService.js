import ApiConfig from './apiConfig';
import axiosInstance from './interceptor';


export const fetchMovies = async (query) => {
  const url = ApiConfig.discoverMovie;
  try {
    const response = await axiosInstance.get(url, { params:{ ...query }});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
