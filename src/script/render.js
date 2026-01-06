// src/render.js
import { extractIdFromUrl, spriteUrlById, shinySpriteUrlById } from "./util.js";


export function setStatus(text) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = text;
}

// ポケモンリストをレンダリングする関数
export function renderPokemonList(  pokemonList, caughtSet) {
  const listEl = document.getElementById("pokemon-list");
  listEl.innerHTML = "";

  for (const pokemon of pokemonList) {
    const id = extractIdFromUrl(pokemon.url);
    const isCaught = caughtSet && caughtSet.has(String(id));

    const li = document.createElement("li");
    li.className = "pokemon-item";

    const img = document.createElement("img");
    img.src = isCaught ? shinySpriteUrlById(id) : spriteUrlById(id);
    img.alt = pokemon.name;
    img.width = 120;
    img.height = 120;
    img.loading = "lazy";

    const name = document.createElement("span");
    name.textContent = pokemon.name;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = isCaught ? "Caught ✅" : "Not caught";
    btn.dataset.action = "toggle-caught";
    btn.dataset.id = String(id);


    li.appendChild(document.createTextNode(`${id} `));
    li.appendChild(img);
    li.appendChild(name);
    li.appendChild(btn);
    listEl.appendChild(li);
  }
}