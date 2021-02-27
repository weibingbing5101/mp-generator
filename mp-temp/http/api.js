import http from './http.js';
const app = getApp();

let baseUrl = app.globalData.baseUrl;
const api = {};


api.querySwipperList = function(url, params = {}, method = 'post') {
  return http.reqAsync(baseUrl + url, params, 'post')
}

api.getConfig = function(url, params = {}, method = 'post') {
  return http.reqAsync(baseUrl + url, params, 'post')
}
export default api;