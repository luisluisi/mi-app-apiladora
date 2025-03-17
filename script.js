const ITEMS_POR_PAGINA = 12;
let paginaActual = 0;
let totalPaginas = 0;
let archivosOPL = [];
let previousScreen = 'menu-principal';

// Variables para Quick Kaizens
const ITEMS_POR_PAGINA_KAIZENS = 12;
let kaizensPaginaActual = 0;
let kaizensArchivos = [];
let kaizensTotalPaginas = 0;

// Función para generar botones de OPL usando filelist.json
function generarOPLButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      // Filtrar archivos que comienzan con "OPL " y terminan en ".pdf"
      archivosOPL = data.filter(file => file.startsWith("OPL ") && file.endsWith(".pdf"));
      totalPaginas = Math.ceil(archivosOPL.length / ITEMS_POR_PAGINA);
      mostrarPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

// Función para mostrar una página de botones OPL
function mostrarPagina(indicePagina) {
  paginaActual = indicePagina;
  const contenedor = document.getElementById("opl-buttons");
  contenedor.innerHTML = "";
  
  const inicio = paginaActual * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const archivosPagina = archivosOPL.slice(inicio, fin);
  
  archivosPagina.forEach(file => {
    const label = file.replace("OPL ", "").replace(".pdf", "").trim();
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => cargarPDF(file, "opl-container");
    contenedor.appendChild(btn);
  });
  
  actualizarPaginacion();
}

// Función para actualizar la paginación para OPLs
function actualizarPaginacion() {
  const paginationContainer = document.getElementById("pagination-buttons");
  paginationContainer.innerHTML = "";
  
  if (totalPaginas > 1) {
    if (paginaActual > 0) {
      const btnPrev = document.createElement("button");
      btnPrev.textContent = "◀";
      btnPrev.onclick = () => mostrarPagina(paginaActual - 1);
      paginationContainer.appendChild(btnPrev);
    }
    
    if (paginaActual < totalPaginas - 1) {
      const btnNext = document.createElement("button");
      btnNext.textContent = "▶";
      btnNext.onclick = () => mostrarPagina(paginaActual + 1);
      paginationContainer.appendChild(btnNext);
    }
  }
}

// Función para generar botones de Quick Kaizens usando filelist.json
function generarKaizensButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      // Filtrar archivos que comienzan con "1" y terminan en ".pdf"
      kaizensArchivos = data.filter(file => file.startsWith("1") && file.endsWith(".pdf"));
      kaizensTotalPaginas = Math.ceil(kaizensArchivos.length / ITEMS_POR_PAGINA_KAIZENS);
      mostrarKaizensPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

// Función para mostrar una página de botones Quick Kaizens
function mostrarKaizensPagina(indicePagina) {
  kaizensPaginaActual = indicePagina;
  const contenedor = document.getElementById("kaizens-buttons");
  contenedor.innerHTML = "";
  
  const inicio = kaizensPaginaActual * ITEMS_POR_PAGINA_KAIZENS;
  const fin = inicio + ITEMS_POR_PAGINA_KAIZENS;
  const archivosPagina = kaizensArchivos.slice(inicio, fin);
  
  archivosPagina.forEach(file => {
    // Quitamos el primer carácter (el "1") y la extensión ".pdf"
    const label = file.substring(1).replace(".pdf", "").trim();
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => cargarPDF(file, "kaizens-container");
    contenedor.appendChild(btn);
  });
  
  actualizarKaizensPaginacion();
}

// Función para actualizar la paginación para Quick Kaizens
function actualizarKaizensPaginacion() {
  const paginationContainer = document.getElementById("kaizens-pagination");
  paginationContainer.innerHTML = "";
  
  if (kaizensTotalPaginas > 1) {
    if (kaizensPaginaActual > 0) {
      const btnPrev = document.createElement("button");
      btnPrev.textContent = "◀";
      btnPrev.onclick = () => mostrarKaizensPagina(kaizensPaginaActual - 1);
      paginationContainer.appendChild(btnPrev);
    }
    
    if (kaizensPaginaActual < kaizensTotalPaginas - 1) {
      const btnNext = document.createElement("button");
      btnNext.textContent = "▶";
      btnNext.onclick = () => mostrarKaizensPagina(kaizensPaginaActual + 1);
      paginationContainer.appendChild(btnNext);
    }
  }
}

// Función para cargar un PDF a pantalla completa
function cargarPDF(ruta, origen) {
  previousScreen = origen || 'menu-principal';
  ocultarTodosLosContenedores();
  document.getElementById('pdf-frame').src = ruta;
  // Actualiza el enlace de descarga
  document.getElementById('download-link').href = ruta;
  document.getElementById('pdf-container').style.display = 'flex';
}

// Función para volver al menú anterior
function goBack() {
  document.getElementById('pdf-container').style.display = 'none';
  document.getElementById('pdf-frame').src = '';
  document.getElementById(previousScreen).style.display = 'block';
}

// Función para mostrar la pantalla de OPLs y cargar botones
function mostrarOPLs() {
  ocultarTodosLosContenedores();
  document.getElementById('opl-container').style.display = 'flex';
  generarOPLButtonsDinamicos();
}

// Función para mostrar la pantalla de Quick Kaizens y cargar botones
function mostrarKaizens() {
  ocultarTodosLosContenedores();
  document.getElementById('kaizens-container').style.display = 'flex';
  generarKaizensButtonsDinamicos();
}

// Función para volver al menú principal
function volverMenu() {
  ocultarTodosLosContenedores();
  document.getElementById('menu-principal').style.display = 'block';
}

// Función para ocultar todos los contenedores
function ocultarTodosLosContenedores() {
  document.getElementById('menu-principal').style.display = 'none';
  document.getElementById('opl-container').style.display = 'none';
  document.getElementById('kaizens-container').style.display = 'none';
  document.getElementById('pdf-container').style.display = 'none';
}

// Funciones dummy para otros botones del menú principal
function mostrarMetodoEstandar() {
  alert("Método Estándar: contenido no implementado.");
}

function mostrarExitos() {
  alert("Hoja de Éxitos: contenido no implementado.");
}