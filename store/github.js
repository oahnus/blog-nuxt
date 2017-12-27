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
  [types.GET_USER] (state, action) {
    state.fetching = false
    state.user = action
  },

  [types.GET_REPOSITORIES] (state, action) {
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
  }
}
