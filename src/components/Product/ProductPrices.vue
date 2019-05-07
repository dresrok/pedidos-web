<template lang="pug">
  v-dialog(max-width="600px", v-model="dialog", scrollable, persistent)
    v-tooltip(top, slot="activator")
      v-btn(
        depressed,
        slot="activator",
        :class="dialogSettings.buttonClass",
        @click.stop="onShowDialog"
      ) 
        v-icon(size="16", :class="dialogSettings.buttonIconClass") {{ dialogSettings.buttonIcon }}
        | {{ dialogSettings.buttonText }}
      span {{ dialogSettings.title }}
    v-card
      v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text {{ dialogSettings.title }}
      v-card-text
        product-price-form(
          :dialog="dialog"
          :toggleForm="toggleForm"
          :loading="loading",
          :selectedPrice="selectedPrice"
          @onToggleForm="handleToggleForm"
          @onSubmit="handleSubmit"
        )
        product-price-list(
          :selectedProduct="selectedProduct"
          @onSelectPrice="handleSelectPrice"
        )
      v-divider
      v-card-actions
        v-spacer
        v-btn(flat, color="grey", @click.stop="onClose") Cerrar
</template>

<script>
import ProductPriceForm from '@/components/ProductPrice/ProductPriceForm'
import ProductPriceList from '@/components/ProductPrice/ProductPriceList'

import { mapGetters } from 'vuex'

export default {
  components: {
    ProductPriceForm,
    ProductPriceList
  },
  props: {
    selectedProduct: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      dialog: false,
      dialogSettings: {
        buttonIcon: 'fas fa-dollar-sign',
        buttonIconClass: '',
        buttonText: '',
        buttonClass: 'info v-btn--floating v-btn--small',
        title: 'Listado de precios'
      },
      toggleForm: false,
      selectedPrice: {}
    }
  },
  computed: {
    ...mapGetters({
      loading: 'product/price/getLoading'
    })
  },
  methods: {
    onShowDialog() {
      this.dialog = true
    },
    handleSelectPrice(payload) {
      this.selectedPrice = payload
      this.toggleForm = true
    },
    handleToggleForm() {
      this.toggleForm = false
    },
    async handleSubmit(payload) {
      if (payload.action === 'create') {
        await this.$store.dispatch('product/price/createPrice', {
          payload
        })
      } else if (payload.action === 'edit') {
        await this.$store.dispatch('product/price/updatePrice', {
          payload
        })
      }
    },
    onClose() {
      this.dialog = false
    }
  }
}
</script>
