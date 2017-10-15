/**
 * Created by hasee on 2017/8/1.
 */
import axios from 'axios'
import Vue from 'vue'
import apiConfig from '../api.config'
import Notice from './Notice'
import qs from 'qs'

const Api = axios.create({
  baseURL: apiConfig.baseUrl
})
function defaultErrCbk (data) {
  Notice.error(data.message)
}

// Api.interceptors.request.use(
//   config => {
//     let token = localStorage.getItem('token')
//     let userId = localStorage.getItem('userId')
//     if (token !== undefined) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.common['TOKEN'] = token
//       config.headers.common['USER_ID'] = userId
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })

Api.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$http = Api

function handleAjax ({url, method, content, hasError = false, isForm = false}) {
  let _content = isForm ? qs.stringify(content) : content
  let headers
  if (!isForm) {
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  } else {
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  }

  return new Promise((resolve, reject) => {
    let _reject = hasError ? reject : defaultErrCbk
    if (method === 'get') {
      Api({
        method: method,
        url: url,
        params: content,
        headers: headers
      }).then((resp) => {
        console.log(resp.status)
        handleSuccess(resp, resolve)
      },
        (error) => {
          _reject(error)
        }
      )
    } else {
      Api({
        method: method,
        url: url,
        data: _content,
        headers: headers
      }).then((resp) => {
        console.log(resp.status)
        handleSuccess(resp, resolve)
      },
        (error) => {
          _reject(error)
        }
      )
    }
  })
}
function handleSuccess (resp, cb) {
  cb(resp.data)
}

export default {
  post ({url, content, hasError, isForm}) {
    let method = 'post'
    return handleAjax({url, method, content, hasError, isForm})
  },
  get ({url, content, hasError, isForm}) {
    let method = 'get'
    return handleAjax({url, method, content, hasError, isForm})
  },
  delete ({url, content, hasError, isForm}) {
    let method = 'delete'
    return handleAjax({url, method, content, hasError, isForm})
  },
  put ({url, content, hasError, isForm}) {
    let method = 'put'
    return handleAjax({url, method, content, hasError, isForm})
  }
}

// export default Api
