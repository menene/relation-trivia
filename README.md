# 🎯 ¿Cómo se llama la relación?

Un juego web tipo *trivia* para aprender y practicar las relaciones entre clases en programación orientada a objetos (POO): **Dependencia, Asociación, Agregación, Composición y Herencia**.

---

## 📦 Descripción

El juego muestra tarjetas con ejemplos de relaciones del mundo real (ej. *Biblioteca y Libros*). Al hacer click en una tarjeta, esta da la vuelta y revela:

✅ El nombre de la relación.  
✅ Una breve descripción de por qué es esa relación.

Ideal para estudiantes o desarrolladores que desean reforzar sus conocimientos de POO de forma divertida.

---

## 🚀 Cómo usar

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` en tu navegador favorito.
3. Haz click en cualquier tarjeta para adivinar la relación y comprobar la respuesta.

💡 No requiere servidor ni instalación adicional.

---

## 🎮 Características

- ✅ 12 ejemplos diferentes con todas las relaciones clave de POO.
- ✅ Animación de tarjetas tipo *flip* al estilo game show.
- ✅ Diseño responsivo que funciona en desktop y móvil.
- ✅ Fácil de extender agregando más preguntas en el archivo `preguntas.json`.

---

## 📂 Estructura del proyecto

```
📦 trivia_relaciones/
├── index.html         # Página principal
├── styles.css         # Estilos del juego
├── script.js          # Lógica de las tarjetas
├── preguntas.json     # Lista de preguntas y respuestas
└── assets/
    └── logo.png       # Logo del juego
```

---

## 🛠️ Tecnologías

- HTML5
- CSS3 (Flexbox + Grid)
- JavaScript (vanilla)
- Animación con `transform: rotateY`

---

## 📖 Cómo agregar más preguntas

1. Edita el archivo `preguntas.json`.
2. Añade más objetos con `frente`, `respuesta` y `descripcion`.

```json
{
  "frente": "✈️ Piloto y Avión",
  "respuesta": "Dependencia",
  "descripcion": "El piloto usa el avión solo durante el vuelo."
}
```

---

## 👨‍💻 Autor

Erick Marroquín – [GitHub](https://github.com/menene)