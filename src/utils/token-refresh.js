import store from '@/redux/store';
import { AuthActionTypes } from '@/redux/constants';
import axios from 'axios';
import apiBaseUrl from './api-base-url';

const refreshRequest = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let refreshPromise = null;

const dispatchLogout = () => {
    store.dispatch({ type: AuthActionTypes.logout });
};

export const refreshCustomerTokens = () => {
    if (!refreshPromise) {
        const refreshToken = store.getState().auth.refreshToken;

        if (!refreshToken) {
            dispatchLogout();
            return Promise.reject(new Error('Missing refresh token'));
        }

        refreshPromise = refreshRequest
            .post('auth/customer/refresh', {
                'x-refresh-token': refreshToken,
            })
            .then(({ data }) => {
                const { accessToken, refreshToken: nextRefreshToken } = data || {};

                if (!accessToken || !nextRefreshToken) {
                    throw new Error(data?.message || 'Unable to refresh token');
                }

                store.dispatch({
                    type: AuthActionTypes.refresh,
                    payload: {
                        accessToken,
                        refreshToken: nextRefreshToken,
                    },
                });

                return {
                    ...data,
                    accessToken,
                    refreshToken: nextRefreshToken,
                };
            })
            .catch((error) => {
                dispatchLogout();
                throw error;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};
