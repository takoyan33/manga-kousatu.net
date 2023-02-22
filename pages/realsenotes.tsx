import React from "react";
import { SiteHead } from "../layouts/components/ui/SiteHead";

function RealseNotes() {
  return (
    <div>
      <SiteHead />
      <h2 className="m-5 my-12 text-center text-2xl font-semibold">
        Manga Study - リリースノート
      </h2>
      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.8</h3>
      <p>2023年2月22日</p>
      <h4 className="text-lg my-2">新機能</h4>
      <p>・リリースノートページの作成</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.7</h3>
      <p>2023年1月3日</p>
      <h4 className="text-lg my-2">機能修正</h4>
      <p>・modalコンポーネント化により、処理速度向上</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.6</h3>
      <p>2023年1月1日</p>
      <h4 className="text-lg my-2">機能修正</h4>
      <p>・ダイナミックルーティングの対応</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.5</h3>
      <p>2023年12月30日</p>
      <h4 className="text-lg my-2">新機能</h4>
      <p>・登録や投稿時にポップアップ（トースト）が出るように追加</p>
      <p>・パスワードの再設定が可能に</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.4</h3>
      <p>2023年11月3日</p>
      <h4 className="text-lg my-2">新機能</h4>
      <p>・プロフィールに投稿と投稿数やカテゴリグラフの表示</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.3</h3>
      <p>2023年10月30日</p>
      <h4 className="text-lg my-2">機能修正</h4>
      <p>・投稿記事の編集日時の追加</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.2</h3>
      <p>2023年10月15日</p>
      <h4 className="text-lg my-2">新機能・機能修正</h4>
      <p>・画像投稿といいね機能の追加</p>
      <p>・ロゴの追加</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.1</h3>
      <p>2023年10月2日</p>
      <h4 className="text-lg my-2">新機能・機能修正</h4>
      <p>・プロフィールページにてメールアドレスやパスワードが編集可能に</p>
      <p>・リロードエラーの不具合解消</p>

      <h3 className="text-xl mt-8 my-4 font-semibold">Manga Study 1.0</h3>
      <p>2023年9月30日</p>
      <p className="mb-8">・MangaStudyの正式リリース</p>

      <h3 className="my-4">Github</h3>
      <p className="font-semibold mb-8">
        <a href="https://github.com/takoyan33/manga-kousatu.net">
          https://github.com/takoyan33/manga-kousatu.net
        </a>
      </p>
    </div>
  );
}

export default RealseNotes;
