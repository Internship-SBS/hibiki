# TanStack x tRPC

monorepoでSPAのWebアプリケーションを作成するテンプレート

## はじめかた

1. GitLabでこのテンプレートを使用してプロジェクトを作成
2. WSL上にclone
3. WSLに接続したVSCodeからcloneしたプロジェクトを開く
4. `.env.template` をコピーして `.env` を作成
5. 4を実行してから「コンテナーで再度開く」※
6. データ初期化コマンド `pnpm api db:reset` を実行
7. `pnpm dev` で実行
8. [http://127.0.0.1:5173](http://127.0.0.1:5173)で閲覧

※ 4より先に5を実行してしまった場合、4を実行してからVSCode上で Ctrl + Shift + P を押して  
　 「開発コンテナー: キャッシュなしのコンテナーのリビルド」を実行

## 概要

- 全般
  - 言語
    - [TypeScript](https://www.typescriptlang.org/)
  - パッケージマネージャー
    - [pnpm](https://pnpm.io/ja/)
  - RPCフレームワーク
    - [tRPC](https://trpc.io/)
  - バリデーション
    - [zod](https://zod.dev/)
- フロントエンド
  - 描画タイプ
    - SPA (Single Page Application)
  - フレームワーク
    - [React](https://ja.react.dev/)
  - ビルドツール
    - [Vite](https://ja.vitejs.dev/)
  - ライブラリ
    - ルーティング
      - [TanStack Router](https://tanstack.com/router/latest)
    - API通信の状態管理とキャッシュ
      - [TanStack Query](https://tanstack.com/query/latest)
    - フォーム管理
      - [TanStack Form](https://tanstack.com/form/latest)
    - CSSフレームワーク
      - [Mantine](https://mantine.dev/)
- バックエンド
  - フレームワーク
    - [Fastify](https://fastify.dev/)
  - ORM
    - [Prisma](https://www.prisma.io/)
  - 開発サーバー
    - [tsx](https://tsx.is/)

## ライブラリの解説

### tRPC

- フロントエンドからバックエンドのWebAPIを呼び出す際に、fetchメソッドにURLを指定するのではなく、バックエンドの関数を直接呼び出すかの如く記述することができる
- 実際にはバックエンドからimportしているのは型情報だけなので、ランタイムでフロントエンドがバックエンドに依存しているわけではない
- バックエンドの型情報を引き継ぐことができるため、バックエンドを修正してフロントを直すの忘れてた！ということが起きにくい
- zodを併用することで、Dateオブジェクトも自動parseされる

### TanStack Query

- WebAPIのfetchをキャッシュしたりmutationを管理する
- ローディングやエラーなどの状態管理を任せることができる
- fetchしたリクエストにタグ付け(queryKey)することで、他のコンポーネントでmutationした時に当該のタグのrevalidateを促すことができる
- tRPCが[連携を用意している](https://trpc.io/docs/client/react)

### TanStack Router

- 現状SPA専用のルーティングライブラリ
- ページルーティングとページ読み込み時のデータfetchにのみ関心を持つ
- 通常のReactのようにページを読み込む際にuseEffectでデータを取得すると、描画終了後にデータ取得が発生して再表示になるのでパフォーマンスが悪いが、TanStack Routerはページ遷移前にデータ取得を行う仕組みを提供している
- ファイルベースルーティングが可能
- 現在のルーティング情報を元にルーティングの型を生成するので、ページ遷移ロジックにスペルミスなどで存在しないページを入力する可能性が低い
  - routeTree.gen.ts がそれ。自分で書かなくて良い
- 当然ながらTanStack Queryとの相性が良い

### TanStack Form

- Field Firstなアプローチを採用しており、フォーム全体の状態管理をフィールドごとの状態管理にシフトしているため、フォームの再利用性や柔軟性が高く、フィールドAの入力値に応じてフィールドBのバリデーションを変更するようなケースが容易に書ける
- TanStack QueryやTanStack Routerと相性が良い

### Mantine

- CSS ModulesベースのCSSフレームワーク
- 当プロジェクトでは関係ないが、CSS ModulesベースなのでSSRでも使える
- フローティングラベルを採用していないのでラベルを入力済みと勘違いしづらい
- エラーメッセージなども含めて1つのコンポーネントにしてくれているので独自実装が少なくて済む(MUIとかだとStateに応じてスタイルを指定する必要がある)
- React専用で、Reactコンポーネントに使用する型情報が多くサポートされている
- ドキュメントが詳細で、コンポーネントだけでなく[その応用例もGitHubに公開されている](https://github.com/mantinedev/ui.mantine.dev/tree/master/lib)

### Prisma

- TypeScriptのORM
- schema.prismaにデータ構造を記述することで自動でmigrationを行ってくれる
- クエリの返り値には非常に高い型安全性がある
- `import { User } from "@prisma/client";` のような形でPrismaの生成した型情報を利用できる

### tsx

- ts-node の代替
- `tsx watch` があるので、nodemonを入れなくて良い
- `tsx watch` はimportしたファイルを監視するようになっているので細かい設定無しに最適な範囲を監視する
