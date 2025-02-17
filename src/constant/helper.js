// set dark/light mood automatically
function autoDarkmoodHandler() {
    const isLight =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches;

    if (isLight) {
        document.documentElement.style.setProperty(
            '--background-color',
            '#fafafa',
        );

        document.documentElement.style.setProperty(
            '--text-primary-color',
            '#2d2d2d',
        );
        document.documentElement.style.setProperty(
            '--text-secondary-color',
            '#a4a4a4',
        );
        document.documentElement.style.setProperty('--border-color', '#e9e9e9');
        document.documentElement.style.setProperty(
            '--them-secondary-color',
            '#f3f3f763',
        );
    } else {
        document.documentElement.style.setProperty(
            '--background-color',
            '#141414',
        );
        document.documentElement.style.setProperty(
            '--text-primary-color',
            '#f6f8fc',
        );
        document.documentElement.style.setProperty(
            '--text-secondary-color',
            '#84858b',
        );
        document.documentElement.style.setProperty('--border-color', '#313131');
        document.documentElement.style.setProperty(
            '--them-secondary-color',
            '#1c1c21',
        );
    }
}

export { autoDarkmoodHandler };
