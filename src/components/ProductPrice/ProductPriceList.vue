<template lang="pug">
  v-flex(xs12)
    v-data-table(
      :headers="headers",
      :items="selectedProduct.prices",
      class="elevation-1"
    )
      template(slot="items", slot-scope="props")
        td {{ props.item.product_price_amount }}
        td {{ props.item.product_price_status }}
        td
          v-tooltip(v-if="props.item.product_price_status === 'Activo'", top)
            template(v-slot:activator="{ on }")
              v-btn(
                depressed,
                small,
                fab,
                color="info",
                v-on="on",
                @click="onSelectPrice(props.item)"
              ) 
                v-icon(size="16") fas fa-sync-alt
            span Gestionar precio
</template>

<script>
export default {
  props: {
    selectedProduct: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      headers: [
        { text: 'Precio', value: 'product_price_amount', sortable: false },
        { text: 'Estado', value: 'product_price_status', sortable: false },
        { text: 'Acciones', value: 'product_price_actions', sortable: false }
      ]
    }
  },
  methods: {
    onSelectPrice(payload) {
      this.$emit('onSelectPrice', payload)
    }
  }
}
</script>
