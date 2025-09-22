// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
/* =========================
   LÓGICA DEL AMIGO SECRETO
   ========================= */

// Estado: aquí guardamos los nombres
let amigos = [];

// --- Utilidades puras (lógica) ---
function normaliza(texto) {
  // quita espacios extras y baja a minúsculas para comparar
  return texto.trim().replace(/\s+/g, " ").toLowerCase();
}

function existeNombre(lista, nombre) {
  // true si ya existe (sin importar mayúsculas/minúsculas)
  return lista.some(n => normaliza(n) === normaliza(nombre));
}

function aleatorioEntero(min, maxIncluido) {
  return Math.floor(Math.random() * (maxIncluido - min + 1)) + min;
}

// --- Interacción mínima con el DOM (mostrar resultados) ---
const $input = document.getElementById("amigo");
const $lista = document.getElementById("listaAmigos");
const $result = document.getElementById("resultado");

function mostrarLista(lista) {
  $lista.innerHTML = "";
  for (let i = 0; i < lista.length; i++) {
    const li = document.createElement("li");
    li.textContent = lista[i];
    $lista.appendChild(li);
  }
}

function mostrarMensaje(msg) {
  $result.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = msg;
  $result.appendChild(li);
}

// --- Funciones que pide el reto ---
function agregarAmigo() {
  const nombre = $input.value.trim();
  $result.innerHTML = ""; // limpia mensajes anteriores

  if (nombre === "") {
    mostrarMensaje("Escribe un nombre.");
    $input.focus();
    return;
  }

  if (existeNombre(amigos, nombre)) {
    mostrarMensaje("Ese nombre ya está en la lista.");
    $input.value = "";
    $input.focus();
    return;
  }

  amigos.push(nombre);     // 1) array
  mostrarLista(amigos);    // 2) pintamos
  $input.value = "";       // 3) limpiamos input
  $input.focus();
}

function sortearAmigo() {
  $result.innerHTML = "";

  if (amigos.length < 2) {
    mostrarMensaje("Agrega al menos 2 amigos para sortear.");
    return;
  }

  const iGanador = aleatorioEntero(0, amigos.length - 1);
  const ganador = amigos[iGanador];
  mostrarMensaje("🎉 Tu amigo secreto es: " + ganador);
}

// Extra: Enter también agrega (solo por comodidad)
$input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarAmigo();
});

// Exponer funciones para los botones inline del HTML
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
