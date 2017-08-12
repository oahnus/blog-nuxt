/**
 * Created by hasee on 2017/8/12.
 */
export const state = () => {
  return {
    fetching: false,
    data: {},
    user: {}
  }
}

export const mutations = {
  REQUEST_GITHUB_DATA (state) {
    state.fetching = true
  },

  GET_USER_SUCCESS (state, action) {
    state.fetching = false
    state.user = action
  },

  GET_USER_FAILURE (state) {
    state.fetching = false
    state.user = {}
  }

  // GET_TAGS_FAILURE (state) {
  //   state.fetching = false
  //   state.data = []
  // },
  // GET_TAGS_SUCCESS (state, action) {
  //   state.fetching = false
  //   state.data = action.tags
  // }
}
