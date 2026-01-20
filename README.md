# Directorio de Personal - Reto Técnico NTT DATA

Este proyecto es una aplicación web tipo **SPA (Single Page Application)** desarrollada como solución al desafío técnico de Front-end. La aplicación consume la API pública de [RandomUser](https://randomuser.me/) para generar, visualizar y gestionar un directorio de personas con funcionalidades de filtrado.

## Descripción del Proyecto

El objetivo principal es listar usuarios con datos específicos (Nombre, Género, Ubicación, Email, Fecha de Nacimiento y Foto). Sin embargo, para aportar valor agregado y mejorar la Experiencia de Usuario (UX), se implementaron características adicionales de búsqueda y persistencia de filtros.

### Funcionalidades Implementadas

1.  **Listado Inicial:** Carga automática de 10 usuarios al iniciar.
2.  **Datos Requeridos:** Visualización clara de todos los campos solicitados con formato local (fechas en formato `dd/mm/aaaa` y traducción de géneros).
3.  **Lógica Híbrida de Filtrado (Feature Destacada):**
    * **Filtrado Local:** Al seleccionar un filtro (Género o País), la aplicación oculta instantáneamente las tarjetas ya cargadas que no coinciden, sin re-consumir la API innecesariamente.
    * **Paginación Inteligente (Server-Side):** Al hacer clic en *"Cargar más"*, la aplicación consulta a la API aplicando los filtros activos, garantizando que siempre se carguen 10 nuevos usuarios válidos.
4.  **Buscador en Tiempo Real:** Filtrado por nombre sobre los usuarios visibles en memoria.
5.  **Listado Dinámico de Países:** Generación automática del selector de países basado únicamente en las nacionalidades soportadas por la API, evitando búsquedas vacías.

---

## Tecnologías y Decisiones Técnicas

Siguiendo el **Enfoque Front-end** solicitado en la especificación técnica, se decidió no utilizar frameworks pesados (como React o Angular) ni dependencias de compilación, para demostrar un dominio sólido de los fundamentos de la web.

### 1. HTML5 (Semántico)
* Uso de etiquetas semánticas (`<header>`, `<main>`, `<article>`, `<section>`) para asegurar la accesibilidad y un código estructurado.

### 2. CSS3 (Moderno y Responsivo)
* **CSS Grid:** Utilizado para el layout principal de tarjetas, permitiendo un diseño fluido que se adapta a cualquier ancho de pantalla.
* **Flexbox:** Utilizado para la barra de controles y alineación interna de componentes.
* **Diseño:** Se implementó una interfaz limpia ("Clean UI") con sombras suaves y efectos *hover* para interactividad.
* **Variables:** No se usaron preprocesadores, aprovechando las variables nativas de CSS para la paleta de colores.

### 3. JavaScript (ES6+ Vanilla)
* **Async/Await:** Para el manejo limpio y legible de las promesas al consumir la API.
* **Manipulación del DOM:** Inserción dinámica de elementos sin librerías externas.
* **Gestión de Estado:** Se implementó un arreglo global (`usuariosGlobales`) que actúa como "Single Source of Truth", permitiendo filtrar y buscar sin perder los datos descargados previamente.

---

## Experiencia con las Tecnologías

**Desarrollo Front-end:**
Cuento con experiencia creando interfaces responsivas y funcionales. Mi enfoque prioriza la usabilidad y el rendimiento. En este reto, decidí separar la lógica de negocio (llamadas a la API y filtrado) de la lógica de presentación (renderizado del DOM), siguiendo principios de **Separación de Intereses (SoC)**.

**Consumo de APIs:**
Tengo experiencia integrando servicios RESTful. Entiendo la importancia de manejar los errores de red (implementando bloques `try/catch`) y de optimizar las peticiones. Para este proyecto, estudié la documentación de `randomuser.me` para utilizar correctamente los parámetros `?inc=` (para traer solo lo necesario), `?nat=` y `?gender=`, optimizando así la transferencia de datos.

---

## Instalación y Ejecución

Al ser una solución nativa ("Vanilla"), no requiere instalación de `node_modules` ni procesos de compilación (build).

1.  **Descargar:** Clona el repositorio o descarga la carpeta del proyecto.
2.  **Archivos:** Asegúrate de tener la siguiente estructura:
    * `index.html`
    * `styles.css`
    * `scripts.js`
3.  **Ejecutar:**
    * Opción A: Haz doble clic en el archivo `index.html` para abrirlo en tu navegador.
    * Opción B (Recomendada): Utiliza una extensión como "Live Server" en VS Code para simular un entorno de servidor local.

---

## Estructura del Proyecto

```text
/
├── index.html      # Estructura y maquetación
├── styles.css      # Estilos visuales y responsividad
├── script.js      # Lógica de negocio, consumo de API y filtrado híbrido
└── README.md       # Documentación técnica