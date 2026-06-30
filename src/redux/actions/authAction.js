import { authService } from '@/services';
import { AuthActionTypes } from '../constants';

export const login = (data) => ({
    type: AuthActionTypes.login,
    payload: {
        data: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    },
});

export const logout = () => ({
    type: AuthActionTypes.logout,
});

export const mapTokens = (accessToken, refreshToken) => ({
    type: AuthActionTypes.refresh,
    payload: {
        accessToken,
        refreshToken,
    },
});

export const refreshTokens = () => async (dispatch) => {
    const response = await authService.refreshTokensService();
    if (!response?.accessToken || !response?.refreshToken) {
        dispatch(logout());
        throw new Error(response?.message || 'Unable to refresh token');
    }
    dispatch(mapTokens(response.accessToken, response.refreshToken));
};

// PROFILE

export const updateProfile = (newProfile) => ({
    type: AuthActionTypes.ProfileUpdate,
    payload: newProfile,
});
