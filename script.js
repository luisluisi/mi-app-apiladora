const ITEMS_POR_PAGINA = 16;  // Ahora se mostrarán 16 botones por página
let paginaActual = 0;
let totalPaginas = 0;
let archivosOPL = [];
let previousScreen = 'menu-principal';

// Función para generar botones de OPL usando filelist.json
function generarOPLButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      // Filtrar archivos que empiecen con "OPL " y terminen en ".pdf"
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
    const label = file.replace("OPL ", "").replace(".pdf", "");
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => cargarPDF(file, "opl-container");
    contenedor.appendChild(btn);
  });
  
  actualizarPaginacion();
}

// Función para actualizar la paginación (flechas)
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

// Función para cargar un PDF a pantalla completa
function cargarPDF(ruta, origen) {
  previousScreen = origen || 'menu-principal';
  ocultarTodosLosContenedores();
  document.getElementById('pdf-frame').src = ruta;
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

// Función para volver al menú principal
function volverMenu() {
  ocultarTodosLosContenedores();
  document.getElementById('menu-principal').style.display = 'block';
}

// Función para ocultar todos los contenedores
function ocultarTodosLosContenedores() {
  document.getElementById('menu-principal').style.display = 'none';
  document.getElementById('opl-container').style.display = 'none';
  document.getElementById('pdf-container').style.display = 'none';
}

// Funciones dummy para otros botones del menú principal
function mostrarLecciones() {
  alert("Lecciones Puntuales: contenido no implementado.");
}

function mostrarKaizens() {
  alert("Quick Kaizens: contenido no implementado.");
}

function mostrarExitos() {
  alert("Hoja de Éxitos: contenido no implementado.");
}
