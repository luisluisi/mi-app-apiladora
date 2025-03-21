const ITEMS_POR_PAGINA = 12;
let paginaActual = 0;
let totalPaginas = 0;
let archivosOPL = [];
let previousScreen = 'menu-principal';
let archivosOPLFiltrados = []; // Array para los archivos OPL filtrados

const ITEMS_POR_PAGINA_KAIZENS = 12;
let kaizensPaginaActual = 0;
let kaizensArchivos = [];
let kaizensTotalPaginas = 0;
let kaizensArchivosFiltrados = []; // Array para los archivos Kaizen filtrados

const ITEMS_POR_PAGINA_METODO = 12;
let metodoPaginaActual = 0;
let metodoArchivos = [];
let metodoTotalPaginas = 0;
let metodoArchivosFiltrados = []; // Array para los archivos Método Estándar filtrados

const ITEMS_POR_PAGINA_EXITOS = 12;
let exitosPaginaActual = 0;
let exitosArchivos = [];
let exitosTotalPaginas = 0;
let exitosArchivosFiltrados = []; // Array para los archivos Hoja de Éxitos filtrados


function generarOPLButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      archivosOPL = data.filter(file => file.startsWith("OPL ") && file.endsWith(".pdf"));
      archivosOPLFiltrados = [...archivosOPL]; // Inicialmente, los filtrados son todos
      totalPaginas = Math.ceil(archivosOPLFiltrados.length / ITEMS_POR_PAGINA);
      mostrarPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

function mostrarPagina(indicePagina) {
  paginaActual = indicePagina;
  const contenedor = document.getElementById("opl-buttons");
  const noResultsMessage = document.getElementById("opl-no-results");
  contenedor.innerHTML = "";

  const inicio = paginaActual * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const archivosPagina = archivosOPLFiltrados.slice(inicio, fin); // Usar archivos filtrados

  if (archivosPagina.length === 0) {
    noResultsMessage.style.display = 'block'; // Mostrar mensaje de no resultados
    document.getElementById("opl-pagination").style.display = 'none'; // Ocultar paginación si no hay resultados
  } else {
    noResultsMessage.style.display = 'none'; // Ocultar mensaje si hay resultados
    document.getElementById("opl-pagination").style.display = 'flex'; // Mostrar paginación
    archivosPagina.forEach(file => {
      const label = file.replace("OPL ", "").replace(".pdf", "").trim();
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.onclick = () => cargarPDF(file, "opl-container");
      contenedor.appendChild(btn);
    });
  }

  actualizarPaginacion();
}

function actualizarPaginacion() {
  const paginationContainer = document.getElementById("opl-pagination");
  paginationContainer.innerHTML = "";
  totalPaginas = Math.ceil(archivosOPLFiltrados.length / ITEMS_POR_PAGINA); // Recalcular totalPaginas basado en filtrados

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
  } else {
    paginationContainer.style.display = 'none'; // Ocultar paginación si solo hay una página o menos
  }
}

function filtrarOPLs() {
  const searchTerm = document.getElementById("opl-search").value.toLowerCase();
  const clearButton = document.querySelector('#opl-container .clear-search-button');

  if (searchTerm) {
    archivosOPLFiltrados = archivosOPL.filter(file => file.toLowerCase().includes(searchTerm));
    clearButton.style.display = 'block'; // Show clear button
  } else {
    archivosOPLFiltrados = [...archivosOPL]; // Reset to all files if search is empty
    clearButton.style.display = 'none'; // Hide clear button
  }

  paginaActual = 0; // Reset page to 1 after filtering
  mostrarPagina(0);
}


function generarKaizensButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      kaizensArchivos = data.filter(file => file.startsWith("1") && file.endsWith(".pdf"));
      kaizensArchivosFiltrados = [...kaizensArchivos]; // Inicialmente, los filtrados son todos
      kaizensTotalPaginas = Math.ceil(kaizensArchivosFiltrados.length / ITEMS_POR_PAGINA_KAIZENS);
      mostrarKaizensPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

