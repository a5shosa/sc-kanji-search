export default function MainHeader() {
  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        <div className="tablet:col-span-1 minismartphone:col-span-2 m-auto">
          <img src="android-chrome-96x96.png" />
        </div>
        <div className="tablet:col-span-11 minismartphone:col-span-10 flex align-left">
          <div className="inline-block my-auto tablet:ml-4">
            <h1 className="text-lg">小中学校漢字検索</h1>
            <small className="text-slate-600">単語や文章を入れると、義務教育課程（小・中学校）で習う漢字を検索できます。</small>
          </div>
        </div>
      </div>
    </>
  )
}