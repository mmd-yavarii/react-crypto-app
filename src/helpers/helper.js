function setMetaThemColor() {
    const themeColor = document.getElementById('themeColor');

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeColor.setAttribute('content', '#141414');
    } else {
        themeColor.setAttribute('content', '#ffffff');
    }
}

export { setMetaThemColor };
