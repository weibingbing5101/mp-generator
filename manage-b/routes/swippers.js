var express = require('express');
var router = express.Router();


router.post('/querySwipperList_index_2', function(req, res, next) {
  res.send({
    "code": "0000",
    "msg": "成功",
    "data": [
      { "bannerTitle": "测试健康自评", "bannerSubTitle": null, "bannerCover": "jfs/t1/168576/6/2515/19195/60004318Ed72ba761/cbcaf8860c03490a.jpg", "bannerCoverDomain": "//img11.360buyimg.com/nb/", "bannerIndex": "01", "materialSort": 3, "bannerRefType": 1, "bannerRefValue": "https://prodev.m.jd.com/jdh/active/4D28RW5FmBVJm9gqYNVuXakzmvtv/index.html?showhead=no", "bannerRefParam": null, "tenantParam": { "tenantUnid": "500af9343f0148c6a9ac3dd03334c60b", "appUnid": "jd-health-scale" } },
      { "bannerTitle": "健康自评", "bannerSubTitle": null, "bannerCover": "jfs/t1/153463/6/14550/42201/600042f2Ef3d0ff3b/2062d653c6d35b51.png", "bannerCoverDomain": "//img11.360buyimg.com/nb/", "bannerIndex": "01", "materialSort": 2, "bannerRefType": 1, "bannerRefValue": "https://pro.m.jd.com/mall/active/ikPgnfmZXtBXKYHFMMXgRNBcTxb/index.html?showhead=no", "bannerRefParam": null, "tenantParam": { "tenantUnid": "500af9343f0148c6a9ac3dd03334c60b", "appUnid": "jd-health-scale" } },
      { "bannerTitle": "转发有礼", "bannerSubTitle": null, "bannerCover": "jfs/t1/167628/1/2393/127941/600042b6Ed6904cdc/bba1430ef00890d2.png", "bannerCoverDomain": "//img11.360buyimg.com/nb/", "bannerIndex": "01", "materialSort": 1, "bannerRefType": 1, "bannerRefValue": "https://pro.m.jd.com/mall/active/7qxSCYKbgV4Jwota8vQPGxuPMyc/index.html&showhead=no", "bannerRefParam": null, "tenantParam": { "tenantUnid": "500af9343f0148c6a9ac3dd03334c60b", "appUnid": "jd-health-scale" } }
    ]
  });
});


// 获取  首页  第一个  轮播图
// /swippers/querySwipperList_index_1
router.post('/querySwipperList_index_1', function(req, res, next) {
  res.send({
    "code": "0000",
    "msg": "成功",
    "data": [
      { "bannerTitle": "测试健康自评", "bannerSubTitle": null, "bannerCover": "jfs/t1/168576/6/2515/19195/60004318Ed72ba761/cbcaf8860c03490a.jpg", "bannerCoverDomain": "//img11.360buyimg.com/nb/", "bannerIndex": "01", "materialSort": 3, "bannerRefType": 1, "bannerRefValue": "https://prodev.m.jd.com/jdh/active/4D28RW5FmBVJm9gqYNVuXakzmvtv/index.html?showhead=no", "bannerRefParam": null, "tenantParam": { "tenantUnid": "500af9343f0148c6a9ac3dd03334c60b", "appUnid": "jd-health-scale" } },
      { "bannerTitle": "健康自评", "bannerSubTitle": null, "bannerCover": "jfs/t1/153463/6/14550/42201/600042f2Ef3d0ff3b/2062d653c6d35b51.png", "bannerCoverDomain": "//img11.360buyimg.com/nb/", "bannerIndex": "01", "materialSort": 2, "bannerRefType": 1, "bannerRefValue": "https://pro.m.jd.com/mall/active/ikPgnfmZXtBXKYHFMMXgRNBcTxb/index.html?showhead=no", "bannerRefParam": null, "tenantParam": { "tenantUnid": "500af9343f0148c6a9ac3dd03334c60b", "appUnid": "jd-health-scale" } },
      { "bannerTitle": "转发有礼", "bannerSubTitle": null, "bannerCover": "jfs/t1/167628/1/2393/127941/600042b6Ed6904cdc/bba1430ef00890d2.png", "bannerCoverDomain": "//img11.360buyimg.com/nb/", "bannerIndex": "01", "materialSort": 1, "bannerRefType": 1, "bannerRefValue": "https://pro.m.jd.com/mall/active/7qxSCYKbgV4Jwota8vQPGxuPMyc/index.html&showhead=no", "bannerRefParam": null, "tenantParam": { "tenantUnid": "500af9343f0148c6a9ac3dd03334c60b", "appUnid": "jd-health-scale" } }
    ]
  });
});
module.exports = router;