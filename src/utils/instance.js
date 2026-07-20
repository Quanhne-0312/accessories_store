import store from '@/redux/store';
import axios from 'axios';
import apiBaseUrl from './api-base-url';
import { refreshCustomerTokens } from './token-refresh';

const instance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        const isRefreshRequest = originalConfig?.url?.includes('auth/customer/refresh');

        if (err.response?.status === 401 && originalConfig && !originalConfig._retry && !isRefreshRequest) {
            originalConfig._retry = true;

            try {
                await refreshCustomerTokens();
                return instance(originalConfig);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(err);
    },
);

export default instance;
