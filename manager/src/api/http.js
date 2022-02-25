import axios from 'axios'
import qs from 'qs'

// axios.defaults.withCredentials = true; //配置为true  跨源请求不提供凭据(cookie、HTTP认证及客户端SSL证明等)。通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据 
axios.defaults.timeout = 30000 //响应时间


//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config => {
    return config
  },
  error => {
    console.log('错误的传参')
    return Promise.reject(error)
  }
)

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    console.log('网络异常')
    return Promise.reject(error)
  }
)

// post application json   设计范围： 乾哥做量表用到的  接口方法
export function fetchPostAppJson(url, params) {
  return new Promise((resolve, reject) => {

    axios.post(
        url,
        params, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          }
        }
      )
      .then(
        response => {
          // 原生xhr状态判断
          if (response.status === 200) {
            // 登陆超时 接口 或 本地session 判断  有任一有问题都弹窗重新登陆
            if (response.data.code === '0012') {
              window.$tool.logoutAlert();
            } else {
              resolve(response.data)
            }
          } else {
            reject(err) // 网络错误 500   400
          }
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}


//返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: param })
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}
//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  fetchPost,
  fetchGet,
  fetchPostAppJson,
}