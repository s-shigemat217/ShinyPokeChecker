// URLからポケモンIDを抽出する関数
export function extractIdFromUrl(url) {
  return url.split("/").filter(Boolean).pop();
}
// ポケモンIDからスプライト画像のURLを生成する関数
export function spriteUrlById(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
// ポケモンIDからスプライト画像のURLを生成する関数
export function shinySpriteUrlById(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
}