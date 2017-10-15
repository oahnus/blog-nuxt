/**
 * Created by hasee on 2017/8/20.
 */
import * as types from './mutations'

export const state = () => {
  return {
    hitokoto: {
      data: {}
    }
  }
}

export const mutations = {
  [types.GET_HITOKOTO] (state, action) {
    state.hitokoto.data = action
  }
}
