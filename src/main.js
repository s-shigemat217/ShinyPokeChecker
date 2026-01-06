import axios from "axios";
import "./style.css";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

const statusEl = document.getElementById("status");
const listEl = document.getElementById("pokemon-list");

const sentinelEl = document.getElementById("sentinel");

// 全ポケモンを取得する関数
async function fetchAllPokemon() {
  try {
    statusEl.textContent = "Loading Pokémon...";

    // ① まず件数を取得
    const firstRes = await api.get("/pokemon-species", {
      params: { limit: 1, offset: 0 },
    });
    const count = firstRes.data.count;

    // ② 全件取得
    const res = await api.get("/pokemon-species", {
      params: { limit: count, offset: 0 },
    });

    return res.data.results; // [{ name, url }, ...]
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Failed to load Pokémon.";
    return [];
  }
}
// URLからポケモンIDを抽出する関数
function extractIdFromUrl(url) {
  return url.split("/").filter(Boolean).pop();
}
// ポケモンIDからスプライト画像のURLを生成する関数
function spriteUrlById(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function renderPokemonList(pokemonList) {
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

  statusEl.textContent = `Total: ${pokemonList.length}`;
}

async function init() {
  const allPokemon = await fetchAllPokemon();
  renderPokemonList(allPokemon);
}

init();
