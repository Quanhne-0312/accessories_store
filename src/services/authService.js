import * as publicRequest from '@/utils/public-request';
import * as authorizationRequest from '@/utils/authorization-request';
import { refreshCustomerTokens } from '@/utils/token-refresh';
import store from '../redux/store';

/** PUBLIC */

export const loginService = async (username, password) => {
    const path = 'auth/customer/login';
    const payload = {
        username: username.trim(),
        password,
    };
    try {
        const result = await publicRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
        return error?.response?.data ?? {
            code: 'NETWORK_ERROR',
            message: 'Không thể kết nối tới máy chủ.',
        };
    }
};

export const registerService = async (data) => {
    const path = 'auth/customer/register';
    const payload = {
        ...data,
    };
    try {
        const result = await publicRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
        return error?.response?.data ?? {
            code: 'NETWORK_ERROR',
            message: 'Không thể kết nối tới máy chủ.',
        };
    }
};

/** AUTHORIZATION */

export const logoutService = async (phone_number) => {
    const path = 'auth/customer/logout';
    const accessToken = store.getState().auth.accessToken;
    const payload = {
        phone_number,
    };
    try {
        const result = await authorizationRequest.postApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const refreshTokensService = async () => {
    try {
        return await refreshCustomerTokens();
    } catch (error) {
        console.log(error);
    }
};

export const updateProfileService = async (data) => {
    const path = 'auth/customer/update-profile';
    const accessToken = store.getState().auth.accessToken;
    const payload = data;

    try {
        const result = await authorizationRequest.putApi(path, payload, accessToken);
        return result;
    } catch (error) {
        console.log(error);
    }
};
