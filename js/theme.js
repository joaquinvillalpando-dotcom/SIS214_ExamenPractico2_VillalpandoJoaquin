(() => {
    const { storageKey } = window.PortfolioConfig;

    const leerPreferencias = () => {
        try {
            const guardadas = localStorage.getItem(storageKey);
            return guardadas ? JSON.parse(guardadas) : {};
        } catch (error) {
            console.warn('No fue posible leer las preferencias.', error);
            return {};
        }
    };

    const guardarPreferencias = (preferencias) => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(preferencias));
        } catch (error) {
            console.warn('No fue posible guardar las preferencias.', error);
        }
    };

    const aplicarTema = (tema) => {
        const boton = document.getElementById('boton_tema');
        const icono = document.getElementById('icono_tema');
        const texto = document.getElementById('texto_tema');
        const temaSeguro = tema === 'light' ? 'light' : 'dark';
        const esOscuro = temaSeguro === 'dark';

        document.documentElement.dataset.theme = temaSeguro;

        if (boton) {
            boton.setAttribute(
                'aria-label',
                esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
            );
            boton.setAttribute('aria-pressed', String(esOscuro));
        }

        if (icono) {
            icono.textContent = esOscuro ? '☼' : '☾';
        }

        if (texto) {
            texto.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
        }
    };

    const initTheme = () => {
        const boton = document.getElementById('boton_tema');
        if (!boton) return;

        const preferencias = leerPreferencias();
        const temaInicial = preferencias.tema || document.documentElement.dataset.theme;
        aplicarTema(temaInicial);

        boton.addEventListener('click', () => {
            const temaActual = document.documentElement.dataset.theme;
            const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';

            aplicarTema(nuevoTema);
            guardarPreferencias({ ...leerPreferencias(), tema: nuevoTema });
        });
    };

    window.PortfolioModules = window.PortfolioModules || {};
    window.PortfolioModules.initTheme = initTheme;
})();
