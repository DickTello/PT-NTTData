// Configuración
const API_BASE = 'https://randomuser.me/api/';
const RESULTADOS = 10;

// Países válidos para la API
const PAISES_SOPORTADOS = {
    'AU': 'Australia', 'BR': 'Brasil', 'CA': 'Canadá', 'CH': 'Suiza',
    'DE': 'Alemania', 'DK': 'Dinamarca', 'ES': 'España', 'FI': 'Finlandia',
    'FR': 'Francia', 'GB': 'Reino Unido', 'IE': 'Irlanda', 'IN': 'India',
    'IR': 'Irán', 'MX': 'México', 'NL': 'Países Bajos', 'NO': 'Noruega',
    'NZ': 'Nueva Zelanda', 'RS': 'Serbia', 'TR': 'Turquía', 'UA': 'Ucrania',
    'US': 'Estados Unidos'
};

// Aqui se acumulan TODOS los usuarios descargados
let usuariosGlobales = []; 

// Elementos DOM
const grid = document.getElementById('grid-usuarios');
const btnCargar = document.getElementById('btn-cargar');
const buscador = document.getElementById('buscador');
const filtroGenero = document.getElementById('filtro-genero');
const filtroPais = document.getElementById('filtro-pais');
const contador = document.getElementById('contador');

// 1. INICIALIZACIÓN
function iniciarApp() {
    llenarSelectPaises();
    cargarNuevosUsuarios(); // Carga los primeros 10 aleatorios
}

function llenarSelectPaises() {
    for (const [codigo, nombre] of Object.entries(PAISES_SOPORTADOS)) {
        const opcion = document.createElement('option');
        opcion.value = codigo;
        opcion.textContent = nombre;
        filtroPais.appendChild(opcion);
    }
}

// 2. FUNCIÓN DE CARGA (Conecta a la API)
async function cargarNuevosUsuarios() {
    try {
        btnCargar.textContent = "Cargando...";
        btnCargar.disabled = true;

        // Construimos la URL basada en los filtros actuales.
        // Si hay filtros, la API traerá 10 nuevos que CUMPLAN el filtro.
        const url = construirURL();

        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // Agregamos los nuevos a la lista global acumulada
        usuariosGlobales = [...usuariosGlobales, ...datos.results];

        // Actualizamos la vista
        renderizar();

        btnCargar.textContent = "Cargar más";
        btnCargar.disabled = false;

    } catch (error) {
        console.error(error);
        alert("Error de conexión");
        btnCargar.disabled = false;
    }
}

// Construye la URL para pedirle a la API exactamente lo que necesitamos
function construirURL() {
    const genero = filtroGenero.value;
    const pais = filtroPais.value;
    
    let url = `${API_BASE}?results=${RESULTADOS}`;

    // Si el usuario tiene seleccionado "Mujeres", pedimos 10 mujeres a la API
    if (genero !== 'all') url += `&gender=${genero}`;
    
    // Si el usuario tiene seleccionado "Brasil", pedimos 10 brasileños a la API
    if (pais !== 'all') url += `&nat=${pais}`;

    return url;
}

// 3. FUNCIÓN DE RENDERIZADO (Filtra lo que ya tenemos en memoria)
function renderizar() {
    grid.innerHTML = '';

    // Obtenemos los valores actuales de los filtros
    const texto = buscador.value.toLowerCase();
    const genero = filtroGenero.value;
    const pais = filtroPais.value;

    // AQUI CUMPLIMOS TU REQUISITO:
    // Filtramos la lista `usuariosGlobales` (los que ya bajamos).
    // Si acabas de cargar 10 randoms y filtras "Mujer", aquí solo pasarán las mujeres de esos 10.
    const listaVisible = usuariosGlobales.filter(usuario => {
        const nombre = `${usuario.name.first} ${usuario.name.last}`.toLowerCase();
        
        const cumpleNombre = nombre.includes(texto);
        // Validamos si cumple el género seleccionado (o si es 'all')
        const cumpleGenero = genero === 'all' || usuario.gender === genero;
        // Validamos si cumple el país seleccionado (o si es 'all')
        const cumplePais = pais === 'all' || usuario.nat === pais;

        return cumpleNombre && cumpleGenero && cumplePais;  
    });

    // Actualizamos contador
    contador.textContent = `Viendo ${listaVisible.length} tarjetas (de ${usuariosGlobales.length} cargadas)`;

    // Mensaje si no hay nadie (ej: cargaste 10 randoms y ninguno era de Alemania)
    if (listaVisible.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 20px;">
                <p>No hay usuarios con estos filtros en la lista actual.</p>
                <p><strong>Dale a "Cargar más" para traer personas que coincidan.</strong></p>
            </div>
        `;
        return;
    }

    // Pintamos las tarjetas
    listaVisible.forEach(usuario => {
        const tarjeta = crearTarjetaHTML(usuario);
        grid.appendChild(tarjeta);
    });
}

function crearTarjetaHTML(usuario) {
    const articulo = document.createElement('article');
    articulo.className = 'card';

    const fecha = new Date(usuario.dob.date).toLocaleDateString('es-ES');
    const generoEs = usuario.gender === 'male' ? 'Masculino' : 'Femenino';
    const nombrePais = PAISES_SOPORTADOS[usuario.nat] || usuario.location.country;

    articulo.innerHTML = `
        <div class="card-header">
            <img src="${usuario.picture.large}" alt="Foto" class="foto-usuario">
        </div>
        <div class="card-body">
            <h2>${usuario.name.first} ${usuario.name.last}</h2>
            <ul class="datos-lista">
                <li><strong>Género:</strong> ${generoEs}</li>
                <li><strong>Ubicación:</strong> ${usuario.location.city}, ${nombrePais}</li>
                <li><strong>Correo:</strong> ${usuario.email}</li>
                <li><strong>Fecha de Nacimiento:</strong> ${fecha}</li>
            </ul>
        </div>
    `;
    return articulo;
}

// 4. EVENTOS (La configuración exacta que pediste)

// A. Botón "Cargar más": Llama a la API (trayendo 10 nuevos del tipo seleccionado)
btnCargar.addEventListener('click', cargarNuevosUsuarios);

// B. Filtros (Dropdowns): SOLO llaman a renderizar (filtran lo que ya hay en pantalla)
// NO llaman a la API.
filtroGenero.addEventListener('change', renderizar);
filtroPais.addEventListener('change', renderizar);
buscador.addEventListener('input', renderizar);

// Inicio
iniciarApp();