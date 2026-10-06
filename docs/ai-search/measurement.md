# AI検索・来店行動の計測

現在の公開対象はBar REPLICAとEl, franceの2店舗。基準値の記録対象日は2026-10-06だが、権限未接続のため値は未取得。基準値を実際に取得した日を起点に30・60・90日レビュー日を設定し、その後は毎月記録する。未取得値は空欄のままにし、0とは記載しない。

| 指標 | 取得元 | 記録単位 |
|---|---|---|
| Google生成AI検索の表示回数 | Search Console の「生成AIパフォーマンス」レポート。AI Overviews / AI Mode等の表示回数をURL別に確認 | 店舗ページ別・月次 |
| Bing/Copilotの引用 | Bing Webmaster Tools の AI Performance。総引用数、引用ページ、grounding queries | 店舗ページ別・月次 |
| 地図経路、電話、Webクリック | Googleビジネスプロフィールのパフォーマンス | 店舗別・月次 |
| 予約・注文 | 各店で実際に使う予約・注文台帳 | 店舗別・月次。導線がない店は空欄 |

露出と来店・予約行動を同じ重みでレビューする。単純な合計スコアにはしない。両側の推移と、掲載情報の誤り・問い合わせの内容を合わせて判断する。Search ConsoleのAIレポートとBingのAI Performanceは対象面・集計方法が異なるため、数値を足し合わせない。

## 初回接続と確認

1. `www.m-i-m-o-s-a.com` の Search Console 権限を接続し、「生成AIパフォーマンス」で2つの店舗URLの表示回数を保存する。Googleは同レポートを2026-08-31までに全サイトへ展開済みと案内している。[公式案内](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)
2. 同じドメインを Bing Webmaster Tools に接続し、AI Performance の総引用数・引用ページ・grounding queries を保存する。[公式ヘルプ](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)。この指標は表示された引用を集計するもので、検索順位や回答内での重要度を表すものではない。
3. 管理権限を持つGoogleアカウントでBar REPLICAとEl, franceのビジネスプロフィールを確認し、経路・電話・Webクリックを保存する。
4. プロフィールのWebリンクが各店舗ページを指すか確認する。予約や注文の導線が確定した店だけ、その件数を記録する。
5. 30・60・90日レビューでは、2つの公開URLのインデックス状態、検索露出、地図行動、実際の予約・注文を同じ店舗順に比較する。
6. El, franceはGoogleマップ上の営業状態表示に不一致がある。状態が解消するまで、プロフィール指標・サイト情報の正誤確認事項として毎回注記する。

Search Console、Bing Webmaster Tools、Googleビジネスプロフィールの管理権限は未接続のため、このリポジトリ内では実測値を取得していない。`baseline.csv` の空欄は未取得を表す。権限接続と初回値の転記が未完了。

## 2026-10-06のアクセス確認

- Search Console: 現在のGoogleアカウントに `m-i-m-o-s-a.com` のプロパティ権限がない。
- Bing Webmaster Tools: 未ログイン。対象サイトの登録・AI Performanceデータは未確認。
- Googleビジネスプロフィール管理画面: 現在のGoogleアカウントには店舗が登録されていない。

したがって、各サービスの管理者による招待・権限付与が必要。Bing AI Performanceは引用数の集計で、順位や個々のAI回答全体を表す指標ではないため、検索行動や来店行動と分けて解釈する。
