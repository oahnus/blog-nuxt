/**
 * Created by hasee on 2017/8/4.
 */
import * as types from './mutations'

export const state = () => {
  return {
    fetching: false,
    data: []
  }
}

export const mutations = {
  [types.REQUEST_ARCHIVES] (state) {
    state.fetching = true
  },
  [types.GET_ARCHIVES_FAILURE] (state) {
    state.fetching = false
    state.data = []
  },
  [types.GET_ARCHIVES_SUCCESS] (state, action) {
    state.fetching = false
    state.data = action.archives
  }
}
