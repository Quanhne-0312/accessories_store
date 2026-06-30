export const AuthActionTypes = Object.freeze({
    login: 'AUTH_LOGIN',
    logout: 'AUTH_LOGOUT',
    refresh: 'AUTH_REFRESH',
    ProfileUpdate: 'AUTH_UPDATE_PROFILE',
});

export const UserActionTypes = Object.freeze({
    placeNewOrder: 'USER_ADD_ORDER',
    removeAllOrders: 'USER_REMOVE_ALL_ORDER',
    toggleDarkmode: 'USER_TOGGLE_DARKMODE',
});

export const CartActionTypes = Object.freeze({
    open: 'CART_OPEN',
    close: 'CART_CLOSE',
    addItem: 'CART_ADD_ITEM',
    removeItem: 'CART_REMOVE_ITEM',
    increaseItem: 'CART_INCREASE_ITEM',
    descreaseItem: 'CART_DESCREASE_ITEM',
    removeAll: 'CART_REMOVE_ALL',
});
