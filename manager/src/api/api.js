import http from './http.js';

import urlConfig from './urlConfig.js';

const baseurl = urlConfig.baseurl;

const api = {
  // 页面部分
  getPageList: function(params = {}) {
    return http.fetchPostAppJson(baseurl + '/pages/list', params);
  },
  addPage: function(params = {}) {
    return http.fetchPostAppJson(baseurl + '/pages/add', params);
  },

  editPage: function(params = {}) {
    return http.fetchPostAppJson(baseurl + '/pages/edit', params);
  },


  detailPage: function(params = {}) {
    return http.fetchPostAppJson(baseurl + '/pages/detail', params);
  },


  getFloorList: function(params = {}) {
    return http.fetchPostAppJson(baseurl + '/floors/list', params);
  },

  genMP: function(params = {}) {
    return http.fetchPostAppJson(baseurl + '/ci/genmp', params);
  },

  previewmp: function(params = {}) {
    return http.fetchPostAppJson(baseurl + '/ci/previewmp', params);
  },

};

export default api;