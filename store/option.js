export const state = () => {
  return {
    articleNumPerPage: 5,
    mobileLayout: false,

    userAgent: ''
  }
}

export const getter = {
  mobileLayout: state => state.mobileLayout
}

export const mutations = {
  // 设置UA
  SET_USER_AGENT (state, action) {
    state.userAgent = action
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT (state, action) {
    state.mobileLayout = action
  },

  // 设置每页显示文章数
  SET_NUM_PER_PAGE (state, action) {
    state.articleNumPerPage = action
  }
}
