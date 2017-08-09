/**
 * Created by hasee on 2017/8/4.
 */
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
  // 文章列表 无参
  REQUEST_ARTICLES (state) {
    state.articles.fetching = true
  },

  GET_ARTICLES_SUCCESS (state, action) {
    state.articles.fetching = false
    state.articles.data = action.data
    state.articles.currentPage = action.page
    state.articles.totalPage = action.totalPage
  },

  GET_ARTICLES_FAILURE (state) {
    state.articles.fetching = false
  },

  CLEAR_ARTICLES (state) {
    state.articles.data = []
    state.articles.totalPage = 0
    state.articles.currentPage = 0
  },

  // 热门
  REQUEST_HOT_ARTICLES (state) {
    state.hotArticles.fetching = true
  },

  GET_HOT_ARTICLES_SUCCESS (state, action) {
    state.hotArticles.fetching = false
    state.hotArticles.data = action.articles
  },

  GET_HOT_ARTICLES_FAILURE (state) {
    state.hotArticles.fetching = false
  },

  // 添加文章
  ADD_ARTICLES_SUCCESS (state, action) {
    state.articles.fetching = false
    state.articles.data.push.apply(state.articles.data, action.data)
    state.articles.currentPage = action.page
    state.articles.totalPage = action.totalPage
  },

  REQUEST_ARTICLE_DETAIL (state) {
    state.articleDetail.fetching = true
    state.articleDetail.isSuccess = false
  },

  // 获取文章详情
  GET_ARTICLE_DETAIL_SUCCESS (state, action) {
    state.articleDetail.fetching = false
    state.articleDetail.data = action.article
    state.articleDetail.isSuccess = true
  },

  GET_ARTICLE_DETAIL_FAILURE (state) {
    state.articleDetail.fetching = false
    state.articleDetail.isSuccess = false
  }
}
