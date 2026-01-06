// src/render.js
import { extractIdFromUrl, spriteUrlById } from "./util.js";


export function setStatus(text) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = text;
}

// ポケモンリストをレンダリングする関数
export function renderPokemonList(pokemonList) {
  const listEl = document.getElementById("pokemon-list");
  listEl.innerHTML = "";

  for (const pokemon of pokemonList) {
    const id = extractIdFromUrl(pokemon.url);

    const li = document.createElement("li");
    li.className = "pokemon-item";
    const img = document.createElement("img");
    img.src = spriteUrlById(id);
    img.alt = pokemon.name;
    img.width = 120;
    img.height = 120;
    img.loading = "lazy";

    const name = document.createElement("span");
    name.textContent = pokemon.name;

    li.appendChild(document.createTextNode(`${id} `));
    li.appendChild(img);
    li.appendChild(name);
    listEl.appendChild(li);
  }
}