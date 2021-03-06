const ci = require('miniprogram-ci')
const path = require('path')
// let { wxVersion: version, wxDesc: desc } = require('../mp-temp/package.json').wx

;
(async () => {
  console.log(path.resolve('../../mp-temp/'))

  const project = new ci.Project({
    appid: 'wxb4ffd5da18ee13f7',
    type: 'miniProgram',
    // node ./src/preview.wx.js 使用下两行代码
    // privateKeyPath: process.cwd() + '/private.wxb4ffd5da18ee13f7.key',
    // projectPath: path.resolve('../../mp-temp/'),

    // 后台管理一键生成 体验小程序使用如下代码
    privateKeyPath: path.resolve('../ci/private.wxb4ffd5da18ee13f7.key'),
    projectPath: path.resolve('../mp-temp/'),

    ignores: ['node_modules/**/*'],
  })


  const previewResult = await ci.preview({
    project,
    desc: 'hello', // 此备注将显示在“小程序助手”开发版列表中
    setting: {
      // es6: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: './destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.log(previewResult)


})()