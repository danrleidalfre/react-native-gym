import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: 'http://10.0.0.116:3333'
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    }

    return Promise.reject(new AppError('Erro no servidor, tente novamente mais tarde.'))
  }
)

export { api };
