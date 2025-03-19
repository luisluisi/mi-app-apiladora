const ITEMS_POR_PAGINA = 12;
let paginaActual = 0;
let totalPaginas = 0;
let archivosOPL = [];
let previousScreen = 'menu-principal';

const ITEMS_POR_PAGINA_KAIZENS = 12;
let kaizensPaginaActual = 0;
let kaizensArchivos = [];
let kaizensTotalPaginas = 0;

const ITEMS_POR_PAGINA_METODO = 12;
let metodoPaginaActual = 0;
let metodoArchivos = [];
let metodoTotalPaginas = 0;

const ITEMS_POR_PAGINA_EXITOS = 12;
let exitosPaginaActual = 0;
let exitosArchivos = [];
let exitosTotalPaginas = 0;

function generarOPLButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      archivosOPL = data.filter(file => file.startsWith("OPL ") && file.endsWith(".pdf"));
      totalPaginas = Math.ceil(archivosOPL.length / ITEMS_POR_PAGINA);
      mostrarPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

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

function generarKaizensButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      kaizensArchivos = data.filter(file => file.startsWith("1") && file.endsWith(".pdf"));
      kaizensTotalPaginas = Math.ceil(kaizensArchivos.length / ITEMS_POR_PAGINA_KAIZENS);
      mostrarKaizensPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

function mostrarKaizensPagina(indicePagina) {
  kaizensPaginaActual = indicePagina;
  const contenedor = document.getElementById("kaizens-buttons");
  contenedor.innerHTML = "";
  
  const inicio = kaizensPaginaActual * ITEMS_POR_PAGINA_KAIZENS;
  const fin = inicio + ITEMS_POR_PAGINA_KAIZENS;
  const archivosPagina = kaizensArchivos.slice(inicio, fin);
  
  archivosPagina.forEach(file => {
    const label = file.substring(1).replace(".pdf", "").trim();
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => cargarPDF(file, "kaizens-container");
    contenedor.appendChild(btn);
  });
  
  actualizarKaizensPaginacion();
}

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

function generarMetodoEstandarButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      metodoArchivos = data.filter(file => file.startsWith("2") && file.endsWith(".pdf"));
      metodoTotalPaginas = Math.ceil(metodoArchivos.length / ITEMS_POR_PAGINA_METODO);
      mostrarMetodoEstandarPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

function mostrarMetodoEstandarPagina(indicePagina) {
  metodoPaginaActual = indicePagina;
  const contenedor = document.getElementById("metodo-estandar-buttons");
  contenedor.innerHTML = "";
  
  const inicio = metodoPaginaActual * ITEMS_POR_PAGINA_METODO;
  const fin = inicio + ITEMS_POR_PAGINA_METODO;
  const archivosPagina = metodoArchivos.slice(inicio, fin);
  
  archivosPagina.forEach(file => {
    const label = file.substring(1).replace(".pdf", "").trim();
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => cargarPDF(file, "metodo-estandar-container");
    contenedor.appendChild(btn);
  });
  
  actualizarMetodoEstandarPaginacion();
}

function actualizarMetodoEstandarPaginacion() {
  const paginationContainer = document.getElementById("metodo-estandar-pagination");
  paginationContainer.innerHTML = "";
  
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
  }
}

function generarExitosButtonsDinamicos() {
  fetch('filelist.json')
    .then(response => response.json())
    .then(data => {
      exitosArchivos = data.filter(file => file.startsWith("3") && file.endsWith(".pdf"));
      exitosTotalPaginas = Math.ceil(exitosArchivos.length / ITEMS_POR_PAGINA_EXITOS);
      mostrarExitosPagina(0);
    })
    .catch(error => console.error("Error al cargar filelist.json:", error));
}

function mostrarExitosPagina(indicePagina) {
  exitosPaginaActual = indicePagina;
  const contenedor = document.getElementById("exitos-buttons");
  contenedor.innerHTML = "";
  
  const inicio = exitosPaginaActual * ITEMS_POR_PAGINA_EXITOS;
  const fin = inicio + ITEMS_POR_PAGINA_EXITOS;
  const archivosPagina = exitosArchivos.slice(inicio, fin);
  
  archivosPagina.forEach(file => {
    const label = file.substring(1).replace(".pdf", "").trim();
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => cargarPDF(file, "exitos-container");
    contenedor.appendChild(btn);
  });
  
  actualizarExitosPaginacion();
}

function actualizarExitosPaginacion() {
  const paginationContainer = document.getElementById("exitos-pagination");
  paginationContainer.innerHTML = "";
  
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
  }
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
  
  document.getElementById('download-link').href = ruta;
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
