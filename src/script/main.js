
import "../style/style.css";
import { fetchAllSpecies, fetchPokemonNameSetByType } from "./api.js";
import { renderPokemonList, setStatus } from "./render.js";
import { loadCaughtSet, saveCaughtSet, toggleCaught } from "./storage.js";

let caughtSet = loadCaughtSet();
let allSpecies = [];
let currentList = [];

const state = {
  allSpecies: [],
  currentList: [],
  caughtSet: loadCaughtSet(),

  // フィルタ状態
  type: "all",
  // search: "",
  // generation: "all",
  // caughtOnly: false,
};

const typeNameSetCache = new Map();

// タイプ変更時の処理
async function onTypeChange(typeName) {
  try {
    if (typeName === "all") {
      currentList = allSpecies;
      renderPokemonList(allSpecies, caughtSet);
      setStatus(`All: ${allSpecies.length}`);
      return;
    }
    setStatus(`Loading type: ${typeName}...`);
    const nameSet = await fetchPokemonNameSetByType(typeName);

    currentList = allSpecies.filter((s) => nameSet.has(s.name));
    renderPokemonList(currentList, caughtSet);
    setStatus(`${typeName}: ${currentList.length}`);
  } catch (error) {
    console.error(error);
    setStatus(`Failed to load type: ${typeName}`);
  }
}

// 捕獲状態のトグルボタンの設定
function setupCaughtToggle() {
  const listEl = document.getElementById("pokemon-list");

  listEl.addEventListener("click", (e) => {
    const btn = e.target.closest('button[data-action="toggle-caught"]');
    if (!btn) return;

    const id = btn.dataset.id;
    toggleCaught(caughtSet, id);
    saveCaughtSet(caughtSet);
    renderPokemonList(currentList, caughtSet);
  });
}

// 初期化関数
async function init() {

  try {
    setStatus("Loading Pokémon species...");
    allSpecies = await fetchAllSpecies();
    currentList = allSpecies;

    renderPokemonList(currentList, caughtSet);

    setStatus(`All: ${allSpecies.length}`);

    // タイプ選択の変更イベントリスナー
    const typeSelectEl = document.getElementById("type-select");
    typeSelectEl.addEventListener("change", (event) => {
      const selectedType = event.target.value;
      onTypeChange(selectedType);
    });

    // 捕獲状態トグルのセットアップ
    setupCaughtToggle();

  } catch (error) {
    console.error(error);
    setStatus("Initialization failed.");
    return;
  }
}

init();