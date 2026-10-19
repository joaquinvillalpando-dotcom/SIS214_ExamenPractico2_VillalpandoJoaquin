(() => {
    const proyectosOriginales = Object.freeze([
        Object.freeze({
            id: 1,
            titulo: 'Juego del Ahorcado',
            categoria: 'programacion',
            categoriaTexto: 'Programación',
            descripcion: [
                'Juego de adivinanza de palabras para consola,',
                'con control de intentos y validación de letras repetidas.'
            ].join(' '),
            tecnologias: Object.freeze(['C++']),
            rol: 'Desarrollador único',
            resultado: 'Juego funcional, probado junto a compañeros de clase.',
            codigoVisual: 'C++'
        }),
        Object.freeze({
            id: 2,
            titulo: 'Tic-Tac-Toe (Tres en Línea)',
            categoria: 'programacion',
            categoriaTexto: 'Programación',
            descripcion: [
                'Implementación del clásico juego de tres en línea',
                'para dos jugadores, ejecutado por consola.'
            ].join(' '),
            tecnologias: Object.freeze(['Python']),
            rol: 'Desarrollador único',
            resultado: 'Programa completo con detección automática de ganador y de empate.',
            codigoVisual: 'PY'
        }),
        Object.freeze({
            id: 3,
            titulo: 'Sistema de Gestión de Cine',
            categoria: 'programacion',
            categoriaTexto: 'Aplicación de escritorio',
            descripcion: 'Sistema de escritorio para el registro de películas, productos y ventas de un cine.',
            tecnologias: Object.freeze(['Java', 'JavaFX', 'Archivos']),
            rol: 'Desarrollador del sistema',
            resultado: 'Sistema funcional para registrar películas, productos y ventas de un cine.',
            codigoVisual: 'JAVA'
        }),
        Object.freeze({
            id: 4,
            titulo: 'Base de Datos para “Librería El Estudiante”',
            categoria: 'datos',
            categoriaTexto: 'Bases de datos',
            descripcion: [
                'Diseño de esquema relacional para un negocio ficticio de venta',
                'de material escolar y de oficina, cubriendo inventario, proveedores y ventas.'
            ].join(' '),
            tecnologias: Object.freeze(['Modelo E-R', 'SQL']),
            rol: 'Diseñador del esquema relacional',
            resultado: 'Base de datos normalizada, con consultas SQL para reportes de ventas e inventario.',
            codigoVisual: 'SQL'
        }),
        Object.freeze({
            id: 5,
            titulo: 'Esta misma Hoja de Vida',
            categoria: 'web',
            categoriaTexto: 'Desarrollo web',
            descripcion: [
                'Hoja de vida interactiva tipo landing page desarrollada',
                'para la asignatura Tecnologías Web I.'
            ].join(' '),
            tecnologias: Object.freeze(['HTML5', 'CSS3', 'JavaScript']),
            rol: 'Desarrollador único',
            resultado: 'Sitio publicado en GitHub Pages y validado según estándares web.',
            codigoVisual: '</>'
        })
    ]);

    const normalizar = (texto) => texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const crearTarjeta = (proyecto) => `
        <article class="tarjeta_proyecto">
            <div class="proyecto_visual" aria-hidden="true"><code>${proyecto.codigoVisual}</code></div>
            <div class="proyecto_cuerpo">
                <p class="proyecto_categoria">${proyecto.categoriaTexto}</p>
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                <p class="proyecto_tecnologias">
                    ${proyecto.tecnologias.map((tecnologia) => `<span>${tecnologia}</span>`).join('')}
                </p>
                <p><strong>Rol:</strong> ${proyecto.rol}</p>
                <p class="proyecto_resultado"><strong>Resultado:</strong> ${proyecto.resultado}</p>
            </div>
        </article>`;

    const initProjects = () => {
        const contenedor = document.getElementById('lista_proyectos');
        const buscador = document.getElementById('buscador_proyectos');
        const filtros = document.getElementById('filtros_proyectos');
        const estado = document.getElementById('resultado_filtro');

        if (!contenedor || !buscador || !filtros || !estado) return;

        let filtroActivo = 'todos';

        const renderizar = () => {
            const consulta = normalizar(buscador.value.trim());

            const tarjetas = proyectosOriginales
                .filter((proyecto) => filtroActivo === 'todos' || proyecto.categoria === filtroActivo)
                .filter((proyecto) => {
                    const textoProyecto = normalizar([
                        proyecto.titulo,
                        proyecto.descripcion,
                        proyecto.rol,
                        proyecto.resultado,
                        ...proyecto.tecnologias
                    ].join(' '));
                    return textoProyecto.includes(consulta);
                })
                .map((proyecto) => crearTarjeta({ ...proyecto }));

            contenedor.innerHTML = tarjetas.length
                ? tarjetas.join('')
                : [
                    '<article class="tarjeta">',
                    '<h3>Sin coincidencias</h3>',
                    '<p>Prueba con otra palabra o categoría.</p>',
                    '</article>'
                ].join('');

            const plural = tarjetas.length === 1 ? '' : 's';
            estado.textContent = `${tarjetas.length} proyecto${plural} encontrado${plural}.`;
        };

        buscador.addEventListener('input', renderizar);

        filtros.addEventListener('click', (event) => {
            const boton = event.target.closest('button[data-filtro]');
            if (!boton) return;

            filtroActivo = boton.dataset.filtro;
            filtros.querySelectorAll('button[data-filtro]').forEach((item) => {
                const activo = item === boton;
                item.classList.toggle('filtro_activo', activo);
                item.setAttribute('aria-pressed', String(activo));
            });
            renderizar();
        });

        renderizar();
    };

    window.PortfolioModules = window.PortfolioModules || {};
    window.PortfolioModules.initProjects = initProjects;
})();
