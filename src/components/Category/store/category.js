import categoryService from '@/components/Category/services/CategoryService'

const user = {
  namespaced: true,
  state: {
    loading: false,
    pending: false,
    pagination: {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      sortBy: 'category_name',
      totalItems: 0,
      rowsPerPageItems: [10, 20, 50, 100]
    },
    categories: []
  },
  getters: {
    getLoading(state) {
      return state.loading
    },
    getPending(state) {
      return state.pending
    },
    getPagination(state) {
      return state.pagination
    },
    getCategories(state) {
      return state.categories
    }
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.loading = payload
    },
    TOGGLE_PENDING(state, payload) {
      state.pending = payload
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload
    },
    RETRIEVE_DATA(state, payload) {
      state.categories = payload.data
      state.pagination.page = payload.paginatorInfo.currentPage
      state.pagination.rowsPerPage = payload.paginatorInfo.perPage
      state.pagination.totalItems = payload.paginatorInfo.total
    },
    CREATE_CATEGORY(state, payload) {
      if (state.pagination.totalItems <= 20) {
        state.categories.push(payload)
      }
      state.pagination.totalItems = state.categories.length
    },
    UPDATE_CATEGORY(state, payload) {
      const index = state.categories.findIndex(
        item => item.category_id === payload.category_id
      )
      state.categories.splice(index, 1, {
        category_id: payload.category_id,
        category_name: payload.category_name,
        category_image_name: payload.category_image_name,
        category_image_mini: payload.category_image_mini,
        category_image_medium: payload.category_image_medium
      })
    }
  },
  actions: {
    retrieveData(context, payload) {
      return categoryService.retrieveData(context, payload)
    },
    createCategory(context, payload) {
      return categoryService.createCategory(context, payload)
    },
    updateCategory(context, payload) {
      return categoryService.updateCategory(context, payload)
    }
  }
}

export default user
