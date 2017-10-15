/**
 * Created by hasee on 2017/8/3.
 */
import Api from '../plugins/Http'
import axios from 'axios'
import * as types from './mutations'

// let jsonBase = 'http://localhost:3000/json/'

export const actions = {
  // 全局服务初始化
  nuxtServerInit (store, { params, route, isServer, req }) {
    // 检查设备类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    store.commit(`option/${types.SET_MOBILE_LAYOUT}`, isMobile)
    store.commit(`option/${types.SET_USER_AGENT}`, userAgent)
    const initAppData = [
      // 配置数据
      // store.dispatch('loadAdminInfo'),
      // store.dispatch('loadGlobalOption'),
      // 内容数据
      // store.dispatch('loadTagList'),
      // store.dispatch('loadCategories')
      store.dispatch('loadTags'),
      store.dispatch('loadArchives'),
      store.dispatch('loadHotArticles')
      // store.dispatch('loadArticles', {page: 0, limit: store.state.option.articleNumPerPage})
    ]
    // 如果不是移动端的话，则请求热门文章
    // if (!isMobile) {
      // initAppData.push(store.dispatch('loadHotArticles'))
    // }
    // 首次服务端渲染时渲染评论数据
    // const isGuestbook = Object.is(route.name, 'guestbook')
    // const post_id = params.article_id || (isGuestbook ? 0 : false)
    // if (!Object.is(post_id, false)) {
    //   initAppData.push(store.dispatch('loadCommentsByPostId', { post_id }))
    // }
    return Promise.all(initAppData)
  },

  /**
   * resp.data data structure
   * {
   *   errcode: 0,
   *   data: {
   *     articles: [],
   *     totalPage: 2
   *   },
   *   msg: 'message'
   * }
   */

  async loadArticleDetail ({ commit }, params = {}) {
    let data = await Api.get({url: `/v1/articles/${params.articleId}`, content: null})
    commit(`article/${types.GET_ARTICLE_DETAIL}`, data)
  },

  async loadArticlesByKeyword ({ commit }, params = {}) {
    let page = await Api.get({url: '/v1/article/search', content: params})
    let isFirstPage = params.page === 0 || false
    let commitName = `article/${isFirstPage ? 'GET' : 'ADD'}_ARTICLES`
    commit(commitName, {data: page.content, page: params.page, totalPage: page.totalPages})
  },

  async loadArticlesByTag ({ commit }, params = {}) {
    let page = await Api.get({url: `/v1/articles/tag?tagId=${params.tagId}`, content: params, isForm: true})
    let isFirstPage = params.page === 0 || false
    let commitName = `article/${isFirstPage ? 'GET' : 'ADD'}_ARTICLES`
    commit(commitName, {data: page.content, page: params.page, totalPage: page.totalPages})
  },

  async loadArticlesByCategory ({ commit }, params = {}) {
    let page = await Api.get({url: `/v1/articles/category`, content: params, isForm: true})
    let isFirstPage = params.page === 0 || false
    let commitName = `article/${isFirstPage ? 'GET' : 'ADD'}_ARTICLES`
    commit(commitName, {data: page.content, page: params.page, totalPage: page.totalPages})
  },

  // TODO 归档
  async loadArticlesByArchive ({ commit }, params = {}) {
    let page = await Api.get({url: `/v1/articles/archive/${params.archive}`, content: params})
    commit(`article/${types.GET_ARTICLES}`, {data: page.content, page: params.page, totalPage: page.totalPages})
  },

  clearArticles ({ commit }) {
    commit(`article/${types.CLEAR_ARTICLES}`)
  },

  // 获取标签
  async loadTags ({ commit }, params = { per_page: 160 }) {
    let data = await Api.get({url: '/v1/tags', content: null})
    commit(`tag/${types.GET_TAGS}`, data)
  },

  async loadArticles ({ commit }, params = {page: 0, size: 5}) {
    let page = await Api.get({url: '/v1/articles', content: params})
    let isFirstPage = params.page === 0 || false
    let commitName = `article/${isFirstPage ? 'GET' : 'ADD'}_ARTICLES`
    commit(commitName, {data: page.content, page: params.page, totalPage: page.totalPages})
  },

  // 获取归档时间
  // TODO 归档
  async loadArchives ({ commit }) {
    let data = await Api.get({url: '/v1/articles/archive', content: null})
    commit(`archive/${types.GET_ARCHIVES}`, data)
  },

  // 获取热门文章
  async loadHotArticles ({ commit }) {
    // return axios.get(jsonBase + '/v1/article/hot.json').then(resp => {
    let data = await Api.get({url: '/v1/articles/hot', content: null})
    commit(`article/${types.GET_HOT_ARTICLES}`, data)
  },

  async loadGithubUser ({ commit }) {
    let resp = await axios.get('https://api.github.com/users/oahnus')
    commit(`github/${types.GET_USER}`, resp.data)
  },

  async loadGithubRepositories ({ commit }) {
    let resp = await axios.get('https://api.github.com/users/oahnus/repos')
    commit(`github/${types.GET_REPOSITORIES}`, resp.data)
  },

  async loadHitokoto ({ commit }) {
    let resp = await axios.get(`http://api.hitokoto.cn/?encode=json`)
    commit(`hitokoto/${types.GET_HITOKOTO}`, resp.data)
  }
  //
  // submitComment ({ commit }, form = {}) {
  //   return new Promise((resolve, reject) => {
  //     return Api.post('/v1/comment', form).then(resp => {
  //       const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
  //       if (success) {
  //         resolve(resp.data)
  //       } else {
  //         reject(resp.data.msg)
  //       }
  //     }, (error) => {
  //       reject(error)
  //     })
  //   })
  // },
  //
  // userLogin ({ commit }, user = {}) {
  //   commit(`auth/${types.REQUEST_AUTH}`)
  //   return new Promise((resolve, reject) => {
  //     return axios.post('http://localhost:10706/blog/v1/auth/login', user).then(resp => {
  //       console.log(resp)
  //       const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
  //       if (success) {
  //         commit(`auth/${types.USER_LOGIN_SUCCESS}`, resp.data)
  //         resolve()
  //       } else {
  //         commit(`auth/${types.USER_LOGIN_FAILURE}`)
  //         reject(resp.data.msg)
  //       }
  //     }, (error) => {
  //       commit(`auth/${types.USER_LOGIN_FAILURE}`)
  //       reject(error)
  //     })
  //   })
  // },
  //
  // loadUserFromStorage ({ commit }, params = {}) {
  //   let user = JSON.parse(window.localStorage.getItem('user'))
  //   let token = JSON.parse(window.localStorage.getItem('token'))
  //   console.log(token)
  //   console.log(user)
  //   if (!user && !token) {
  //     let time = new Date(window.localStorage.getItem('time'))
  //     if (new Date().getTime() - time.getTime() > 86400000) {
  //       commit(`auth/${types.USER_LOGIN_FAILURE}`)
  //     } else {
  //       commit(`auth/${types.USER_LOGIN_SUCCESS}`, {data: {user: user, token: token}})
  //     }
  //   }
  // },
  //
  // userLogout ({ commit }) {
  //   commit(`auth/${types.USER_LOGOUT}`)
  //   window.localStorage.clear()
  // },
  //
  // userRegister ({ commit }, user = {}) {
  //   commit(`auth/${types.REQUEST_AUTH}`)
  //   return Api.post('/v1/auth/register', {user}).then(resp => {
  //     const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
  //     if (success) commit(`user/${types.USER_LOGIN_SUCCESS}`, resp.data)
  //     else commit(`auth/${types.USER_LOGIN_FAILURE}`)
  //   }, () => {
  //     commit(`auth/${types.USER_LOGIN_FAILURE}`)
  //   })
  // }
}
