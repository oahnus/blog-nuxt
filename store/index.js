/**
 * Created by hasee on 2017/8/3.
 */
import Api from '../plugins/axios'
import axios from 'axios'

// let jsonBase = 'http://localhost:3000/json/'

export const actions = {
  // 全局服务初始化
  nuxtServerInit (store, { params, route, isServer, req }) {
    // 检查设备类型
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const isMobile = /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
    store.commit('option/SET_MOBILE_LAYOUT', isMobile)
    store.commit('option/SET_USER_AGENT', userAgent)
    const initAppData = [
      // 配置数据
      // store.dispatch('loadAdminInfo'),
      // store.dispatch('loadGlobalOption'),
      // 内容数据
      // store.dispatch('loadTagList'),
      // store.dispatch('loadCategories')
      store.dispatch('loadTags'),
      store.dispatch('loadArchives'),
      store.dispatch('loadHotArticles'),
      store.dispatch('loadArticles', {page: 1, limit: store.state.option.articleNumPerPage})
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

  loadArticleDetail ({ commit }, params = {}) {
    commit('article/REQUEST_ARTICLE_DETAIL')
    // return axios.get(jsonBase + '/v1/article/' + params.articleId + '.json').then(resp => {
    return Api.get('/v1/article/' + params.articleId).then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) {
        commit('article/GET_ARTICLE_DETAIL_SUCCESS', resp.data.data)
      } else {
        commit('article/GET_ARTICLE_DETAIL_FAILURE')
      }
    }, error => {
      console.log('[ERROR]', error)
      commit('article/GET_ARTICLE_DETAIL_FAILURE', error)
    })
  },

  loadArticlesByKeyword ({ commit }, params = {}) {
    commit('article/REQUEST_ARTICLES')
    return Api.get('/v1/article/search', {params}).then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) {
        let isFirstPage = params.page && params.page === 1
        let commitName = 'article/' + (isFirstPage ? 'GET' : 'ADD') + '_ARTICLES_SUCCESS'
        commit(commitName, {data: resp.data.data.articles, page: params.page, totalPage: resp.data.data.totalPage})
      } else {
        commit('article/GET_ARTICLES_FAILURE')
      }
    }, error => {
      console.log('[ERROR]', error)
      commit('article/GET_ARTICLES_FAILURE', error)
    })
  },

  loadArticlesByParams ({ commit }, params = {}) {
    commit('article/REQUEST_ARTICLES')
    return Api.get('/v1/article', {params}).then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) {
        let isFirstPage = params.page && params.page === 1
        let commitName = 'article/' + (isFirstPage ? 'GET' : 'ADD') + '_ARTICLES_SUCCESS'
        commit(commitName, {data: resp.data.data.articles, page: params.page, totalPage: resp.data.data.totalPage})
      } else {
        commit('article/GET_ARTICLES_FAILURE')
      }
    }, error => {
      console.log('[ERROR]', error)
      commit('article/GET_ARTICLES_FAILURE', error)
    })
  },

  loadArticlesByArchive ({ commit }, params = {}) {
    commit('article/REQUEST_ARTICLES')
    // return axios.get(jsonBase + '/v1/article/archive/' + params.archive + '.json', {params}).then(resp => {
    return Api.get('/v1/article/archive/' + params.archive, {params}).then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) {
        commit('article/GET_ARTICLES_SUCCESS', {data: resp.data.data.articles, page: params.page, totalPage: resp.data.data.totalPage})
      } else {
        commit('article/GET_ARTICLES_FAILURE')
      }
    }, error => {
      console.log('[ERROR]', error)
      commit('article/GET_ARTICLES_FAILURE', error)
    })
  },

  clearArticles ({ commit }) {
    commit('article/CLEAR_ARTICLES')
  },

  // 获取标签
  loadTags ({ commit }, params = { per_page: 160 }) {
    commit('tag/REQUEST_TAGS')
    // return axios.get(jsonBase + '/v1/tag.json').then(resp => {
    return Api.get('/v1/tag').then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) commit('tag/GET_TAGS_SUCCESS', resp.data.data)
      if (!success) commit('tag/GET_TAGS_FAILURE')
    }, error => {
      console.log(error)
      commit('tag/GET_TAGS_FAILURE', error)
    })
  },

  loadArticles ({ commit }, params = {}) {
    commit('article/REQUEST_ARTICLES')
    // return axios.get(jsonBase + '/v1/articles.json').then(resp => {
    return Api.get('/v1/article', {params}).then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) {
        let isFirstPage = params.page && params.page === 1
        let commitName = 'article/' + (isFirstPage ? 'GET' : 'ADD') + '_ARTICLES_SUCCESS'
        commit(commitName, {data: resp.data.data.articles, page: params.page, totalPage: resp.data.data.totalPage})
      } else {
        commit('article/GET_ARTICLES_FAILURE')
      }
    }, error => {
      console.log('[ERROR]', error)
      commit('article/GET_ARTICLES_FAILURE', error)
    })
  },

  // 获取归档时间
  loadArchives ({ commit }) {
    commit('archive/REQUEST_ARCHIVES')
    // return axios.get(jsonBase + '/v1/article/archive.json').then(resp => {
    return Api.get('/v1/article/archive').then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) commit('archive/GET_ARCHIVES_SUCCESS', resp.data.data)
      else commit('archive/GET_ARCHIVES_FAILURE')
    }, error => {
      console.log(error)
      commit('archive/GET_ARCHIVES_FAILURE', error)
    })
  },

  // 获取热门文章
  loadHotArticles ({ commit }) {
    commit('article/REQUEST_HOT_ARTICLES')
    // return axios.get(jsonBase + '/v1/article/hot.json').then(resp => {
    return Api.get('/v1/article/hot').then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) commit('article/GET_HOT_ARTICLES_SUCCESS', resp.data.data)
      else commit('article/GET_HOT_ARTICLES_FAILURE')
    }, error => {
      console.log(error)
      commit('article/GET_HOT_ARTICLES_FAILURE', error)
    })
  },

  loadGithubUser ({ commit }) {
    commit('github/REQUEST_GITHUB_DATA')
    return axios.get('https://api.github.com/users/oahnus').then(resp => {
      commit('github/GET_USER_SUCCESS', resp.data)
    }, () => {
      commit('github/GET_USER_FAILURE')
    })
  },

  loadGithubRepositories ({ commit }) {
    commit('github/REQUEST_GITHUB_DATA')
    return axios.get('https://api.github.com/users/oahnus/repos').then(resp => {
      commit('github/GET_REPOSITORIES_SUCCESS', resp.data)
    }, () => {
      commit('github/GET_REPOSITORIES_FAILURE')
    })
  },

  userLogin ({ commit }, user = {}) {
    commit('auth/REQUEST_AUTH')
    return new Promise((resolve, reject) => {
      return Api.post('/v1/auth/login', user).then(resp => {
        const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
        if (success) {
          commit('auth/USER_LOGIN_SUCCESS', resp.data)
          resolve()
        } else {
          commit('auth/USER_LOGIN_FAILURE')
          reject(resp.data.msg)
        }
      }, (error) => {
        commit('auth/USER_LOGIN_FAILURE')
        reject(error)
      })
    })
  },

  loadUserFromStorage ({ commit }) {
    let user = JSON.parse(window.localStorage.getItem('user'))
    let token = JSON.parse(window.localStorage.getItem('token'))
    console.log(token)
    console.log(user)
    if (!user && !token) {
      let time = new Date(window.localStorage.getItem('time'))
      if (new Date().getTime() - time.getTime() > 86400000) {
        commit('auth/USER_LOGIN_FAILURE')
      } else {
        console.log('ccccc')
        commit('auth/USER_LOGIN_SUCCESS', {data: {user: user, token: token}})
      }
    }
  },

  userRegister ({ commit }, user = {}) {
    commit('auth/REQUEST_AUTH')
    return Api.post('/v1/auth/register', {user}).then(resp => {
      const success = !!resp.status && resp.data && Object.is(resp.data.errcode, 0)
      if (success) commit('user/USER_LOGIN_SUCCESS', resp.data)
      else commit('auth/USER_LOGIN_FAILURE')
    }, () => {
      commit('auth/USER_LOGIN_FAILURE')
    })
  }
}
