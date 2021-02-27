//app.js


var version = wx.getAccountInfoSync().miniProgram.envVersion || 'release'; // 低版本库降级解决方案

App({
  globalData: {
    baseUrl: ''
  },
  onLaunch: function() {
    console.log('当前环境', version);
    // 设置环境变量
    switch (version) {
      case 'develop':
        this.globalData.baseUrl = 'http://localhost:3000'
        break;

        // 体验
      case 'trial':
        this.globalData.baseUrl = 'http://localhost:3000'

        break;
      case 'release':
        this.globalData.baseUrl = 'http://localhost:3000'
        break;
    }
  },
  globalData: {},
  onShow: function(e) {

  }

})