function mostrarKaizensPagina(indicePagina) {
  kaizensPaginaActual = indicePagina;
  const contenedor = document.getElementById("kaizens-buttons");
  const noResultsMessage = document.getElementById("kaizens-no-results");
  contenedor.innerHTML = "";

  const inicio = kaizensPaginaActual * ITEMS_POR_PAGINA_KAIZENS;
  const fin = inicio + ITEMS_POR_PAGINA_KAIZENS;
  const archivosPagina = kaizensArchivosFiltrados.slice(inicio, fin); // Usar archivos filtrados

  if (archivosPagina.length === 0) {
    noResultsMessage.style.display = 'block'; // Mostrar mensaje de no resultados
    document.getElementById("kaizens-pagination").style.display = 'none'; // Ocultar paginación si no hay resultados
  } else {
    noResultsMessage.style.display = 'none'; // Ocultar mensaje si hay resultados
    document.getElementById("kaizens-pagination").style.display = 'flex'; // Mostrar paginación
    archivosPagina.forEach(file => {
      const label = file.substring(1).replace(".pdf", "").trim();
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.onclick = () => cargarPDF(file, "kaizens-container");
      contenedor.appendChild(btn);
    });
  }

  actualizarKaizensPaginacion();
}

function actualizarKaizensPaginacion() {
  const paginationContainer = document.getElementById("kaizens-pagination");
  paginationContainer.innerHTML = "";
  kaizensTotalPaginas = Math.ceil(kaizensArchivosFiltrados.length / ITEMS_POR_PAGINA_KAIZENS); // Recalcular totalPaginas

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
  } else {
    paginationContainer.style.display = 'none'; // Ocultar paginación si solo hay una página o menos
  }
}

function filtrarKaizens() {
  const searchTerm = document.getElementById("kaizens-search").value.toLowerCase();
  const clearButton = document.querySelector('#kaizens-container .clear-search-button');

  if (searchTerm) {
    kaizensArchivosFiltrados = kaizensArchivos.filter(file => file.toLowerCase().includes(searchTerm));
    clearButton.style.display = 'block'; // Show clear button
  } else {
    kaizensArchivosFiltrados = [...kaizensArchivos]; // Reset to all files if search is empty
    clearButton.style.display = 'none'; // Hide clear button
  }

  kaizensPaginaActual = 0; // Reset page to 1 after filtering
  mostrarKaizensPagina(0);
}


function generarMetodoEstandarButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      metodoArchivos = data.filter(file => file.startsWith("2") && file.endsWith(".pdf"));
      metodoArchivosFiltrados = [...metodoArchivos]; // Inicialmente, los filtrados son todos
      metodoTotalPaginas = Math.ceil(metodoArchivosFiltrados.length / ITEMS_POR_PAGINA_METODO);
      mostrarMetodoEstandarPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

function mostrarMetodoEstandarPagina(indicePagina) {
  metodoPaginaActual = indicePagina;
  const contenedor = document.getElementById("metodo-estandar-buttons");
  const noResultsMessage = document.getElementById("metodo-estandar-no-results");
  contenedor.innerHTML = "";

  const inicio = metodoPaginaActual * ITEMS_POR_PAGINA_METODO;
  const fin = inicio + ITEMS_POR_PAGINA_METODO;
  const archivosPagina = metodoArchivosFiltrados.slice(inicio, fin); // Usar archivos filtrados

  if (archivosPagina.length === 0) {
    noResultsMessage.style.display = 'block'; // Mostrar mensaje de no resultados
    document.getElementById("metodo-estandar-pagination").style.display = 'none'; // Ocultar paginación si no hay resultados
  } else {
    noResultsMessage.style.display = 'none'; // Ocultar mensaje si hay resultados
    document.getElementById("metodo-estandar-pagination").style.display = 'flex'; // Mostrar paginación
    archivosPagina.forEach(file => {
      const label = file.substring(1).replace(".pdf", "").trim();
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.onclick = () => cargarPDF(file, "metodo-estandar-container");
      contenedor.appendChild(btn);
    });
  }

  actualizarMetodoEstandarPaginacion();
}

