(() => {
    const init = () => {
        const modules = window.PortfolioModules || {};
        ['initTheme', 'initNavigation', 'initProjects', 'initContact', 'initGitHub'].forEach((name) => {
            if (typeof modules[name] === 'function') {
                try {
                    modules[name]();
                } catch (error) {
                    console.error(`No fue posible inicializar ${name}.`, error);
                }
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
