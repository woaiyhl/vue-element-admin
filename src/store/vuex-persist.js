import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const state = {
  userInfo: {},
  accessToken: '',
  treeState: '',
  totalMenu: [],
  infoSearch: [],
  infoManage: [],
  noticeManage: []
}

const mutations = {
  setAccessToken(state, info) {
    state.accessToken = info
  },
  setUserInfo(state, info) {
    state.userInfo = info
  },
  setTotalMenu(state, info) {
    state.totalMenu = info
  },
  setInfoSearch(state, info) {
    let infoSearch
    for (let i = 0; i < info.length; i++) {
      if (info[i].url === '/infoSearch') {
        infoSearch = info[i].children
      }
    }
    state.infoSearch = infoSearch
  },
  setInfoManage(state, info) {
    let infoManage
    for (let i = 0; i < info.length; i++) {
      if (info[i].url === '/infoManage') {
        infoManage = info[i].children
      }
    }
    state.infoManage = infoManage
  }
}

const actions = {
  setAccessToken({ commit }, info) {
    commit('setAccessToken', info)
  },
  setUserInfo({ commit }, info) {
    commit('setUserInfo', info)
  },
  setTotalMenu({ commit }, info) {
    commit('setTotalMenu', info)
  },
  setInfoSearch({ commit }, info) {
    commit('setInfoSearch', info)
  },
  setInfoManage({ commit }, info) {
    commit('setInfoManage', info)
  }
}

const getters = {
  getAccessToken(state) {
    return state.accessToken
  },
  getUserInfo(state) {
    return state.userInfo
  }
}

// vuex-persist
const vuexLocal = new VuexPersistence({
  key: 'mng',
  storage: window.localStorage,
  reducer: (state) => ({
    userInfo: state.userInfo,
    accessToken: state.accessToken,
    totalMenu: state.totalMenu
  }),
  filter: (mutation) => (
    mutation.type === 'setUserInfo' || mutation.type === 'setAccessToken'
  )
})

const vuexSession = new VuexPersistence({
  key: 'mng',
  storage: window.sessionStorage,
  reducer: (state) => ({
    infoSearch: state.infoSearch,
    infoManage: state.infoManage
  }),
  filter: (mutation) => (
    mutation.type === 'setInfoSearch' || mutation.type === 'setInfoManage'
  )
})

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin, vuexSession.plugin]
})