function actualizarMetodoEstandarPaginacion() {
  const paginationContainer = document.getElementById("metodo-estandar-pagination");
  paginationContainer.innerHTML = "";
  metodoTotalPaginas = Math.ceil(metodoArchivosFiltrados.length / ITEMS_POR_PAGINA_METODO); // Recalcular totalPaginas

  if (metodoTotalPaginas > 1) {
    if (metodoPaginaActual > 0) {
      const btnPrev = document.createElement("button");
      btnPrev.textContent = "◀";
      btnPrev.onclick = () => mostrarMetodoEstandarPagina(metodoPaginaActual - 1);
      paginationContainer.appendChild(btnPrev);
    }

    if (metodoPaginaActual < metodoTotalPaginas - 1) {
      const btnNext = document.createElement("button");
      btnNext.textContent = "▶";
      btnNext.onclick = () => mostrarMetodoEstandarPagina(metodoPaginaActual + 1);
      paginationContainer.appendChild(btnNext);
    }
  } else {
    paginationContainer.style.display = 'none'; // Ocultar paginación si solo hay una página o menos
  }
}


function filtrarMetodoEstandar() {
  const searchTerm = document.getElementById("metodo-estandar-search").value.toLowerCase();
  const clearButton = document.querySelector('#metodo-estandar-container .clear-search-button');

  if (searchTerm) {
    metodoArchivosFiltrados = metodoArchivos.filter(file => file.toLowerCase().includes(searchTerm));
    clearButton.style.display = 'block'; // Show clear button
  } else {
    metodoArchivosFiltrados = [...metodoArchivos]; // Reset to all files if search is empty
    clearButton.style.display = 'none'; // Hide clear button
  }

  metodoPaginaActual = 0; // Reset page to 1 after filtering
  mostrarMetodoEstandarPagina(0);
}


function generarExitosButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      exitosArchivos = data.filter(file => file.startsWith("3") && file.endsWith(".pdf"));
      exitosArchivosFiltrados = [...exitosArchivos]; // Inicialmente, los filtrados son todos
      exitosTotalPaginas = Math.ceil(exitosArchivosFiltrados.length / ITEMS_POR_PAGINA_EXITOS);
      mostrarExitosPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

function mostrarExitosPagina(indicePagina) {
  exitosPaginaActual = indicePagina;
  const contenedor = document.getElementById("exitos-buttons");
  const noResultsMessage = document.getElementById("exitos-no-results");
  contenedor.innerHTML = "";

  const inicio = exitosPaginaActual * ITEMS_POR_PAGINA_EXITOS;
  const fin = inicio + ITEMS_POR_PAGINA_EXITOS;
  const archivosPagina = exitosArchivosFiltrados.slice(inicio, fin); // Usar archivos filtrados

  if (archivosPagina.length === 0) {
    noResultsMessage.style.display = 'block'; // Mostrar mensaje de no resultados
    document.getElementById("exitos-pagination").style.display = 'none'; // Ocultar paginación si no hay resultados
  } else {
    noResultsMessage.style.display = 'none'; // Ocultar mensaje si hay resultados
    document.getElementById("exitos-pagination").style.display = 'flex'; // Mostrar paginación
    archivosPagina.forEach(file => {
      const label = file.substring(1).replace(".pdf", "").trim();
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.onclick = () => cargarPDF(file, "exitos-container");
      contenedor.appendChild(btn);
    });
  }

  actualizarExitosPaginacion();
}

function actualizarExitosPaginacion() {
  const paginationContainer = document.getElementById("exitos-pagination");
  paginationContainer.innerHTML = "";
  exitosTotalPaginas = Math.ceil(exitosArchivosFiltrados.length / ITEMS_POR_PAGINA_EXITOS); // Recalcular totalPaginas

  if (exitosTotalPaginas > 1) {
    if (exitosPaginaActual > 0) {
      const btnPrev = document.createElement("button");
      btnPrev.textContent = "◀";
      btnPrev.onclick = () => mostrarExitosPagina(exitosPaginaActual - 1);
      paginationContainer.appendChild(btnPrev);
    }

    if (exitosPaginaActual < exitosTotalPaginas - 1) {
      const btnNext = document.createElement("button");
      btnNext.textContent = "▶";
      btnNext.onclick = () => mostrarExitosPagina(exitosPaginaActual + 1);
      paginationContainer.appendChild(btnNext);
    }
  } else {
    paginationContainer.style.display = 'none'; // Ocultar paginación si solo hay una página o menos
  }
}

