import { CartActionTypes } from '../constants';

export const openCartModal = () => ({
    type: CartActionTypes.open,
});

export const closeCartModal = () => ({
    type: CartActionTypes.close,
});

export const cartItemAdd = (item) => ({
    type: CartActionTypes.addItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemRemove = (item) => ({
    type: CartActionTypes.removeItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemIncrease = (item) => ({
    type: CartActionTypes.increaseItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemDescrease = (item) => ({
    type: CartActionTypes.descreaseItem,
    payload: { ...item, quantity: 1 },
});

export const cartItemRemoveAll = () => ({
    type: CartActionTypes.removeAll,
});
