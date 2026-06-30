import { AuthActionTypes } from '../constants';

const initState = {
    isLogged: false,
    data: {},
    accessToken: null,
    refreshToken: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AuthActionTypes.login:
            return {
                ...state,
                isLogged: true,
                ...action.payload,
            };

        case AuthActionTypes.logout:
            return {
                isLogged: false,
                data: {},
                accessToken: null,
                refreshToken: null,
            };

        case AuthActionTypes.refresh:
            return {
                ...state,
                ...action.payload,
            };

        case AuthActionTypes.ProfileUpdate:
            return {
                ...state,
                data: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
