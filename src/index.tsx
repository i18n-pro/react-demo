import React from 'react'
import { I18nProvider } from '@i18n-pro/react'
import { render } from 'react-dom'
import initI18nState from './i18n'
import './index.css'
import App from './App'

async function init() {
  const params = new URLSearchParams(
    new URLSearchParams(window.location.search.slice(1)),
  )
  const locale = params.get('locale') || 'en'

  const langs = initI18nState.langs || {}
  if (locale !== 'zh') {
    const lang = await (await fetch(`../i18n/${locale}.json`)).json()
    langs[locale] = lang
  }

  render(
    <I18nProvider {...initI18nState} locale={locale} langs={langs}>
      <App />
    </I18nProvider>,
    document.getElementById('root') as HTMLElement,
  )
}

init()
