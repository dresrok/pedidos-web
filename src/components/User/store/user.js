import userService from '@/components/User/services/UserService'

const user = {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUserId(state) {
      return state.user ? state.user.user_id : ''
    },
    getUserFullName(state) {
      return state.user ? state.user.person.person_full_name : ''
    },
    getUserProfileName(state) {
      return state.user ? state.user.profile.profile_name : ''
    },
    getMenus(state) {
      return state.user ? state.user.profile.menus : []
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    DESTROY_USER(state) {
      state.user = null
    }
  },
  actions: {
    retrieveData(context) {
      return userService.retrieveData(context)
    }
  }
}

export default user
