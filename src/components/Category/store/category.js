import categoryService from '@/components/Category/services/CategoryService'

const user = {
  namespaced: true,
  state: {
    loading: false,
    categories: null
  },
  getters: {
    getLoading(state) {
      return state.loading
    }
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.loading = payload
    },
    SET_CATEGORY(state, payload) {
      state.user = payload
    }
  },
  actions: {
    createCategory(context, payload) {
      return categoryService.createCategory(context, payload)
    }
  }
}

export default user
