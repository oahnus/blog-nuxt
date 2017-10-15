/**
 * Created by hasee on 2017/8/3.
 */
import * as types from './mutations'

export const state = () => {
  return {
    fetching: false,
    data: []
  }
}

export const mutations = {
  [types.GET_TAGS] (state, action) {
    state.data = action
  }
}
