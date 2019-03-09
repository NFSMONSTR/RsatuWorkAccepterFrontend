import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const API_ENDPOINT = 'http://127.0.0.1:8000/api'

async function apiCall (token, method, url, data) {
  try {
    return await axios.request({
      headers: {
        'Authorization': 'Token ' + token
      },
      method: method,
      url: API_ENDPOINT + url,
      data: data
    })
  } catch (error) {
    return error
  }
}

function getTokenInfo (token) {
  if ((token === '') || (token === undefined)) return false
  let tokenInfo = atob(token.replace(/_/g, '/').replace(/-/g, '+'))
  tokenInfo = JSON.parse(tokenInfo.slice(0, tokenInfo.indexOf('}') + 1))
  tokenInfo['expires'] = Math.floor(tokenInfo.expires)
  return tokenInfo
}

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || '',
    tokenInfo: getTokenInfo(this.token) || {
      user_id: 0,
      salt: 0,
      expires: 0
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      state.tokenInfo = getTokenInfo(token)
      state.isLoggedIn = true
      localStorage.setItem('token', token)
    },
    UPDATE_USER_INFO: (state, payload) => {
      state.user = payload
    },
    LOGOUT: (state) => {
      state.token = ''
      state.tokenInfo = {}
      state.isLoggedIn = false
      localStorage.removeItem('token')
    }
  },
  getters: {
    token: (state) => {
      return state.token
    },
    tokenLifetime: (state) => {
      return state.tokenInfo.expires
    },
    isLoggedIn: (state) => {
      return state.isLoggedIn
    }
  },
  actions: {
    LOGIN: async (context, payload) => {
      let result = await axios.request({
        method: 'get',
        url: API_ENDPOINT + '/auth/',
        headers: {
          'Authorization': 'Basic ' + btoa(payload.username + ':' + payload.password)
        }
      })
      context.commit('SET_TOKEN', result.data.token)
    },
    REGISTER: async (context, payload) => {
      try {
        return await axios.post(API_ENDPOINT + '/user/', payload)
      } catch (error) {
        return error.data
      }
    },
    UPDATE_TOKEN: async (context) => {
      if (context.getters.isLoggedIn) {
        try {
          let result = await apiCall(context.getters.token, 'get', /auth/, {})
          context.commit('SET_TOKEN', result.data.token)
        } catch (error) {
          console.error(error)
          await context.dispatch('LOGOUT')
        }
      }
    },
    LOGOUT: async (context) => {
      context.commit('LOGOUT')
    },
    GET_USER_INFO: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/user/' + payload.toString() + '/', {}).then()
    }
    /*
    UPDATE_USER_INFO: async (context) => {
      let result = await context.dispatch('GET_USER_INFO', context.state.user.id)
      if (result.status === 200) {
        context.commit('UPDATE_USER_INFO', result.data)
      } else {
        console.error(result)
      }
    }
    */
  }
})
