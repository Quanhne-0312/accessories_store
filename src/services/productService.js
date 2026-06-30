import * as publicRequest from '@/utils/public-request';
import * as authorizationRequest from '@/utils/authorization-request';
import store from '../redux/store';

/** PUBLIC */

export const getCategoriesService = async () => {
    const path = 'category/get';

    const payload = {};

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getMaterialsService = async () => {
    const path = 'material/get';

    const payload = {};

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getColorsService = async () => {
    const path = 'color/get';

    const payload = {};

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getProductsCountService = async () => {
    const path = 'product/count';

    const payload = {};

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getProductsService = async (categories, page, filters = {}) => {
    const path = 'product/get';

    const payload = {
        categories,
        materials: filters.materials,
        colors: filters.colors,
        page,
    };

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const getProductBySlugService = async (slug) => {
    const path = 'product/get';

    const payload = {
        slug,
    };

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const searchProductsService = async (keyword, page) => {
    const path = 'product/search';

    const payload = {
        keyword,
        page,
    };

    try {
        const result = await publicRequest.getApi(path, payload);
        return result;
    } catch (error) {
        console.log(error);
    }
};
