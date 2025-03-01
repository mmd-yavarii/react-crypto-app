// api config
const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-PEjDbtV4qpwn9r2wGYTpn94z';
let PER_PAGE = 8;

const getCoinList = (currency, page, sortBy = 'market_cap_desc') =>
    // volume_desc
    `${BASE_URL}/coins/markets?vs_currency=${currency}&per_page=${PER_PAGE}&x_cg_demo_api_key=${API_KEY}&page=${page}&order=${sortBy}`;

const getMarkeChart = (id, days, currency) =>
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${API_KEY}`;

const getCoin = (id) => `${BASE_URL}/coins/${id}?x_cg_demo_api_key=${API_KEY}`;

const search = (inpValue) =>
    `${BASE_URL}/search?x_cg_demo_api_key=${API_KEY}&query=${inpValue}`;

const posLogin = 'https://reqres.in/api/login';

export { getCoinList, getMarkeChart, getCoin, search, posLogin };
