# MIMO$A 店舗情報確認台帳

更新: 2026-10-04。公開データの正本は `lib/stores.ts`。この台帳は出典と確認待ちを記録する。新店舗は、営業状態を確認してから `lib/stores.ts` に追加し、日英ページ、サイトマップ、地図プロフィール、計測行を同時に増やす。

| 店舗 | 状態 | 住所 | 営業時間 | 連絡先・予約 | 写真・メニュー | 出典と要確認事項 |
|---|---|---|---|---|---|---|
| Bar CHURA kin | 営業中（ユーザー確認） | 金武町金武4323-1。運営元サイトとGoogleマップが一致 | 運営元サイトは19:00〜翌5:00、火曜休。最新の現場確認待ちのため新ページでは非掲載 | [Instagram](https://www.instagram.com/barchura.kin/)を案内。予約方法と電話は未確認 | 実店舗写真なし。運営元サイトにカラオケ、カクテル、ボードゲームの記載 | [CHURA Group公式](https://churagroupjapan.com/)／[地図](https://www.google.com/maps/search/?api=1&query=Bar%20CHURA%20kin%20Kin%204323-1)。Google表示名は「Bar CHURA Kin」で大文字小文字に差がある。閉店済みの「BBQ RESTAURANT CHURA」と混同しない |
| BAR REPLICA | 営業中、MIMO$A NAGOへの改名は未実施（ユーザー確認） | 名護市城1-1-17。既存店舗サイト設定とGoogleマップが一致 | 既存店舗サイトと第三者サイトで曜日の表記が異なるため非掲載、確認待ち | [Instagram](https://www.instagram.com/replica.nago/)を案内。予約可否・方法は確認待ち | 公式サイト既存写真を使用。ダーツ・カラオケは既存店舗サイトに記載 | [地図](https://maps.app.goo.gl/AGW5uiUUDS81NQBi9)／既存サイト設定 `bar-replica/config/site.ts`。Google表示名は「Bar REPLICA」。Googleプロフィールに電話・公式Webリンクなし |
| 豚豚豚 金武本店 | 営業中（ユーザー確認） | 金武町金武4248-3。運営元サイトとGoogleマップが一致 | [Green Park公式](https://greenparkjapan.com/)の日本語と英語で曜日・時間が矛盾。非掲載、現場確認待ち | [Instagram](https://www.instagram.com/tontonton.okinawa/)を案内。予約方法・電話は未確認 | 公式サイト既存写真を使用。豚骨チャーシュー麺、豚豚豚麺、ヤー麺は運営元サイトに記載 | [地図](https://maps.app.goo.gl/Z81XyhimC7eao5wF9)。GoogleプロフィールのWebリンクはInstagram、電話なし |
| MIMO$A KOZA | 営業中（ユーザー確認） | Googleマップに合わせて「〒904-0032 沖縄県沖縄市諸見里1丁目25-8 ハピネスプラザビル702」を掲載 | 既存専用サイトに日曜17:00〜0:00の記載があるが、現行運用確認待ちのため非掲載 | [Instagram](https://www.instagram.com/mimosa.koza/)を案内。専用サイトの公開状態・予約方法は要確認 | 公式サイト既存写真を使用。古着、音楽イベントの記載あり | [Googleマップ掲載](https://maps.app.goo.gl/797o4TCYbXZWMYn26)／既存専用サイト設定 `mimosa-koza-web/lib/site-config.ts`。既存専用サイトの「コザ・ゲート通り周辺」は住所として不一致。GoogleプロフィールのWebリンクは会社トップ |
| MIMO$A GATE2 | 開業準備中（ユーザー確認） | 沖縄市ゲート通り周辺まで。番地未確認 | 未確定、非掲載 | 未確定、非掲載 | 実店舗写真・確定メニューなし。既存公式サイトの「和牛サンド＆ミュージックバー」は別店舗と混同するため分離 | 開業日、番地、最終業態、写真、Googleプロフィール作成時期を確認。開業済みとは表記しない |
| Heaven's Wagyu Sandwich GATE2 | 開業準備中（ユーザー確認） | 沖縄市ゲート通り周辺まで。番地未確認 | 未確定、非掲載 | 未確定、非掲載 | 実店舗写真・商品詳細未確定。和牛産地・商品名は仕入証跡確認前に断定しない | 2026-09の事業計画に独立店舗として記載。開業日、番地、商品、写真、Googleプロフィール作成時期を確認 |

## 公開・掲載先監査

- 公式サイトの旧一覧には「MIMO$A NAGO」と閉店済みの「El, france」が残り、Bar CHURA kin と Heaven's Wagyu Sandwich GATE2 がない。新一覧で修正する。
- 既存のGoogleマップ短縮URLは公開プロフィールをブラウザで確認した。所有者権限・確認済み状態・プロフィールの非公開項目は未確認。
- 営業中4店のGoogleプロフィールには各店舗ページのURLを登録する。店舗ページ公開後、管理権限のあるアカウントでWebリンク、カテゴリ、説明、住所、営業時間、写真、予約・注文導線を確認する。Googleプロフィールの表示名は店舗名の確認結果に合わせる。
- 開業準備中2店は住所と開業予定日が確定するまでプロフィール公開を進めない。Googleの[開業前プロフィール条件](https://support.google.com/business/answer/9174409?hl=ja)を適用する。
- 実在の利用体験に基づく口コミを自然に集め、特典付き口コミや架空の第三者紹介は実施しない。
