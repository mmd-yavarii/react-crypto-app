// api config
const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-Cumz7nKQNwKdLJquCWVCq6BY';
let PER_PAGE = 10;

// set dark/light mood automatically
if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
) {
    document.documentElement.style.setProperty('--background-color', '#fafafa');
    document.documentElement.style.setProperty('--border-color', '#dddddd');
    document.documentElement.style.setProperty(
        '--text-primary-color',
        '#2d2d2d',
    );
    document.documentElement.style.setProperty(
        '--text-secondary-color',
        '#a4a4a4',
    );
    document.documentElement.style.setProperty(
        '--them-secondary-color',
        '#fafafa',
    );
    document.documentElement.style.setProperty('--background-color', '#f4f4f4');
}

export { BASE_URL, API_KEY, PER_PAGE };
