import productService from '@/components/Product/services/ProductService'

const product = {
  namespaced: true,
  state: {
    loading: false,
    pending: false,
    pagination: {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      sortBy: 'product_name',
      totalItems: 0,
      rowsPerPageItems: [10, 20, 50, 100]
    },
    paginatedProducts: []
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
    getPaginatedProducts(state) {
      return state.paginatedProducts
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
    PAGINATE_PRODUCTS(state, payload) {
      state.paginatedProducts = payload.data
      state.pagination.page = payload.paginatorInfo.currentPage
      state.pagination.rowsPerPage = payload.paginatorInfo.perPage
      state.pagination.totalItems = payload.paginatorInfo.total
    },
    CREATE_PRODUCT(state, payload) {
      if (state.paginatedProducts.length < 10) {
        state.paginatedProducts.push(payload)
      }
      state.pagination.totalItems += 1
    },
    UPDATE_PRODUCT(state, payload) {
      const index = state.paginatedProducts.findIndex(
        item => item.product_id === payload.product_id
      )
      state.paginatedProducts.splice(index, 1, {
        ...payload
      })
    }
  },
  actions: {
    paginateProducts(context, payload) {
      return productService.paginateProducts(context, payload)
    },
    createProduct(context, payload) {
      return productService.createProduct(context, payload)
    },
    updateProduct(context, payload) {
      return productService.updateProduct(context, payload)
    }
  }
}

export default product
