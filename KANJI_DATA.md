# 漢字データに関する覚書

## 1. 漢字一覧のデータ化について

- 文化庁が公開している「[常用漢字表の音訓索引](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/joyokanjisakuin/index.html)」の HTML 構成をもとに CSV へ変換する
    - 漢字（異体字は別フォントサイズで併記）、音訓、例、備考が取得可能
    - 「備考」には、同義字や特殊用例が記載されていることがある
    - 例と備考のデータは国語辞典、漢字辞典などに収録される範疇にあたるため、本アプリでは不要
- 小学校で習う漢字については、文部科学省が公開している「[別表 学年別漢字配当表](https://www.mext.go.jp/a_menu/shotou/new-cs/youryou/syo/koku/001.htm)」の HTML 構成をもとに CSV へ変換する
- 中学校以降で習う漢字は、常用漢字から小学校で習う漢字を除いたものであるため、これをスクリプトによって判別する
    - ただし、どの学年でどれを習うかの定めはない（教科書ごとに異なる）点に注意
        - 参考: [Wikipedia - 学年別漢字配当表](https://ja.wikipedia.org/wiki/%E5%AD%A6%E5%B9%B4%E5%88%A5%E6%BC%A2%E5%AD%97%E9%85%8D%E5%BD%93%E8%A1%A8)
    - 「中学校で習う漢字」の定めがサイトによってあやふやなのはこれが理由

## 2. 漢字一覧のデータ化に関するスクリプト

### `scripts/joyokanji.rb`

- 常用漢字データをCSVで取得するスクリプト
- `$ ruby scripts/joyokanji.rb` を実行すると `scripts/results/JOYOKANJI.CSV` が取得できる