(() => {
    const initNavigation = () => {
        const boton = document.getElementById('boton_menu');
        const menu = document.getElementById('menu_principal');
        const navegacion = document.querySelector('.navegacion');

        if (!boton || !menu || !navegacion) return;

        const escritorio = window.matchMedia('(min-width: 1025px)');

        const cerrarMenu = () => {
            menu.classList.remove('menu_abierto');
            boton.setAttribute('aria-expanded', 'false');
            boton.setAttribute('aria-label', 'Abrir menú de navegación');
        };

        boton.addEventListener('click', (event) => {
            event.stopPropagation();

            const abierto = !menu.classList.contains('menu_abierto');
            menu.classList.toggle('menu_abierto', abierto);
            boton.setAttribute('aria-expanded', String(abierto));
            boton.setAttribute(
                'aria-label',
                abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
            );
        });

        menu.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                cerrarMenu();
            }
        });

        document.querySelectorAll('a[href="#inicio"]').forEach((enlace) => {
            enlace.addEventListener('click', (event) => {
                event.preventDefault();
                cerrarMenu();
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
                const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({ top: 0, behavior: movimientoReducido ? 'instant' : 'smooth' });
            });
        });

        document.addEventListener('click', (event) => {
            if (!navegacion.contains(event.target)) {
                cerrarMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('menu_abierto')) {
                cerrarMenu();
                boton.focus();
            }
        });

        const sincronizarPantalla = () => {
            if (escritorio.matches) cerrarMenu();
        };

        if (typeof escritorio.addEventListener === 'function') {
            escritorio.addEventListener('change', sincronizarPantalla);
        } else {
            window.addEventListener('resize', sincronizarPantalla);
        }

        sincronizarPantalla();
    };

    window.PortfolioModules = window.PortfolioModules || {};
    window.PortfolioModules.initNavigation = initNavigation;
})();
