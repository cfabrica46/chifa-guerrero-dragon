const platos = [
  {
    nombre: "Los 5 Furiosos",
    categoria: "especiales",
    descripcion:
      "La bandeja estrella de la casa con cinco favoritos para compartir.",
  },
  {
    nombre: "Chaufa Dragon",
    categoria: "arroces",
    descripcion: "Arroz chaufa al wok con pollo, cerdo, huevo y cebolla china.",
  },
  {
    nombre: "Aeropuerto Imperial",
    categoria: "especiales",
    descripcion: "Arroz, tallarin y saltado reunidos en una porcion potente.",
  },
  {
    nombre: "Tallarin al Wok",
    categoria: "tallarines",
    descripcion:
      "Tallarines salteados con verduras frescas y salsa de la casa.",
  },
  {
    nombre: "Pollo Tipakay",
    categoria: "pollos",
    descripcion: "Pollo crocante con salsa agridulce estilo chifa.",
  },
  {
    nombre: "Kam Lu Wantan",
    categoria: "especiales",
    descripcion: "Wantanes crocantes con salsa tamarindo, carnes y verduras.",
  },
  {
    nombre: "Cerdo con Tamarindo",
    categoria: "cerdo",
    descripcion: "Cerdo salteado con salsa de tamarindo y toque ahumado.",
  },
  {
    nombre: "Wantan Crocante",
    categoria: "entradas",
    descripcion: "Entrada clasica para compartir antes del plato fuerte.",
  },
];

const furiosos = [
  {
    id: 1,
    nombre: "Chaufa Dragon",
    descripcion: "Arroz chaufa al wok con pollo, cerdo, huevo y cebolla china.",
    imagen: "./assets/5furiosos/arroz.png",
    clase: "furioso-1",
  },
  {
    id: 2,
    nombre: "Tallarin Fuego",
    descripcion:
      "Tallarines salteados al wok con verduras, pollo y salsa de la casa.",
    imagen: "./assets/5furiosos/tallarin.png",
    clase: "furioso-2",
  },
  {
    id: 3,
    nombre: "Pollo Crocante Agridulce",
    descripcion:
      "Trozos de pollo crocante acompanados con salsa de tamarindo y toque picante suave.",
    imagen: "./assets/5furiosos/pollo.png",
    clase: "furioso-3",
  },
  {
    id: 4,
    nombre: "Cerdo Char Siu",
    descripcion:
      "Cerdo glaseado estilo chifa, servido en laminas y con vegetales salteados.",
    imagen: "./assets/5furiosos/cerdo.png",
    clase: "furioso-4",
  },
  {
    id: 5,
    nombre: "Wantanes Furiosos",
    descripcion:
      "Wantanes rellenos, fritos y acompanados por una salsa especial ligeramente picante.",
    imagen: "./assets/5furiosos/wantan.png",
    clase: "furioso-5",
  },
];

const notificaciones = [
  "El wok esta encendido",
  "Chifa para venir con hambre",
  "Ya conoces Los 5 Furiosos?",
  "Cinco favoritos. Un solo plato.",
  "Cocina que nos une",
];

let cantidadPersonas = 3;
let categoriaActual = "todos";

function iniciarPagina() {
  renderizarCarta();
  llenarSelectorPlatos();
  mostrarNotificacionAleatoria();
  actualizarRecomendacionPersonas();
  marcarSeccionActiva("inicio");

  setInterval(mostrarNotificacionAleatoria, 5000);
}

function mostrarNotificacionAleatoria() {
  const indice = Math.floor(Math.random() * notificaciones.length);
  const mensaje = notificaciones[indice];

  document.getElementById("notificationBar").textContent = mensaje;
}

function irASeccion(id) {
  const seccion = document.getElementById(id);

  if (seccion) {
    seccion.scrollIntoView({
      behavior: "smooth",
    });

    marcarSeccionActiva(id);
  }
}

function marcarSeccionActiva(id) {
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === id);
  });
}

function renderizarCarta() {
  const menuGrid = document.getElementById("menuGrid");

  menuGrid.innerHTML = "";

  platos.forEach((plato) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    card.dataset.name = plato.nombre;
    card.dataset.category = plato.categoria;

    card.innerHTML = `
            <span class="category">${formatearCategoria(plato.categoria)}</span>
            <h3>${plato.nombre}</h3>
            <p>${plato.descripcion}</p>
        `;

    menuGrid.appendChild(card);
  });
}

function llenarSelectorPlatos() {
  const selector = document.getElementById("plato");

  platos.forEach((plato) => {
    const option = document.createElement("option");
    option.value = plato.nombre;
    option.textContent = plato.nombre;
    selector.appendChild(option);
  });
}

function filtrarCarta(categoria) {
  categoriaActual = categoria;

  const filtros = document.querySelectorAll(".menu-filter");

  filtros.forEach((filtro) => {
    filtro.classList.toggle("active", filtro.dataset.category === categoria);
  });

  aplicarFiltrosCarta();
}

function buscarPlatos() {
  aplicarFiltrosCarta();
}

