/**
 * Created by hasee on 2017/8/12.
 */

import * as types from './mutations'

export const state = () => {
  return {
    fetching: false,
    data: {},
    user: {},
    repositories: []
  }
}

export const mutations = {
  [types.REQUEST_GITHUB_DATA] (state) {
    state.fetching = true
  },

  [types.GET_USER_SUCCESS] (state, action) {
    state.fetching = false
    state.user = action
  },

  [types.GET_USER_FAILURE] (state) {
    state.fetching = false
    state.user = {}
  },

  [types.GET_REPOSITORIES_SUCCESS] (state, action) {
    state.fetching = false
    let repos = []
    for (let i = 0; i < action.length; i = i + 4) {
      let arr = []
      for (let j = 0; j < 4; j++) {
        if (action[i + j]) {
          arr.push(action[i + j])
        } else {
          break
        }
      }
      repos.push(arr)
    }
    state.repositories = repos
  },

  [types.GET_REPOSITORIES_FAILURE] (state) {
    state.fetching = false
    state.repositories = []
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
