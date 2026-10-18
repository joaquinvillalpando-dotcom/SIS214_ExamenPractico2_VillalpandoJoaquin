# Portafolio profesional interactivo

**Tecnologías Web I (SIS-214) | Examen Práctico 2**  
**Autor:** Joaquin Francisco Villalpando Apaza  
**Universidad:** Universidad Católica Boliviana «San Pablo»

## Descripción

Aplicación web de tipo *landing page* que presenta información académica y profesional mediante una interfaz adaptable e interactiva. Integra HTML5 semántico, estilos CSS3 y JavaScript ES6+ para gestionar la navegación, las preferencias visuales, la búsqueda de proyectos, la validación de formularios y la consulta de información externa.

El proyecto se ejecuta en el navegador. No utiliza backend propio ni base de datos.

## Tecnologías utilizadas

- **HTML5:** estructura semántica, formularios y atributos de accesibilidad WAI-ARIA.
- **CSS3:** diseño Mobile-First, Flexbox, CSS Grid, variables personalizadas y media queries.
- **JavaScript ES6+:** manipulación del DOM, eventos, módulos organizados por funcionalidad, métodos de arreglos y asincronía.
- **Web Storage API:** persistencia de preferencias con `localStorage` y serialización JSON.
- **Fetch API:** consumo de la API REST pública de GitHub.
- **EmailJS REST API:** integración del formulario de contacto con un servicio de correo.
- **Git y GitHub:** control de versiones y alojamiento del código fuente.
- **GitHub Pages:** despliegue público del sitio estático.

## Funcionalidades

### Tema claro y oscuro
El conmutador modifica el atributo `data-theme` del documento. La preferencia se guarda con `localStorage`, `JSON.stringify()` y `JSON.parse()`, y se restaura cuando se vuelve a cargar la página.

### Navegación responsiva
El menú se adapta a diferentes anchuras de pantalla. En dispositivos pequeños utiliza un botón hamburguesa con eventos `click` y actualización dinámica del atributo `aria-expanded`. También permite cerrarse mediante la tecla Escape.

### Búsqueda y filtrado de proyectos
La sección de proyectos permite buscar mientras se escribe y filtrar por categoría. Las operaciones utilizan `.filter()` y `.map()` sobre una colección de datos que se conserva sin modificaciones.

### Formulario de contacto
Los campos combinan la validación nativa de HTML5 con eventos `input`, mensajes asociados a cada entrada y control del envío mediante `event.preventDefault()`. La petición a EmailJS es asíncrona e informa el resultado al usuario. El servicio requiere una plantilla configurada con los campos correspondientes.

### Integración con GitHub
Una sección consulta datos públicos mediante `fetch()` y `async/await`. Se verifica `response.ok`, se tratan los errores HTTP mediante `try...catch` y se muestran los estados de carga, éxito y error, con opción de reintentar.

## Estructura del proyecto

```text
SIS214_ExamenPractico2_VillalpandoJoaquin/
├── index.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   ├── light-theme.css
│   ├── dark-theme.css
│   └── styles.css
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
│   └── video/
├── .gitignore
└── README.md
```

`index.html` contiene la estructura principal. Las hojas CSS separan las reglas generales, la maquetación, los componentes, los temas y la adaptación a distintos dispositivos. En `js/`, cada archivo gestiona una responsabilidad específica y `app.js` inicializa las funcionalidades de la página. `config.js` reúne parámetros públicos de integración.

La carpeta `assets/` conserva las imágenes y los recursos de audio y video utilizados en la presentación.

## Ejecución local

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Ejecutar `index.html` mediante la extensión **Live Server** u otro servidor HTTP local.
4. Comprobar las interacciones en el navegador y consultar la consola de desarrollo cuando sea necesario.

No se necesitan paquetes de Node.js, compilación ni instalación de dependencias del proyecto.

## Comprobación de funcionamiento

- Alternar el tema y recargar la página para comprobar la persistencia.
- Probar el menú en pantallas móviles y verificar el cambio de `aria-expanded`.
- Escribir en el buscador de proyectos y seleccionar sus filtros.
- Comprobar mensajes de error en los campos del formulario y realizar un envío de prueba con EmailJS.
- Revisar la carga de los datos de GitHub y el tratamiento de errores de conexión.
- Verificar el diseño en móvil, tablet y escritorio, además de la ausencia de errores no controlados en la consola.

## Enlaces del proyecto

- **Repositorio:** https://github.com/joaquinvillalpando-dotcom/SIS214_ExamenPractico2_VillalpandoJoaquin
- **Sitio web (GitHub Pages):** https://joaquinvillalpando-dotcom.github.io/SIS214_ExamenPractico2_VillalpandoJoaquin/

La publicación utiliza la rama `main` y la carpeta raíz del repositorio como origen de GitHub Pages.