function aplicarFiltrosCarta() {
  const termino = document
    .getElementById("menuSearch")
    .value.toLowerCase()
    .trim();
  const cards = document.querySelectorAll(".menu-card");

  cards.forEach((card) => {
    const nombre = card.dataset.name.toLowerCase();
    const categoria = card.dataset.category;
    const coincideCategoria =
      categoriaActual === "todos" || categoria === categoriaActual;
    const coincideBusqueda = nombre.includes(termino);

    card.hidden = !(coincideCategoria && coincideBusqueda);
  });
}

function mostrarFurioso(id) {
  const furioso = furiosos.find((item) => item.id === id);

  if (!furioso) {
    return;
  }

  const imagen = document.getElementById("furiosoImage");

  imagen.className = `food-frame ${furioso.clase}`;
  imagen.setAttribute("aria-label", furioso.nombre);

  document.getElementById("furiosoName").textContent = furioso.nombre;
  document.getElementById("furiosoDescription").textContent =
    furioso.descripcion;
  document.getElementById("furiosoImage").src = furioso.imagen;
  document.getElementById("furiosoImage").alt = furioso.nombre;

  const botones = document.querySelectorAll(".furioso-button");

  botones.forEach((boton, index) => {
    boton.classList.toggle("active", index + 1 === id);
  });
}

function aumentarPersonas() {
  if (cantidadPersonas < 10) {
    cantidadPersonas++;
  }

  actualizarRecomendacionPersonas();
}

function disminuirPersonas() {
  if (cantidadPersonas > 1) {
    cantidadPersonas--;
  }

  actualizarRecomendacionPersonas();
}

function actualizarRecomendacionPersonas() {
  let mensaje = "";

  if (cantidadPersonas === 1) {
    mensaje = "Vienes con hambre. Respetamos eso.";
  } else if (cantidadPersonas === 2) {
    mensaje = "Los 5 Furiosos es una buena opcion para compartir.";
  } else if (cantidadPersonas === 3) {
    mensaje = "Los 5 Furiosos deberia bastar... probablemente.";
  } else {
    mensaje = "Para un grupo grande, pueden explorar otros platos de la carta.";
  }

  document.getElementById("peopleCount").textContent = cantidadPersonas;
  document.getElementById("peopleMessage").textContent = mensaje;
}

function cambiarImagenGaleria(clase, alt) {
  const imagenPrincipal = document.getElementById("galleryMainImage");
  const miniaturas = document.querySelectorAll(".gallery-thumb");

  imagenPrincipal.className = `gallery-main food-frame ${clase}`;
  imagenPrincipal.setAttribute("aria-label", alt);

  miniaturas.forEach((miniatura) => {
    miniatura.classList.toggle(
      "active",
      miniatura.textContent.toLowerCase() === alt.split(" ")[0].toLowerCase(),
    );
  });
}

function copiarTelefono() {
  const telefono = document.getElementById("phoneText").textContent;
  const boton = document.getElementById("copyPhoneButton");

  navigator.clipboard.writeText(telefono);

  boton.textContent = "Telefono copiado";

  setTimeout(() => {
    boton.textContent = "Copiar telefono";
  }, 1800);
}

function sugerirPlatoAleatorio() {
  const indice = Math.floor(Math.random() * platos.length);
  const plato = platos[indice];
  const mensaje = `Hoy podria ser: ${plato.nombre}. ${plato.descripcion}`;

  document.getElementById("randomDishText").textContent = mensaje;
}

function procesarSolicitud() {
  const nombre = document.getElementById("nombre").value.trim();
  const plato = document.getElementById("plato").value;
  const atencion = document.getElementById("atencion").value;
  const personas = Number(document.getElementById("personas").value);

  if (nombre === "" || plato === "" || atencion === "") {
    alert("Completa los datos solicitados antes de continuar.");
    return;
  }

  let recomendacion = "Tu seleccion esta lista para consultar.";

  if (plato === "Los 5 Furiosos" && personas === 1) {
    recomendacion = "Vienes con hambre. Nos gusta tu actitud.";
  } else if (plato === "Los 5 Furiosos" && personas >= 2 && personas <= 3) {
    recomendacion = "Los 5 Furiosos es una buena opcion para compartir.";
  } else if (plato === "Los 5 Furiosos" && personas >= 4) {
    recomendacion =
      "Para un grupo grande, quiza quieran acompanarlo con otro plato de la carta.";
  }

  let mensajeAtencion = "";

  if (atencion === "delivery") {
    mensajeAtencion =
      "Seleccionaste atencion por delivery. Recuerda indicar tu direccion al contactarnos.";
  } else if (atencion === "llevar") {
    mensajeAtencion = "Seleccionaste una opcion para llevar.";
  } else {
    mensajeAtencion = "Te esperamos en nuestro local.";
  }

  const mensaje = `
Hola, ${nombre}.

Elegiste ${plato} para ${personas} persona(s).
${mensajeAtencion}

${recomendacion}

Gracias por elegir El Guerrero Dragon.
    `;

  alert(mensaje);
}

function formatearCategoria(categoria) {
  if (categoria === "especiales") {
    return "Especiales";
  } else if (categoria === "arroces") {
    return "Arroces";
  } else if (categoria === "tallarines") {
    return "Tallarines";
  } else if (categoria === "pollos") {
    return "Pollos";
  } else if (categoria === "cerdo") {
    return "Cerdo";
  }

  return "Entradas";
}

iniciarPagina();
