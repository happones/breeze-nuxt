import axios, {isCancel, AxiosError} from 'axios';
import { useRuntimeConfig } from "nuxt/app";

export const useAxios = () => {
    const runtimeConfig = useRuntimeConfig();
    const { backendUrl } = runtimeConfig.public;
    return axios.create({
        baseURL: backendUrl,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "application/json"
        },
        withCredentials: true
    })
}
