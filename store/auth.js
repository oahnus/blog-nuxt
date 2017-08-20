/**
 * Created by hasee on 2017/8/15.
 */
export const state = () => {
  return {
    auth: {
      fetching: false,
      user: {},
      token: '',
      isLogin: false
    }
  }
}

export const mutations = {
  // 文章列表 无参
  REQUEST_AUTH (state) {
    state.auth.fetching = true
  },

  USER_LOGIN_SUCCESS (state, action) {
    state.auth.fetching = false
    state.auth.user = action.data.user
    state.auth.token = action.data.token
    state.auth.isLogin = true
    window.localStorage.setItem('user', JSON.stringify(state.auth.user))
    window.localStorage.setItem('token', JSON.stringify(state.auth.token))
    window.localStorage.setItem('time', new Date().getTime())
  },

  USER_LOGIN_FAILURE (state) {
    state.auth.fetching = false
    state.auth.isLogin = false
  },

  USER_LOGOUT (state) {
    state.auth.fetching = false
    state.auth.isLogin = false
  }
}
