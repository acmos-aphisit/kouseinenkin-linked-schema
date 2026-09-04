# schema-diagram-next

厚生年金事務サポートシステムにて基本マスタ検索画面での連動更新処理の図解 <br/>
・基本マスタ ➝ 各業務 <br/>
・各業務 ➝ 基本マスタ <br/>
・当業務 ➝ 各業務 <br/>

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 を開いてください。

## 編集する場所

- `data/schema.ts` — テーブル・項目・色分け（category）、テーブルをまたぐ連動関係（`CONNECTIONS`）はここだけで定義しています。項目の追加・削除・連動線の変更はこのファイルを直せば画面に反映されます。
- `data/graph.ts` — `CONNECTIONS` から隣接関係を組み立てて、クリック時に連動チェーン全体をたどるためのロジック。通常は触らなくてOKです。
- `components/SchemaDiagram.tsx` — 描画・クリック処理・検索・改修メモの表示ロジック本体。
- `app/globals.css` — 配色や余白などの見た目。クラス名は `dg-` で始まる接頭辞にしています。

## ビルド（静的書き出し）

`next.config.mjs` で `output: 'export'` を指定しているので、`npm run build` で `out/` に静的HTMLが出力されます。

```bash
npm run build
```

## GitHub Actions で GitHub Pages に公開する

`.github/workflows/deploy.yml` を同梱しています。リポジトリの Settings → Pages で
「Source: GitHub Actions」を選んだ状態で `main` に push すると、自動的にビルドして
`https://<ユーザー名>.github.io/<リポジトリ名>/` に公開されます。

GitHub Pages のプロジェクトサイトは `/<リポジトリ名>/` 配下で配信されるため、
ワークフロー内で `NEXT_PUBLIC_BASE_PATH` にリポジトリ名を渡し、`next.config.mjs` の
`basePath` に反映しています。ユーザーサイト（`<ユーザー名>.github.io` 直下）で公開する
場合や、Vercel など別のホスティングを使う場合は、この `basePath` の設定を外すか
空文字にしてください。
