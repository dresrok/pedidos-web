import categoryService from '@/components/Category/services/CategoryService'

const category = {
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
    paginatedCategories: []
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
    getPaginatedCategories(state) {
      return state.paginatedCategories
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
    PAGINATE_CATEGORIES(state, payload) {
      state.paginatedCategories = payload.data
      state.pagination.page = payload.paginatorInfo.currentPage
      state.pagination.rowsPerPage = payload.paginatorInfo.perPage
      state.pagination.totalItems = payload.paginatorInfo.total
    },
    CREATE_CATEGORY(state, payload) {
      if (state.paginatedCategories.length < 10) {
        state.paginatedCategories.push(payload)
      }
      state.pagination.totalItems += 1
    },
    UPDATE_CATEGORY(state, payload) {
      const index = state.paginatedCategories.findIndex(
        item => item.category_id === payload.category_id
      )
      state.paginatedCategories.splice(index, 1, {
        category_id: payload.category_id,
        category_name: payload.category_name,
        category_image_name: payload.category_image_name,
        category_image_mini: payload.category_image_mini,
        category_image_medium: payload.category_image_medium
      })
    }
  },
  actions: {
    paginateCategories(context, payload) {
      return categoryService.paginateCategories(context, payload)
    },
    createCategory(context, payload) {
      return categoryService.createCategory(context, payload)
    },
    updateCategory(context, payload) {
      return categoryService.updateCategory(context, payload)
    }
  }
}

export default category
