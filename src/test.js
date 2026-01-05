import axios from "axios";
import "./style.css";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

const statusEl = document.getElementById("status");
const listEl = document.getElementById("pokemon-list");

// 全ポケモンを取得する関数
async function fetchAllPokemon() {
  try {
    statusEl.textContent = "Loading Pokémon...";

    // ① まず件数を取得
    const firstRes = await api.get("/pokemon", {
      params: { limit: 1, offset: 0 },
    });
    const count = firstRes.data.count;

    // ② 全件取得
    const res = await api.get("/pokemon", {
      params: { limit: count, offset: 0 },
    });

    return res.data.results; // [{ name, url }, ...]
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Failed to load Pokémon.";
    return [];
  }
}

function renderPokemonList(pokemonList) {
  listEl.innerHTML = "";

  for (const pokemon of pokemonList) {
    const li = document.createElement("li");
    li.textContent = pokemon.name;
    listEl.appendChild(li);
  }

  statusEl.textContent = `Total: ${pokemonList.length}`;
}

async function init() {
  const allPokemon = await fetchAllPokemon();
  renderPokemonList(allPokemon);
}

init();
