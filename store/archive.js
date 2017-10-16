/**
 * Created by hasee on 2017/8/4.
 */
import * as types from './mutations'

export const state = () => {
  return {
    data: []
  }
}

export const mutations = {
  [types.GET_ARCHIVES] (state, action) {
    state.data = action
  }
}
