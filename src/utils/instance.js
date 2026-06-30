import { logout, mapTokens } from '@/redux/actions/authAction';
import store from '@/redux/store';
import axios from 'axios';

const instance = axios.create({
    baseURL:
        import.meta.env.MODE === 'development'
            ? import.meta.env.VITE_DEVELOPMENT_SERVER_URL
            : import.meta.env.VITE_PRODUCTION_SERVER_URL,
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

let retryCounter = 0;

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            if (err.response.status === 401 && !originalConfig._retry && retryCounter < 5) {
                originalConfig._retry = true;
                retryCounter++;

                try {
                    const res = await instance.post('/auth/customer/refresh', {
                        'x-refresh-token': store.getState().auth.refreshToken,
                    });
                    const { accessToken, refreshToken } = res.data;
                    if (!accessToken || !refreshToken) {
                        store.dispatch(logout());
                        return Promise.reject(err);
                    }
                    store.dispatch(mapTokens(accessToken, refreshToken));
                    return instance(originalConfig);
                } catch (_error) {
                    store.dispatch(logout());
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    },
);

export default instance;
