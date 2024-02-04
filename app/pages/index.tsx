import FormButton, { alternativeButtonClass } from '@/components/form/Button';
import MainHeader from '@/components/main/Header';
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [formData, setFormData] = useState({
    source: "",
    log: ""
  })

  const handleInput = (e: any) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFormData((prevState) => ({...prevState, [fieldName]: fieldValue}))
  }

  const handleFlushLog = () => setFormData((prevState) => ({...prevState, ['log']: ''}))

  const handleSearch = () => {
    console.log('🔥 handleSearch')
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between minismartphone:p-3 minismartphone:pb-12 smartphone:p-4 smartphone:pb-12 tablet:p-6 laptop:p-16 ${inter.className}`}>
      <div
        className="container z-10 w-full max-w-5xl items-center justify-between font-mono text-sm grid grid-cols-3 gap-1">
        <div className="col-span-3 mb-6">
          <MainHeader />
        </div>

        <div className="col-span-3">
          <h2 className="mb-2">調べたい文章</h2>
          <div
            className="w-full p-0 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
            <textarea
              tabIndex={1}
              name="source"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleInput}
              style={{ height: '170px' }} 
              value={formData.source}>
            </textarea>
          </div>
        </div>

        <div className="col-span-3">
          <div className="text-center">
            <FormButton
              buttonClass={alternativeButtonClass}
              label='結果をリセットする'
              tabIndex={3}
              onClick={handleFlushLog} />
            <FormButton
              buttonClass={alternativeButtonClass}
              label='漢字を調べる'
              tabIndex={2}
              onClick={handleSearch} />
          </div>
        </div>

        <div className="col-span-3">
          <h2 className="mb-2">検索結果</h2>
          <div
            className="w-full p-0 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
            <textarea
              tabIndex={3}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ height: '170px' }}
              readOnly
              value={formData.log}>
            </textarea>
          </div>
        </div>

        <div className="col-span-3 grid-cols-12">
          <div className="col-span-8 text-left">
            <small className="text-slate-400">
              ※ 検索結果に関するログはサーバやcookieで収集・保存していません。
            </small>
          </div>
          <div className="col-span-4 text-right minismartphone:mt-2">
            <small className="text-slate-400">
              <Link target="_blank" href="https://github.com/a5shosa/sc-kanji-search/issues">send feedback</Link>
              &nbsp;/&nbsp;
              <Link target="_blank" href="https://www.a5shosa.com/">a5shosa.com</Link>
            </small>
          </div>
        </div>
      </div>
    </main>
  )
}