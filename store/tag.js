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
  [types.REQUEST_TAGS] (state) {
    state.fetching = true
  },
  [types.GET_TAGS_FAILURE] (state) {
    state.fetching = false
    state.data = []
  },
  [types.GET_TAGS_SUCCESS] (state, action) {
    state.fetching = false
    state.data = action.tags
  }
}
