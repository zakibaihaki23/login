import axios from 'axios'
export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    authenticated(state) {
      return state.token
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      let response = await axios.post('v1/auth', credentials)

      return dispatch('attempt', response.data.data.token)
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }
      if (!state.token) {
        return
      }
    },
    signOut({ commit }) {
      return axios.post('auth/signIn').then(() => {
        commit('SET_TOKEN', null)
      })
    },
  },
}
