# RouteMapQuiz

## 概要
大学の講義の課題で作った、ダイクストラ法を使った路線図の経路探索をベースにしたゲーム。

## 遊び方
- https://naoki-kitamura.github.io/RouteMapQuiz/game.html にアクセス
- EasyまたはHardのボタンをクリックするとスタート
- 二つの駅名のボタンが出現するので、東京駅と「近い」ほうを選ぶと1ポイント
- 間違えたらゲームオーバー
- Easyの場合は駅の地図上での位置が確認できる

### 「近い」の定義およびグラフの作成について
路線図データの前処理として新幹線の路線は削除し、歩いて乗り換え可能な駅は一つの駅とみなして座標は重心にした。駅をノードとし在来線で結ばれている駅同士にエッジを貼る。エッジのコストは駅の緯度経度からHybeny距離を計算して用いた(本当は走行時間を使いたい)。

## 使わせていただいたもの

### https://ekidata.jp/
路線図データ。これがすごくて、無料でこんなに良いデータが使えていいんですか！？感謝します。金持ちだったら有料版を買ってました。

### https://github.com/andrewhayward/dijkstra
ダイクストラ法のjavascript実装。AtCoder等でもよく使うし今更1から実装する必要はないと思ったのでこちらを少し改変して用いた。

## 各ファイルについて
課題用に簡単に作るために.jsでデータを保存してある。

### coord.js
駅の座標と名前

### edge.js
駅の接続情報

### graph.js
上記のダイクストラ法の実装を少し改変したもの

### map.js
地図の描画、ゲームの進行

### game.html
見た目

### prperocesser.py
路線図データの前処理。data/下に路線図データを置いて実行するとcoord.jsとedge.jsを生成する。