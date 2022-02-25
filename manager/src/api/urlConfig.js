var yfUrl = 'http://localhost:3000';
var prodUrl = 'http://121.4.84.219:3000';


var domain2ApiUrl = {
  dev: {
    baseurl: yfUrl,
  },
  yf: {
    baseurl: yfUrl
  },
  prod: {
    baseurl: prodUrl

  }
};

var urlConfig = domain2ApiUrl.prod;

console.log('Vue cli3 环境变量：', process.env)

if (process.env.VUE_APP_CURRENTMODE) {
  urlConfig = domain2ApiUrl[process.env.VUE_APP_CURRENTMODE] || urlConfig;
}



console.log(`请求绝对地址:`, urlConfig);


export default urlConfig;