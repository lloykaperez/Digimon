const listaDigimon = document.querySelector("#listaDigimon");
const botonesHeader = document.querySelectorAll(".btn-header");
const buscador = document.querySelector("#buscador");
const URL = "https://digimon-api.vercel.app/api/digimon";

// Obtener todos los digimones
fetch(URL)
  .then(response => response.json())
  .then(data => {
    data.forEach(digi => {
      mostrarDigimon(digi);
    });
  });

// Función para mostrar un solo digimón
function mostrarDigimon(digi) {
  const div = document.createElement("div");
  div.classList.add("digimon");
  div.innerHTML = `
    <p class="digimon-level-back">${digi.level}</p>
    <div class="digimon-imagen">
      <img src="${digi.img}" alt="${digi.name}">
    </div>
    <div class="digimon-info">
      <div class="nombre-contenedor">
        <h2 class="digimon-nombre">${digi.name}</h2>
      </div>
      <div class="digimon-level">
        <p class="${digi.level.toLowerCase().split(' ').join('-')} level">${digi.level}</p>
      </div>
    </div>
  `;
  listaDigimon.append(div);
}

// Función para filtrar los digimones por nivel
function filtrarDigimonPorNivel(nivel) {
  // Vaciar la lista de digimones para mostrar solo los que corresponden al nivel seleccionado
  listaDigimon.innerHTML = "";

  // Obtener los digimones que corresponden al nivel seleccionado
  fetch(`https://digimon-api.vercel.app/api/digimon/level/${nivel}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(digi => {
        mostrarDigimon(digi);
      });
    });
}


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaDigimon.innerHTML = "";

    if (botonId === "ver-todos") {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                data.forEach(digi => {
                    mostrarDigimon(digi);
                });
            });
    } else {
        fetch(`https://digimon-api.vercel.app/api/digimon/level/${botonId}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(digi => {
                    mostrarDigimon(digi);
                });
            });
    }
}));


buscador.addEventListener("input", (event) => {
  const busqueda = event.target.value.toLowerCase();
  filtrarDigimonPorNombre(busqueda);
});

function filtrarDigimonPorNombre(nombre) {
  listaDigimon.innerHTML = "";

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      data.forEach(digi => {
        if (digi.name.toLowerCase().includes(nombre)) {
          mostrarDigimon(digi);
        }
      });
    });
}