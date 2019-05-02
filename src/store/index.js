import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_URL, CDN_URL} from '@/util/api'
Vue.use(Vuex)

const API_ENDPOINT = API_URL

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
    return error.response
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
    globalNavigationDrawer: false,
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || '',
    tokenInfo: getTokenInfo(this.token) || {
      user_id: 0,
      salt: 0,
      expires: 0
    },
    user: {
      id: 0,
      username: 'No connection',
      first_name: 'No connection',
      second_name: 'No connection',
      third_name: 'No connection',
      group: null,
      year: 0,
      permission_level: 0
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
    token: state => state.token,
    tokenLifetime: state => state.tokenInfo.expires,
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.tokenInfo.user_id,
    user: state => state.user,
    avatarUrl: (state, getters) => getters.userAvatarUrl(getters.userId.toString()),
    userAvatarUrl: state => userId => CDN_URL + '/avatars/' + userId.toString() + '.jpg'
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
      await context.dispatch('UPDATE_USER_INFO')
    },
    REGISTER: async (context, payload) => {
      try {
        return await axios.post(API_ENDPOINT + '/user/', payload)
      } catch (error) {
        return error.response
      }
    },
    UPDATE_TOKEN: async (context) => {
      if (context.getters.isLoggedIn) {
        try {
          let result = await apiCall(context.getters.token, 'get', /auth/, {})
          if (result === undefined) {
            context.commit('LOGOUT')
          } else {
            context.commit('SET_TOKEN', result.data.token)
            await context.dispatch('UPDATE_USER_INFO')
          }
        } catch (error) {
          context.commit('LOGOUT')
        }
      }
    },
    LOGOUT: async (context) => {
      context.commit('LOGOUT')
    },
    GET_USER_INFO: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/user/' + payload.toString() + '/', {}).then()
    },
    GET_USERS: async (context) => {
      return apiCall(context.getters.token, 'get', '/user/', {}).then()
    },
    UPDATE_USER_INFO: async (context) => {
      let result = await context.dispatch('GET_USER_INFO', context.getters.userId)
      if (result.status === 200) {
        if (result.data.group != null) {
          let res = await context.dispatch('GET_GROUP', result.data.group)
          if (res.status === 200) {
            result.data.group = res.data
          } else {
            console.error(result)
          }
        }
        context.commit('UPDATE_USER_INFO', result.data)
      } else {
        console.error(result)
      }
    },
    GET_GROUP: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/group/' + payload.toString() + '/', {}).then()
    },
    ADD_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/work/', payload).then()
    },
    GET_WORKS: async (context) => {
      return apiCall(context.getters.token, 'get', '/work/', {}).then()
    },
    GET_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/work/' + payload.toString() + '/', {}).then()
    },
    DELETE_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'delete', '/work/' + payload.toString() + '/', {}).then()
    },
    ADD_ATTACHMENT: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/attachment/', payload).then()
    },
    CONNECT_ATTACHMENT_TO_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/attachment/' + payload.attachment_id.toString() + '/', { work_id: payload.work_id }).then()
    },
    GET_ATTACHMENTS: async (context) => {
      return apiCall(context.getters.token, 'get', '/attachment/', {}).then((result) => {
        for (let i = 0; i < result.data.attachments.length; i++) {
          if (!result.data.attachments[i].is_link) {
            result.data.attachments[i].link = CDN_URL + result.data.attachments[i].link
          }
        }
        return result
      }).then()
    },
    GET_ATTACHMENT: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/attachment/' + payload.toString() + '/', {}).then()
    },
    GET_ATTACHMENTS_BY_LIST: async (context, payload) => {
      let arr = []
      for (let x of payload) {
        apiCall(context.getters.token, 'get', '/attachment/' + x.toString() + '/', {}).then((result) => {
          if (!result.data.is_link) {
            result.data.link = CDN_URL + result.data.link
          }
          arr.push(result.data)
        })
      }
      return arr
    },
    DELETE_ATTACHMENT: async (context, payload) => {
      return apiCall(context.getters.token, 'delete', '/attachment/' + payload.toString() + '/', {}).then()
    },
    ADD_AVATAR: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/avatars/', payload).then()
    },
    DELETE_AVATAR: async (context) => {
      return apiCall(context.getters.token, 'delete', '/avatars/', {}).then()
    }
  }
})
