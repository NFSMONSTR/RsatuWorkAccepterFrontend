import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_URL, CDN_URL} from '@/util/api'
import jwt_decode from 'jwt-decode';
import permission_convert from "../util/permission_converter";
Vue.use(Vuex)

const API_ENDPOINT = API_URL

async function apiCall (token, method, url, data, params = {}) {
  try {
    return await axios.request({
      headers: {
        'Authorization': 'Bearer ' + token,
        'ngrok-skip-browser-warning': '1',
      },
      params: params,
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
  console.log(jwt_decode(token))
  return jwt_decode(token)
}

export default new Vuex.Store({
  state: {
    globalNavigationDrawer: false,
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || '',
    tokenInfo: getTokenInfo(this.token) || {
      user_id: 0,
      exp: 0
    },
    user: JSON.parse(localStorage.getItem('user')) || {
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
      state.user.permission_level = permission_convert(payload.role);
      localStorage.setItem('user', JSON.stringify(payload))
    },
    LOGOUT: (state) => {
      state.token = ''
      state.tokenInfo = {}
      state.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  getters: {
    token: state => state.token,
    tokenLifetime: state => state.tokenInfo.exp,
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.tokenInfo.user_id,
    user: state => state.user,
    avatarUrl: (state, getters) => getters.userAvatarUrl(getters.userId.toString()),
    userAvatarUrl: state => userId => CDN_URL + '/avatar/' + userId.toString() + '.png'
  },
  actions: {
    LOGIN: async (context, payload) => {
      let result = await axios.request({
        method: 'get',
        url: API_ENDPOINT + '/auth/',
        headers: {
          'Authorization': 'Basic ' + btoa(payload.username + ':' + payload.password),
          'ngrok-skip-browser-warning': '1',
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
    ADD_USER: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/user/', payload)
    },
    ADD_USERS: async (context, payload) => {
      let badUsers = []
      for (let i = 0; i < payload.length; i++) {
        let result = await context.dispatch('ADD_USER', payload[i])
        if (result.status !== 201 && result.status !== 200) {
          badUsers.push(payload[i].username)
        }
      }
      return {
        status: badUsers.length,
        data: badUsers
      }
    },
    GET_USER_INFO: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/user/' + payload.toString() + '/', {}).then()
    },
    GET_USERS: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/user/', {}, payload).then()
    },
    DELETE_USER: async (context, payload) => {
      return apiCall(context.getters.token, 'delete', '/user/' + payload.toString() + '/', {}).then()
    },
    UPDATE_USER_INFO: async (context) => {
      let result = await context.dispatch('GET_USER_INFO', context.getters.userId)
      if (result.status === 200) {
        // if (result.data.group != null) {
        //   let res = await context.dispatch('GET_GROUP', result.data.group)
        //   if (res.status === 200) {
        //     result.data.group = res.data
        //   } else {
        //     console.error(result)
        //   }
        // }
        context.commit('UPDATE_USER_INFO', result.data)
      } else {
        console.error(result)
      }
    },
    ADD_USER_TO_GROUP: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/user/'+payload.userId.toString()+'/group/'+payload.groupId.toString()+'/',{}).then()
    },
    ADD_GROUP: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/group/', payload).then()
    },
    GET_GROUP: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/group/' + payload.toString() + '/', {}).then()
    },
    GET_GROUPS: async (context) => {
      return apiCall(context.getters.token, 'get', '/group/', {}).then()
    },
    DELETE_GROUP: async (context, payload) => {
      return apiCall(context.getters.token, 'delete', '/group/'+ payload.toString() + '/', {}).then()
    },
    ADD_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/work/', payload).then()
    },
    GET_WORKS: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/work/', {}, payload).then()
    },
    GET_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/work/' + payload.toString() + '/', {}).then()
    },
    DELETE_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'delete', '/work/' + payload.toString() + '/', {}).then()
    },
    ADD_DONE_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/donework/', payload).then()
    },
    GET_DONE_WORKS: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/donework/', {}, payload).then()
    },
    GET_DONE_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'get', '/donework/'+payload.toString()+'/', {}).then()
    },
    ADD_ATTACHMENT: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/attachment/', payload).then()
    },
    CONNECT_ATTACHMENT_TO_WORK: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/attachment/connection/', payload).then()
    },
    CONNECT_ATTACHMENT: async (context, payload) => {
      return apiCall(context.getters.token, 'post', '/attachment/connection/', payload).then()
    },
    GET_ATTACHMENTS: async (context) => {
      return apiCall(context.getters.token, 'get', '/attachment/', {}).then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          if (!result.data[i].is_link) {
            result.data[i].link = CDN_URL + result.data[i].link
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
      console.log(payload)
      return apiCall(context.getters.token, 'post', '/avatar/', payload).then()
    },
    DELETE_AVATAR: async (context) => {
      return apiCall(context.getters.token, 'delete', '/avatar/', {}).then()
    }
  }
})
