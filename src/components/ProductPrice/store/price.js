import priceService from '@/components/ProductPrice/services/PriceService'

const price = {
  namespaced: true,
  state: {
    loading: false
  },
  getters: {
    getLoading(state) {
      return state.loading
    }
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    createPrice(context, payload) {
      return priceService.createPrice(context, payload)
    },
    updatePrice(context, payload) {
      return priceService.updatePrice(context, payload)
    },
    deletePrice(context, payload) {
      return priceService.deletePrice(context, payload)
    }
  }
}

export default price
