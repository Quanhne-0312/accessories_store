import { UserActionTypes } from '../constants';

const initState = {
    darkmode: false,
    orders: [],
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.placeNewOrder: {
            const currentOrders = Array.isArray(state.orders) ? state.orders : [];
            const orderUuid = action.payload?.order_uuid;

            return {
                ...state,
                orders: orderUuid ? [orderUuid, ...currentOrders] : currentOrders,
            };
        }

        case UserActionTypes.removeAllOrders:
            return {
                ...state,
                orders: [],
            };

        default:
            return state;
    }
};

export default userReducer;
