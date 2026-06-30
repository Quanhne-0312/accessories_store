import { UserActionTypes } from '../constants';

const initState = {
    darkmode: false,
    orders: [],
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case UserActionTypes.placeNewOrder:
            return {
                ...state,
                orders: [action.payload.order_uuid, ...state.orders],
            };

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
