import React, { useEffect, useState } from 'react'
import { I18nProvider, useI18n } from '@i18n-pro/react'
import { render } from 'react-dom'
import initI18nState from './i18n'
import './index.css'

const bestProgramLang = ['JavaScript', 'Java', 'C', 'C++', 'Python', 'PHP'][
  Math.round(Math.random() * 5)
]

const date = new Date()

const locales = {
  en: 'English',
  zh: '简体中文',
  cht: '繁體中文',
  jp: '日本語',
}

function App() {
  const { t, setI18n, i18nState } = useI18n()
  const [show, setShow] = useState(false)
  const [time, setTime] = useState(new Date())
  const [loading, setLoading] = useState(false)

  async function resolveI18n(localeProp?: string) {
    let locale = undefined

    if (localeProp) {
      locale = localeProp
    } else {
      const params = new URLSearchParams(
        new URLSearchParams(window.location.search.slice(1)),
      )
      locale = params.get('locale') || 'en'
    }

    let lang = {}
    if (locale != 'zh') {
      setLoading(true)
      let req = await fetch(`../i18n/${locale}.json`)
      try {
        lang = await req.json()
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    setI18n({
      langs: {
        [locale]: lang,
      },
      locale,
    })

    setShow(true)
  }

  function onSelectChange(e) {
    const locale = e.target.value
    if (i18nState?.langs?.[locale] || locale == 'zh') {
      setI18n({ locale })
    } else {
      resolveI18n(locale)
    }
    history.replaceState(null, '', `?locale=${locale}`)
  }

  useEffect(() => {
    resolveI18n()
    const tag = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(tag)
    }
  }, [])

  return (
    <>
      {show && (
        <>
          <select
            defaultValue="zh"
            value={i18nState.locale}
            onChange={onSelectChange}
          >
            {Object.entries(locales).map(([locale, name]) => {
              return (
                <option value={locale} key={locale}>
                  {name}
                </option>
              )
            })}
          </select>
          <div className="title">{t('基础示例')}</div>
          <div>{t('简单的一段描述')}</div>
          <div>{t('{0}是世界上最好的语言？我不信', bestProgramLang)}</div>
          <div>
            {t(
              '这个男人叫{0}，意外获得了超能力，这个女人叫{1}，意外被{2}追杀，这个小孩叫{3}，意外遭遇了意外',
              '小帅',
              '小美',
              'FBI',
              '小白',
            )}
          </div>

          <div className="title">{t('格式化数字')}</div>
          <div>{t('GitHub全球开发者数量达到了{n0}', 83000000)}</div>

          <div className="title">{t('格式化金额')}</div>
          <div>{t('售价{c0}', 123456.78)}</div>

          <div className="title">{t('格式化日期')}</div>
          <div>{t('今天的日期是{d0}', date)}</div>

          <div className="title">{t('格式化时间')}</div>
          <div>{t('当前时间：{t0}', time)}</div>

          <div className="title">{t('格式化复数')}</div>
          <div>{t('我有{p0个苹果}', 0)}</div>
          <div>{t('我有{p0个苹果}', 1)}</div>
          <div>{t('我有{p0个苹果}', 5)}</div>
        </>
      )}
      <div className={loading ? 'loading' : ''}>
        {loading && <span>loading...</span>}
      </div>
    </>
  )
}

render(
  <I18nProvider {...initI18nState}>
    <App />
  </I18nProvider>,
  document.getElementById('root') as HTMLElement,
)
