(() => {
    const mensajePorEstado = (status) => {
        if (status === 400) return 'La API rechazó la solicitud (400 Bad Request).';
        if (status === 403) {
            return 'GitHub limitó temporalmente las solicitudes (403 Forbidden). ' +
                'Intenta de nuevo más tarde.';
        }
        if (status === 404) return 'El usuario configurado no fue encontrado (404 Not Found).';
        if (status >= 500) return `GitHub presentó un error del servidor (${status}).`;
        return `La solicitud falló con el código HTTP ${status}.`;
    };

    const pedirJSON = async (url) => {
        const controlador = new AbortController();
        const temporizador = setTimeout(() => controlador.abort(), 8000);

        try {
            const response = await fetch(url, {
                headers: { Accept: 'application/vnd.github+json' },
                signal: controlador.signal
            });

            if (!response.ok) {
                const error = new Error(mensajePorEstado(response.status));
                error.status = response.status;
                throw error;
            }

            return response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('La solicitud a GitHub superó el tiempo de espera.');
            }
            throw error;
        } finally {
            clearTimeout(temporizador);
        }
    };

    const escaparHTML = (valor) => String(valor)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('\"', '&quot;')
        .replaceAll("'", '&#039;');

    const enlaceSeguro = (url) => {
        try {
            const enlace = new URL(url);
            return enlace.protocol === 'https:' && enlace.hostname === 'github.com'
                ? enlace.href
                : 'https://github.com';
        } catch {
            return 'https://github.com';
        }
    };

    const renderRepos = (repos) => [...repos]
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, window.PortfolioConfig.maxRepos)
        .map((repo) => {
            const url = escaparHTML(enlaceSeguro(repo.html_url));
            const titulo = escaparHTML(repo.name);
            const descripcion = escaparHTML(
                repo.description || 'Repositorio público sin descripción.'
            );
            const lenguaje = escaparHTML(repo.language || 'Tecnología no indicada');

            return `
                <article class="repo_api">
                    <h4>
                        <a href="${url}" target="_blank" rel="noopener noreferrer">
                            ${titulo}
                        </a>
                    </h4>
                    <p>${descripcion}</p>
                    <p>${lenguaje} · ★ ${repo.stargazers_count}</p>
                </article>`;
        })
        .join('');

    const initGitHub = () => {
        const panel = document.getElementById('github_panel');
        const loading = document.getElementById('github_loading');
        const success = document.getElementById('github_success');
        const errorPanel = document.getElementById('github_error');
        const errorMensaje = document.getElementById('github_error_mensaje');
        const reintentar = document.getElementById('reintentar_github');

        if (!panel || !loading || !success || !errorPanel || !errorMensaje || !reintentar) return;

        const cargar = async () => {
            panel.setAttribute('aria-busy', 'true');
            loading.hidden = false;
            success.hidden = true;
            errorPanel.hidden = true;

            try {
                const { githubApiBase, githubUsername } = window.PortfolioConfig;
                const ruta = `${githubApiBase}/users/${encodeURIComponent(githubUsername)}`;
                const usuarioUrl = ruta;
                const reposUrl = `${ruta}/repos?per_page=30&sort=updated`;

                const [usuario, repos] = await Promise.all([
                    pedirJSON(usuarioUrl),
                    pedirJSON(reposUrl)
                ]);

                document.getElementById('github_avatar').src = usuario.avatar_url;
                document.getElementById('github_avatar').alt =
                    `Avatar de ${usuario.name || usuario.login} en GitHub`;
                document.getElementById('github_nombre').textContent = usuario.name || usuario.login;
                document.getElementById('github_usuario').textContent = `@${usuario.login}`;
                document.getElementById('github_repos').textContent = usuario.public_repos;
                document.getElementById('github_seguidores').textContent = usuario.followers;
                document.getElementById('github_siguiendo').textContent = usuario.following;
                document.getElementById('github_enlace').href = usuario.html_url;
                document.getElementById('github_repos_lista').innerHTML =
                    renderRepos(repos) || '<p>No hay repositorios públicos para mostrar.</p>';

                loading.hidden = true;
                success.hidden = false;
            } catch (error) {
                console.warn('La API REST de GitHub devolvió un estado controlado:', error);
                loading.hidden = true;
                errorPanel.hidden = false;
                errorMensaje.textContent = error.message || 'No fue posible completar la solicitud.';
            } finally {
                panel.setAttribute('aria-busy', 'false');
            }
        };

        reintentar.addEventListener('click', cargar);
        cargar();
    };

    window.PortfolioModules = window.PortfolioModules || {};
    window.PortfolioModules.initGitHub = initGitHub;
})();
