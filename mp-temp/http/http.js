const app = getApp()


// ajax请求封装
const reqAsync = (url, params, method) => {

  const p = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      dataType: 'json',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: params,
      success: function(res) {
        // console.log(res)
        if (res.data) {
          if (res.data.code) {
            switch (res.data.code) {
              case "0000":
                resolve(res);
                break;
              default:
                resolve(res);
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                });
                break;
            }
          } else {
            reject(res)
          }
        }
      },
      fail: function(err) {
        // wx.showToast({
        //   title: '服务器开小差啦，请稍后重试～',
        //   icon: 'none',
        //   duration: 1200
        // });
        reject(err)
      },
    })
  })
  return p;
}

module.exports = {
  reqAsync
}