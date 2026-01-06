import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

// 全ポケモンを取得する関数
export async function fetchAllSpecies() {
  // 件数を取得
  const firstRes = await api.get("/pokemon-species", {params: { limit: 1, offset: 0 },});
  const count = firstRes.data.count;

  // 全件取得
  const res = await api.get("/pokemon-species", {params: { limit: count, offset: 0 },});
  return res.data.results;
}

// 指定したタイプのポケモン名セットを取得する関数
export async function fetchPokemonNameSetByType(typeName) {
  const res = await api.get(`/type/${typeName}`);
  return new Set(res.data.pokemon.map((item) => item.pokemon.name));
}