/**
 * Created by hasee on 2017/8/20.
 */
import * as types from './mutations'

export const state = () => {
  return {
    hitokoto: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {
  // 文章列表 无参
  [types.REQUEST_HITOKOTO] (state) {
    state.hitokoto.fetching = true
  },

  [types.REQUEST_HITOKOTO_SUCCESS] (state, action) {
    state.hitokoto.fetching = false
    state.hitokoto.data = action
  },

  [types.REQUEST_HITOKOTO_FAILURE] (state) {
    state.hitokoto.fetching = false
  }
}
