/**
 * Created by hasee on 2017/8/15.
 */
import * as types from './mutations'

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
  [types.REQUEST_AUTH] (state) {
    state.auth.fetching = true
  },

  [types.USER_LOGIN_SUCCESS] (state, action) {
    state.auth.fetching = false
    state.auth.user = action.data.user
    state.auth.token = action.data.token
    state.auth.isLogin = true
    window.localStorage.setItem('user', JSON.stringify(state.auth.user))
    window.localStorage.setItem('token', JSON.stringify(state.auth.token))
    window.localStorage.setItem('time', new Date().getTime())
  },

  [types.USER_LOGIN_FAILURE] (state) {
    state.auth.fetching = false
    state.auth.isLogin = false
  },

  [types.USER_LOGOUT] (state) {
    state.auth.fetching = false
    state.auth.isLogin = false
  }
}
