/**
 * Created by hasee on 2017/8/3.
 */
export const state = () => {
  return {
    fetching: false,
    data: []
  }
}

export const mutations = {
  REQUEST_TAGS (state) {
    state.fetching = true
  },
  GET_TAGS_FAILURE (state) {
    state.fetching = false
    state.data = []
  },
  GET_TAGS_SUCCESS (state, action) {
    state.fetching = false
    state.data = action.tags
  }
}
