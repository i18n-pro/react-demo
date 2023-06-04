const path = require('path')
const rootConfig = require('../i18nrc.js')

module.exports = {
  ...rootConfig,
  entry: path.join(__dirname, '../docs'),
  output: {
    path: path.join(__dirname, './i18n/'),
  },
  translator: 'baidu',
  baiduConfig: {
    appid: '20220530001234107',
    key: '4DsAkNxFeKPg5wMLrrVG',
    from: 'zh',
    to: ['en'],
    delay: 1,
  },
}
