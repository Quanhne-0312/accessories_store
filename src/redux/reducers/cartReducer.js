import { CartActionTypes } from '../constants';

const initState = {
    isOpen: false,
    quantity: 0,
    subtotal: 0,
    items: [],
};

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case CartActionTypes.open:
            return {
                ...state,
                isOpen: true,
            };

        case CartActionTypes.close:
            return {
                ...state,
                isOpen: false,
            };

        case CartActionTypes.addItem:
            // if not have any item, let's push this item
            if (state.quantity === 0) {
                return {
                    ...state,
                    quantity: state.quantity + 1,
                    subtotal: state.subtotal + action.payload.price,
                    items: [...state.items, action.payload],
                };
                // else have item(s), let's check
            } else {
                let isExistItem = false;
                // if adding item is exist, just increase the quantity
                // eslint-disable-next-line array-callback-return
                state.items.map((item, index) => {
                    if (item.id === action.payload.id) {
                        state.items[index].quantity = state.items[index].quantity + 1;
                        isExistItem = true;
                    }
                });
                // else adding item is not exist, let's push this item
                if (!isExistItem) {
                    state.items = [...state.items, action.payload];
                }
                // finally update quantity and subtotal
                return {
                    ...state,
                    quantity: state.quantity + 1,
                    subtotal: state.subtotal + action.payload.price,
                };
            }

        case CartActionTypes.removeItem:
            // eslint-disable-next-line array-callback-return
            state.items.map((item, index) => {
                if (item.id === action.payload.id) {
                    state.quantity = state.quantity - state.items[index].quantity;
                    state.subtotal =
                        state.subtotal < state.items[index].quantity * state.items[index].price
                            ? 0
                            : state.subtotal - state.items[index].quantity * state.items[index].price;
                    state.items = state.items.filter((item) => item.id !== action.payload.id);
                }
            });
            return {
                ...state,
            };

        case CartActionTypes.increaseItem:
            // eslint-disable-next-line array-callback-return
            state.items.map((item, index) => {
                if (item.id === action.payload.id) {
                    state.items[index].quantity = state.items[index].quantity + 1;
                    state.quantity = state.quantity + 1;
                    state.subtotal += state.items[index].price;
                }
            });
            return {
                ...state,
            };

        case CartActionTypes.descreaseItem:
            // eslint-disable-next-line array-callback-return
            state.items.map((item, index) => {
                if (item.id === action.payload.id) {
                    if (state.items[index].quantity > 1) {
                        state.items[index].quantity = state.items[index].quantity - 1;
                        state.quantity = state.quantity > 1 ? state.quantity - 1 : 0;
                        state.subtotal =
                            state.subtotal < state.items[index].price ? 0 : state.subtotal - state.items[index].price;
                    }
                }
            });
            return {
                ...state,
            };

        case CartActionTypes.removeAll:
            return {
                ...state,
                quantity: 0,
                subtotal: 0,
                items: [],
            };

        default:
            return state;
    }
};

export default cartReducer;
