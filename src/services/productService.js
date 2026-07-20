import * as publicRequest from '@/utils/public-request';
import * as authorizationRequest from '@/utils/authorization-request';
import store from '../redux/store';

let allProductsCache = null;
let allProductsCacheExpiresAt = 0;
let allProductsRequest = null;

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

export const getAllProductsService = async () => {
    const now = Date.now();

    if (allProductsCache && allProductsCacheExpiresAt > now) {
        return allProductsCache;
    }

    if (!allProductsRequest) {
        allProductsRequest = (async () => {
            const firstResponse = await getProductsService('all', 1);
            if (firstResponse?.code !== 'SUCCESS') return [];

            const totalPages = Number(firstResponse.total_pages) || 1;
            const otherPages = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => index + 2);
            const otherResponses = await Promise.all(
                otherPages.map((page) => getProductsService('all', page)),
            );

            const products = [firstResponse, ...otherResponses]
                .filter((response) => response?.code === 'SUCCESS')
                .flatMap((response) => response.result || []);

            allProductsCache = products;
            allProductsCacheExpiresAt = Date.now() + 30000;
            return products;
        })().finally(() => {
            allProductsRequest = null;
        });
    }

    return allProductsRequest;
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
