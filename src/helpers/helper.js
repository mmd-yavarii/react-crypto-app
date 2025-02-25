const passwordRegex = /^[A-Za-z\d]{9,}$/;
const emailRegex =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;

function setMetaThemColor() {
    const themeColor = document.getElementById('themeColor');

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeColor.setAttribute('content', '#141414');
    } else {
        themeColor.setAttribute('content', '#ffffff');
    }
}

const loadingColor = getComputedStyle(root).getPropertyValue(
    '--text-primary-color',
);

export { setMetaThemColor, loadingColor, passwordRegex, emailRegex };
