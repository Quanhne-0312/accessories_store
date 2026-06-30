import { UserActionTypes } from '../constants';

export const userPlaceNewOrder = (order_uuid) => ({
    type: UserActionTypes.placeNewOrder,
    payload: { order_uuid },
});

export const userRemoveAllOrders = () => ({
    type: UserActionTypes.removeAllOrders,
});
