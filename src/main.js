import axios from "axios";
import "./style.css";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

const statusEl = document.getElementById("status");
const listEl = document.getElementById("pokemon-list");

const typeSelectEl = document.getElementById("type-select");
const sentinelEl = document.getElementById("sentinel");
let allSpecies = [];

// 全ポケモンを取得する関数
async function fetchAllSpecies() {
  try {
    statusEl.textContent = "Loading Pokémon...";

    // ① 件数を取得
    const firstRes = await api.get("/pokemon-species", {
      params: { limit: 1, offset: 0 },
    });
    const count = firstRes.data.count;

    // ② 全件取得
    const res = await api.get("/pokemon-species", {
      params: { limit: count, offset: 0 },
    });

    return res.data.results;
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

// ポケモンリストをレンダリングする関数
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

// タイプ選択の変更イベントリスナー
typeSelectEl.addEventListener("change", (event) => {
  const selectedType = event.target.value;
  console.log("selected type:", selectedType);
  onTypeChange(selectedType);
});

// 指定したタイプのポケモン名セットを取得する関数
async function fetchPokemonNameSetByType(typeName) {
  const res = await api.get(`/type/${typeName}`);
  return new Set(res.data.pokemon.map((item) => item.pokemon.name));
}

// タイプ変更時の処理
async function onTypeChange(typeName) {
  // console.log("onTypeChange:", typeName);
  try {
    if (typeName === "all") {
      renderPokemonList(allSpecies);
      statusEl.textContent = `All: ${allSpecies.length}`;
      return;
    }

    statusEl.textContent = `Loading type: ${typeName}...`;

    const nameSet = await fetchPokemonNameSetByType(typeName);

    console.log("nameSet:", nameSet);
    console.log("allSpecies length:", allSpecies.length);
    console.log("allSpecies[0]:", allSpecies[0]);
    console.log("allSpecies first name:", allSpecies?.[0]?.name);
    // species一覧（name）を、typeのpokemon名セットで絞る
    const filtered = allSpecies.filter((s) => nameSet.has(s.name));

    renderPokemonList(filtered);
    statusEl.textContent = `${typeName}: ${filtered.length}`;
  } catch (error) {
    console.error(error);
    statusEl.textContent = `Failed to load type: ${typeName}`;
  }
}

// 初期化関数
async function init() {
  try {
    statusEl.textContent = "Loading Pokémon species...";

    allSpecies = await fetchAllSpecies();
    console.log("loaded allSpecies:", allSpecies.length);
    renderPokemonList(allSpecies);
    statusEl.textContent = `All: ${allSpecies.length}`;
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Initialization failed.";
    return;
  }
}

init();
