const path = require('path')
const rootConfig = require('../i18nrc.js')

module.exports = {
  ...rootConfig,
  entry: path.join(__dirname, '../docs'),
  output: {
    path: path.join(__dirname, './i18n/'),
  },
  translator: 'googlex',
  googlexConfig: {
    from: 'zh-CN',
    to: ['en'],
    proxy: 'http://127.0.0.1:1087',
  },
}
