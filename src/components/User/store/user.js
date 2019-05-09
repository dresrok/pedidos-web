import userService from '@/components/User/services/UserService'

const user = {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user ? state.user : ''
    },
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
    },
    SET_PERSON(state, payload) {
      state.user.person = payload
    }
  },
  actions: {
    retrieveData(context) {
      return userService.retrieveData(context)
    },
    updatePerson(context, payload) {
      return userService.updatePerson(context, payload)
    },
    changePassword(context, payload) {
      return userService.changePassword(context, payload)
    }
  }
}

export default user
