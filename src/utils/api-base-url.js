const configuredBaseUrl =
    import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_DEVELOPMENT_SERVER_URL
        : import.meta.env.VITE_PRODUCTION_SERVER_URL;

const normalizedBaseUrl =
    typeof configuredBaseUrl === 'string' ? configuredBaseUrl.trim().replace(/\/+$/, '') : '';

// Production deployments commonly serve the API behind the same origin. Keep
// local development configurable, but never fall back to a localhost address
// in a production bundle.
export const apiBaseUrl = normalizedBaseUrl ? `${normalizedBaseUrl}/` : '/api/';

export default apiBaseUrl;
