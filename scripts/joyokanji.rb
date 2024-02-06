# encoding: UTF-8

require 'csv'
require 'nokogiri'
require 'open-uri'

csv_path = 'scripts/results/JOYOKANJI.CSV'
url = 'https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/joyokanjisakuin/index.html'
source = Nokogiri::HTML(open(url))

CSV.open(csv_path, 'w') do |csv|
    source.css('table#urlist tbody tr').each do |row|
        kanji = row.css('td:first-child font[size=7]').text
        on_kun = row.css('td:nth-child(2)').inner_html&.encode('UTF-8', 'Shift_JIS').gsub('<br>', '|').gsub(' ', '').gsub('　', '') # 音訓をひらがなとカタカナで分ける必要あり
        rei = row.css('td:nth-child(3)').inner_html&.encode('UTF-8', 'Shift_JIS').gsub('<br>', '|').gsub('，', '|').gsub(' ', '').gsub('　', '')
        csv << [kanji, on_kun, rei]
    end
end