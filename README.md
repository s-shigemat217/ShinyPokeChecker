# PokeAPI Pokémon List App

PokeAPIを利用して、ポケモンの一覧を取得・表示するWebアプリです。
タイプ別フィルタや捕獲管理機能を実装し、捕獲済みのポケモンは色違い画像で表示されます。

## Features
- ポケモン全種一覧の取得・表示（pokemon-species）
- タイプ別フィルタリング
- 捕獲状態の管理（localStorage）
- 捕獲済みポケモンの色違い表示
- ページリロード後も捕獲状態を保持

## Tech Stack

- JavaScript (Vanilla)
- Vite
- Axios
- PokeAPI

## API Used

- https://pokeapi.co/api/v2/pokemon-species
- https://pokeapi.co/api/v2/type/{type}

## Structure

```text
src/
├─ js/
│  ├─ main.js        // 状態管理・イベント制御
│  ├─ api.js         // API通信処理
│  ├─ render.js      // DOM描画処理
│  ├─ storage.js     // localStorage管理
│  └─ utils.js       // ユーティリティ関数
└─ style/
   └─ style.css
```

## 実行方法
1. npm install
2. npm run dev
