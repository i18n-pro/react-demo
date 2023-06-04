import { Bold, Break, CodeBlock, H1, Image, List, render } from 'jsx-to-md'
import { initI18n } from 'i18n-pro'
import en from './i18n/en.json'

export default function MarkDown(props: any) {
  const { t } = initI18n({
    namespace: props.locale,
    locale: props.locale,
    langs: {
      en,
    },
  })

  return (
    <>
      <H1>{t('概述')}</H1>
      {t(
        '这是{0}库的在线应用示例，可通过如下两种在线编辑平台访问预览',
        ' `@i18n-pro/react` ',
      )}
      <List items={['U', 'CodeSandBox', 'StackBlitz']} />
    </>
  )
}
