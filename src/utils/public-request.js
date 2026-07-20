import axios from 'axios';
import apiBaseUrl from './api-base-url';

const request = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15000,
});

export const getApi = async (url, payload) => {
    const config = {
        params: payload,
    };

    const response = await request.get(url, config);
    return response.data;
};

export const postApi = async (url, payload) => {
    const response = await request.post(url, payload);
    return response.data;
};

export const putApi = async (url, payload) => {
    const response = await request.put(url, payload);
    return response.data;
};

export const deleteApi = async (url, payload) => {
    const config = {
        data: payload,
    };

    const response = await request.delete(url, config);
    return response.data;
};

export default request;
