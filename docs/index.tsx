import { H1, Image, Link, List } from 'jsx-to-md'
import { initI18n } from 'i18n-pro'
import en from './i18n/en.json'

const localeSuffixMap = {
  zh: 'zh-CN',
  en: '',
}

const repoName = 'i18n-pro/react-demo'

export default function MarkDown(props: { locale: 'en' | 'zh' }) {
  const { t } = initI18n({
    namespace: props.locale + '',
    locale: props.locale,
    langs: {
      en,
    },
  })

  const suffix = localeSuffixMap[props.locale]

  const filename = `README${suffix ? `_${suffix}` : ''}.md`

  return (
    <>
      <H1>{t('概述')}</H1>
      {t(
        '这是{0}库的在线应用示例，可通过如下两种在线编辑平台访问预览',
        ' `@i18n-pro/react` ',
      )}
      <List
        items={[
          'U',
          <Link
            href={`https://codesandbox.io/p/github/${repoName}/main?file=${filename}`}
          >
            Open in CodeSandbox
          </Link>,
          <Link
            href={`https://stackblitz.com/github/${repoName}?file=${filename}`}
          >
            <Image
              alt="Open in StackBlitz"
              title="Open in StackBlitz"
              src="https://developer.stackblitz.com/img/open_in_stackblitz_small.svg"
            />
          </Link>,
        ]}
      />
    </>
  )
}
