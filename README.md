# CV interactivo | SIS-214 · Examen Práctico 2

Portafolio profesional de **Joaquin Francisco Villalpando Apaza**, desarrollado para la asignatura Tecnologías Web I de la Universidad Católica Boliviana «San Pablo».

## Tecnologías

- HTML5 semántico y controles de accesibilidad WAI-ARIA.
- CSS3, custom properties, Flexbox, CSS Grid y maquetación Mobile-First.
- JavaScript ES6+, DOM, eventos, programación con arreglos y persistencia local.
- Fetch API para consumir la API REST pública de GitHub.
- EmailJS REST API para enviar mensajes desde el formulario.
- Git, GitHub y GitHub Pages para versionado y publicación.

El proyecto es frontend puro. No requiere backend, base de datos, empaquetador ni dependencias instaladas.

## Funcionalidades

1. **Tema claro y oscuro.** El botón modifica el atributo `data-theme` en `<html>` y recuerda la preferencia con `localStorage`, `JSON.stringify()` y `JSON.parse()`.
2. **Navegación adaptativa.** El menú móvil cambia de estado mediante eventos `click` y actualiza `aria-expanded`. Admite cierre con `Escape`.
3. **Buscador de proyectos.** Búsqueda en tiempo real y filtros por categoría con `.filter()` y `.map()`, sin modificar el arreglo original.
4. **Formulario.** Validación HTML5 con `checkValidity()`, mensajes por campo, eventos `input`, `preventDefault()` y petición asíncrona a EmailJS.
5. **GitHub en vivo.** Consultas REST con `fetch`, `async/await`, `try...catch`, verificación de `response.ok` y presentación de los estados cargando, éxito y error.

## Organización del proyecto

```text
SIS214_ExamenPractico2_VillalpandoJoaquin/
├── index.html
├── css/
│   ├── styles.css
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   ├── light-theme.css
│   └── dark-theme.css
├── js/
│   ├── config.js
│   ├── app.js
│   ├── theme.js
│   ├── navigation.js
│   ├── projects.js
│   ├── contact.js
│   └── github.js
├── assets/
│   ├── images/
│   ├── audio/
│   ├── video/
│   └── documents/
├── .gitignore
└── README.md
```

`assets/` conserva los archivos multimedia del proyecto anterior. `js/config.js` centraliza la configuración pública. Los módulos JavaScript se inicializan después de `DOMContentLoaded` a través de `js/app.js`.

## Ejecutar localmente

1. Coloca la carpeta original `assets/` junto a `index.html`. **La versión liviana del ZIP no incluye esos recursos.**
2. Abre el proyecto con Visual Studio Code.
3. Inicia **Live Server** y abre `index.html`.
4. Verifica que se carguen la fotografía, el video y el audio.

## Verificación funcional

- Cambia el tema y recarga: se debe conservar la preferencia.
- A 390, 768 y 1024 píxeles, prueba el menú, los botones y la ausencia de desplazamiento horizontal.
- Filtra proyectos por categoría y escribe una tecnología en el buscador.
- Envía el formulario vacío, corrige los campos y comprueba los mensajes de validación.
- Envía un correo de prueba real y verifica tanto **Email History** de EmailJS como la bandeja de recepción. La plantilla debe contemplar `from_name`, `reply_to`, `phone`, `subject` y `message`. El destinatario debe configurarse en EmailJS.
- En DevTools > Network verifica las respuestas de la API de GitHub. Prueba la opción **Reintentar** cuando no exista conexión.
- En DevTools > Console confirma que no existan errores de JavaScript no controlados.

## Publicación

**Repositorio:** https://github.com/joaquinvillalpando-dotcom/SIS214_ExamenPractico2_VillalpandoJoaquin

**Sitio en GitHub Pages:** https://joaquinvillalpando-dotcom.github.io/SIS214_ExamenPractico2_VillalpandoJoaquin/

Para publicar, sube también `assets/` y habilita GitHub Pages en **Settings > Pages > Deploy from a branch > main / (root)**. La URL de Pages estará disponible únicamente después de activar la publicación y completar el despliegue.
