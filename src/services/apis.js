// api config
const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-Cumz7nKQNwKdLJquCWVCq6BY';
let PER_PAGE = 15;

const getCoinList = (currency, page) =>
    `${BASE_URL}/coins/markets?vs_currency=${currency}&per_page=${PER_PAGE}&x_cg_demo_api_key=${API_KEY}&page=${page}`;

const getMarkeChart = (id, days, currency) =>
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${API_KEY}`;

const getCoin = (id) => `${BASE_URL}/coins/${id}?x_cg_demo_api_key=${API_KEY}`;

const search = (inpValue) =>
    `${BASE_URL}/search?x_cg_demo_api_key=${API_KEY}&query=${inpValue}`;

export { getCoinList, getMarkeChart, getCoin, search };
