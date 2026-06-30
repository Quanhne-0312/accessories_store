import * as publicRequest from '@/utils/public-request';
import * as authorizationRequest from '@/utils/authorization-request';
import store from '../redux/store';

/** PUBLIC */

export const getPaymentMethodsService = async () => {
    const path = 'payment-method/get';

    const payload = {};

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const checkoutService = async (data) => {
    const path = 'order/checkout';
    const payload = data;

    try {
        const result = await publicRequest.postApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getOneOrderByUuidService = async (order_uuid) => {
    const path = 'order/get';

    const payload = {
        order_uuid,
    };

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersByConditionService = async (order_uuids, phone_number) => {
    const path = 'order/get';

    const payload = {
        encoded_uuids: order_uuids,
        phone_number,
    };

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};
