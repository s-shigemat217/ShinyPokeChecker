
import "../style/style.css";
import { fetchAllSpecies, fetchPokemonNameSetByType } from "./api.js";
import { renderPokemonList, setStatus } from "./render.js";

let allSpecies = [];

// タイプ変更時の処理
async function onTypeChange(typeName) {
  // console.log("onTypeChange:", typeName);
  try {
    if (typeName === "all") {
      renderPokemonList(allSpecies);
      setStatus(`All: ${allSpecies.length}`);
      return;
    }
    setStatus(`Loading type: ${typeName}...`);
    const nameSet = await fetchPokemonNameSetByType(typeName);

    // species一覧（name）を、typeのpokemon名セットで絞る
    const filtered = allSpecies.filter((s) => nameSet.has(s.name));
    renderPokemonList(filtered);
    setStatus(`${typeName}: ${filtered.length}`);
  } catch (error) {
    console.error(error);
    setStatus(`Failed to load type: ${typeName}`);
  }
}

// 初期化関数
async function init() {
  try {
    setStatus("Loading Pokémon species...");
    allSpecies = await fetchAllSpecies();
    renderPokemonList(allSpecies);
    setStatus(`All: ${allSpecies.length}`);

    // タイプ選択の変更イベントリスナー
    const typeSelectEl = document.getElementById("type-select");
    typeSelectEl.addEventListener("change", (event) => {
      const selectedType = event.target.value;
      onTypeChange(selectedType);
    });

  } catch (error) {
    console.error(error);
    setStatus("Initialization failed.");
    return;
  }
}

init();