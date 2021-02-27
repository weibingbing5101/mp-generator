// components/swiper/swiper.js
import api from '../../http/api';

const app = getApp()

Component({
  /**
   * 组件的props属性列表
   */
  properties: {
    getCfgUrl: {
      type: String,
      value: '',
    },
    pageId: {
      type: Number,
      value: '',
    },
    floorsId: {
      type: Number,
      value: '',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    currItem: {
      current: 0
    },

    swipperList: [],
    indicatorDots: false,
    autoplay: true,
    vertical: false,
    circular: true, // 衔接滚动
    interval: 5000, // 自动切换时间
    duration: 500
  },
  lifetimes: {
    ready() {
      console.log(this.data.getCfgUrl)
      console.log(this.data.pageId)
      console.log(this.data.floorsId)
      // this.querySwipperList();
      this.getConfig();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {

    },
    swiperChange(e) {
      this.setData({
        currItem: e.detail
      })
    },
    // 获取 组件 配置数据
    getConfig() {
      api.getConfig(this.data.getCfgUrl, {
        pageId: this.data.pageId,
        floorsId: this.data.floorsId
      }, 'post').then(res => {
        if (res.data.data.attrCfg.length) {
          res.data.data.attrCfg.map((item) => {
            if (item.mpDataKey === 'querySwipperListApi') {
              this.querySwipperList(item.value)
            }
            if(item.mpDataKey === 'interval'){
              this.setData({
                interval: item.value
              })
            }
          })
        }
      })
    },
    //获取测评记录
    querySwipperList(url) {
      api.querySwipperList(url, {}, 'post').then(res => {
        if (res && res.data && res.data.data && res.data.data) {
          res.data.data.forEach((item) => {});
          this.setData({
            swipperList: res.data.data
          })
        } else {
          this.setData({
            swipperList: []
          })
        }
      })
    },

  }
});






























//