function filtrarExitos() {
  const searchTerm = document.getElementById("exitos-search").value.toLowerCase();
  const clearButton = document.querySelector('#exitos-container .clear-search-button');

  if (searchTerm) {
    exitosArchivosFiltrados = exitosArchivos.filter(file => file.toLowerCase().includes(searchTerm));
    clearButton.style.display = 'block'; // Show clear button
  } else {
    exitosArchivosFiltrados = [...exitosArchivos]; // Reset to all files if search is empty
    clearButton.style.display = 'none'; // Hide clear button
  }

  exitosPaginaActual = 0; // Reset page to 1 after filtering
  mostrarExitosPagina(0);
}


function cargarPDF(ruta, origen) {
  previousScreen = origen || 'menu-principal';
  ocultarTodosLosContenedores();

  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
  const pdfUrl = baseUrl + ruta;

  if (isLocalhost) {
    document.getElementById('pdf-frame').src = ruta;
  } else {
    document.getElementById('pdf-frame').src = 'https://docs.google.com/viewer?url=' + encodeURIComponent(pdfUrl) + '&embedded=true';
  }

  // DESACTIVAR LA DESCARGA DEL PDF (Comentando la siguiente línea)
  // document.getElementById('download-link').href = ruta;

  document.getElementById('pdf-container').style.display = 'flex';
}

function goBack() {
  document.getElementById('pdf-container').style.display = 'none';
  document.getElementById('pdf-frame').src = '';
  document.getElementById(previousScreen).style.display = 'flex';
  window.dispatchEvent(new Event('resize'));
}

function mostrarOPLs() {
  ocultarTodosLosContenedores();
  document.getElementById('opl-container').style.display = 'flex';
  generarOPLButtonsDinamicos();
}

function mostrarKaizens() {
  ocultarTodosLosContenedores();
  document.getElementById('kaizens-container').style.display = 'flex';
  generarKaizensButtonsDinamicos();
}

function mostrarMetodoEstandar() {
  ocultarTodosLosContenedores();
  document.getElementById('metodo-estandar-container').style.display = 'flex';
  generarMetodoEstandarButtonsDinamicos();
}

function mostrarExitos() {
  ocultarTodosLosContenedores();
  document.getElementById('exitos-container').style.display = 'flex';
  generarExitosButtonsDinamicos();
}

function volverMenu() {
  ocultarTodosLosContenedores();
  document.getElementById('menu-principal').style.display = 'flex';
  window.dispatchEvent(new Event('resize'));
}

function ocultarTodosLosContenedores() {
  document.getElementById('menu-principal').style.display = 'none';
  document.getElementById('opl-container').style.display = 'none';
  document.getElementById('kaizens-container').style.display = 'none';
  document.getElementById('metodo-estandar-container').style.display = 'none';
  document.getElementById('exitos-container').style.display = 'none';
  document.getElementById('pdf-container').style.display = 'none';
}

function clearSearch(containerIdPrefix) {
  document.getElementById(`${containerIdPrefix}-search`).value = '';
  document.querySelector(`#${containerIdPrefix}-container .clear-search-button`).style.display = 'none';

  if (containerIdPrefix === 'opl') {
    archivosOPLFiltrados = [...archivosOPL];
    mostrarPagina(0);
  } else if (containerIdPrefix === 'kaizens') {
    kaizensArchivosFiltrados = [...kaizensArchivos];
    mostrarKaizensPagina(0);
  } else if (containerIdPrefix === 'metodo-estandar') {
    metodoArchivosFiltrados = [...metodoArchivos];
    mostrarMetodoEstandarPagina(0);
  } else if (containerIdPrefix === 'exitos') {
    exitosArchivosFiltrados = [...exitosArchivos];
    mostrarExitosPagina(0);
  }
}
