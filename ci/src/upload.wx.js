const ci = require('miniprogram-ci')
const path = require('path')

// let { version: version, description: description } = require('../mp-temp/package.json')

let version = '1.0.0'
let description = new Date() + '上传'

const project = new ci.Project({
  appid: 'wxb4ffd5da18ee13f7',
  type: 'miniProgram',
  projectPath: path.resolve('../../mp-temp/'),
  privateKeyPath: process.cwd() + '/private.wxb4ffd5da18ee13f7.key',
  ignores: ['node_modules/**/*'],
})
ci.upload({
  project,
  version,
  desc: description,
  setting: {
    es6: true,
  },
}).then(res => {
  console.log(res)
  console.log('上传成功')
}).catch(error => {
  if (error.errCode == -1) {
    console.log('上传成功')
  }
  console.log(error)
  console.log('上传失败')
  process.exit(-1)
})