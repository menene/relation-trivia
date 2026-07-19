// Cuántas tarjetas por nivel (ronda).
const LEVEL_SIZE = 4;

// Color-coding por tipo de relación (debe coincidir con las variables --c-* del CSS)
const COLORS = {
  "herencia": "var(--c-herencia)",
  "composición": "var(--c-composicion)",
  "composicion": "var(--c-composicion)",
  "agregación": "var(--c-agregacion)",
  "agregacion": "var(--c-agregacion)",
  "asociación": "var(--c-asociacion)",
  "asociacion": "var(--c-asociacion)",
  "dependencia": "var(--c-dependencia)",
};

const accentFor = (respuesta) =>
  COLORS[respuesta.trim().toLowerCase()] || "var(--c-default)";

// Divide el frente en emoji (primer "palabra") + título restante.
function splitFrente(frente) {
  const trimmed = frente.trim();
  const spaceIdx = trimmed.indexOf(" ");
  if (spaceIdx === -1) return { emoji: trimmed, titulo: "" };
  return {
    emoji: trimmed.slice(0, spaceIdx),
    titulo: trimmed.slice(spaceIdx + 1),
  };
}

function renderTrivia(preguntas) {
  const grid = document.getElementById("cardGrid");
  const scoreCount = document.getElementById("scoreCount");
  const scoreTotal = document.getElementById("scoreTotal");
  const legendEl = document.getElementById("legend");
  const resetBtn = document.getElementById("resetBtn");
  const levelNav = document.getElementById("levelNav");
  const prevBtn = document.getElementById("prevLevel");
  const nextBtn = document.getElementById("nextLevel");
  const roundLabel = document.getElementById("roundLabel");

  const levelCount = Math.ceil(preguntas.length / LEVEL_SIZE);
  let current = 0;

  const cards = [];

  // ---- Construye todas las tarjetas una sola vez ----
  preguntas.forEach((p, i) => {
    const { emoji, titulo } = splitFrente(p.frente);
    const accent = accentFor(p.respuesta);
    const level = Math.floor(i / LEVEL_SIZE);

    const card = document.createElement("div");
    card.className = "card";
    card.dataset.level = level;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `${titulo}. Revelar respuesta.`);

    const inner = document.createElement("div");
    inner.className = "card-inner";
    inner.style.setProperty("--accent", accent);

    const front = document.createElement("div");
    front.className = "card-front";
    front.innerHTML = `
      <span class="card-num">${String(i + 1).padStart(2, "0")}</span>
      <div class="emoji">${emoji}</div>
      <div class="titulo">${titulo}</div>
      <div class="hint">Toca para revelar</div>
    `;

    const back = document.createElement("div");
    back.className = "card-back";
    back.innerHTML = `
      <div class="pair">${titulo}</div>
      <div class="respuesta">${p.respuesta}</div>
      <div class="descripcion">${p.descripcion}</div>
    `;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    grid.appendChild(card);
    cards.push(card);

    const toggle = () => {
      card.classList.toggle("flip");
      refreshProgress();
    };
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  const cardsInLevel = (n) => cards.filter((c) => +c.dataset.level === n);
  const revealedInLevel = (n) =>
    cardsInLevel(n).filter((c) => c.classList.contains("flip")).length;

  // ---- Navegación de niveles ----
  const levelButtons = [];
  for (let n = 0; n < levelCount; n++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-btn";
    btn.innerHTML = `<span class="lv-label">Nivel</span><span class="lv-num">${n + 1}</span><span class="lv-check">✓</span>`;
    btn.addEventListener("click", () => setLevel(n));
    levelNav.appendChild(btn);
    levelButtons.push(btn);
  }

  function refreshProgress() {
    const done = revealedInLevel(current);
    const total = cardsInLevel(current).length;
    scoreCount.textContent = done;
    scoreTotal.textContent = total;
    levelButtons.forEach((btn, n) => {
      const complete = revealedInLevel(n) === cardsInLevel(n).length;
      btn.classList.toggle("complete", complete);
    });
  }

  function setLevel(n) {
    current = Math.max(0, Math.min(levelCount - 1, n));
    cards.forEach((c) => {
      const inLevel = +c.dataset.level === current;
      c.classList.toggle("hidden", !inLevel);
    });
    // Reinicia la animación de entrada de forma escalonada
    cardsInLevel(current).forEach((c, i) => {
      c.style.animation = "none";
      // fuerza reflow para reiniciar la animación
      void c.offsetWidth;
      c.style.animation = "";
      c.style.animationDelay = `${i * 70}ms`;
    });
    levelButtons.forEach((btn, i) => btn.classList.toggle("active", i === current));
    roundLabel.textContent = `Ronda ${current + 1} de ${levelCount}`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === levelCount - 1;
    refreshProgress();
  }

  prevBtn.addEventListener("click", () => setLevel(current - 1));
  nextBtn.addEventListener("click", () => setLevel(current + 1));

  resetBtn.addEventListener("click", () => {
    cardsInLevel(current).forEach((c) => c.classList.remove("flip"));
    refreshProgress();
  });

  // ---- Leyenda de colores (tipos únicos presentes) ----
  const seen = new Set();
  preguntas.forEach((p) => {
    const key = p.respuesta.trim();
    if (seen.has(key.toLowerCase())) return;
    seen.add(key.toLowerCase());
    const li = document.createElement("li");
    li.innerHTML = `<span class="dot" style="color:${accentFor(key)}"></span>${key}`;
    legendEl.appendChild(li);
  });

  setLevel(0);
}

if (Array.isArray(window.PREGUNTAS)) {
  renderTrivia(window.PREGUNTAS);
} else {
  console.error("No se cargó preguntas.js (window.PREGUNTAS no está definido).");
  document.getElementById("cardGrid").innerHTML =
    '<p style="opacity:.7">No se pudieron cargar las preguntas.</p>';
}
