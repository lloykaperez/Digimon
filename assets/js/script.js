const listaDigimon = document.querySelector("#listaDigimon");

let URL = "https://digimon-api.vercel.app/api/digimon";


fetch(URL)
  .then(response => response.json())
  .then(data => {
    data.forEach(digi => {
      mostrarDigimon(digi);
    });
  });


function mostrarDigimon(digi) {

    let levels = digi.level;
    console.log(levels);

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
                <p class="${digi.level.toLowerCase().replace(' ', '+')} level">${digi.level}</p>
            </div>
        </div>
    `;
    listaDigimon.append(div);
}


