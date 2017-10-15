/**
 * Created by hasee on 2017/8/4.
 */
import * as types from './mutations'

export const state = () => {
  return {
    hotArticles: {
      fetching: false,
      data: []
    },
    articles: {
      fetching: false,
      data: [],
      currentPage: 0,
      totalPage: 0
    },
    articleDetail: {
      fetching: false,
      data: {},
      isSuccess: true // 成功获取文章
    }
  }
}

export const mutations = {
  [types.GET_ARTICLES] (state, action) {
    state.articles.data = action.data
    state.articles.currentPage = action.page
    state.articles.totalPage = action.totalPage
  },

  [types.CLEAR_ARTICLES] (state) {
    state.articles.data = []
    state.articles.totalPage = 0
    state.articles.currentPage = 0
  },

  [types.GET_HOT_ARTICLES] (state, action) {
    state.hotArticles.data = action
  },

  // 获取文章详情
  [types.GET_ARTICLE_DETAIL] (state, action) {
    state.articleDetail.data = action
    state.articleDetail.isSuccess = true
  },

  [types.ADD_ARTICLES] (state, action) {
    state.articles.data.push.apply(state.articles.data, action)
    state.articles.currentPage = action.page
    state.articles.totalPage = action.totalPage
  }
}
