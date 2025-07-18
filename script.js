fetch('preguntas.json')
  .then(response => response.json())
  .then(preguntas => {
    const grid = document.getElementById("cardGrid");

    preguntas.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const inner = document.createElement("div");
        inner.className = "card-inner";

        const front = document.createElement("div");
        front.className = "card-front";
        front.innerHTML = `
            <div class=\"emoji\">${p.frente.split(' ')[0]}</div>
            <div class=\"titulo\">${p.frente.substring(p.frente.indexOf(' ') + 1)}</div>
        `;


        const back = document.createElement("div");
        back.className = "card-back";
        back.innerHTML = `
            <div class=\"back-content\">
                <div class=\"respuesta\"><h2>${p.respuesta}</h2></div>
                <div class=\"descripcion\">${p.descripcion}</div>
            </div>
        `;


        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        grid.appendChild(card);

        card.addEventListener("click", () => {
            card.classList.toggle("flip");
        });
    });
});
