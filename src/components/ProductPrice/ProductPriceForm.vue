<template lang="pug">
  v-form.mb-2(v-show="toggleForm", ref="productPriceForm", @submit.prevent="onSubmit")
    v-card
      v-card-text
        v-layout(row, wrap)
          v-flex(x12)
            v-radio-group(
                row,
                v-model="action",
                v-validate="'required'",
                :error-messages="errors.collect('acción')",
                data-vv-name="acción",
                required
              )
              v-radio(label="Actualizar el precio actual", value="edit")
              v-radio(label="Disminuir o aumentar el precio", value="create")
          v-flex(xs12)
            v-text-field(
              label="Precio *",
              prepend-icon="fas fa-dollar-sign",
              type="number",
              v-model.number="price.product_price_amount",
              v-validate="'required'",
              :error-messages="errors.collect('precio')",
              data-vv-name="precio",
              required
            )
          v-flex(xs12)
            v-btn(flat, color="grey", @click.stop="onCancel") Cancelar
            v-btn(flat, color="info", type="submit" :loading="loading") Guardar
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    toggleForm: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    selectedPrice: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      price: {
        product_price_id: null,
        product_price_amount: null
      },
      action: ''
    }
  },
  watch: {
    dialog(newVal, oldVal) {
      if (!newVal) {
        this.onCancel()
      }
    },
    toggleForm(newVal, oldVal) {
      if (newVal) {
        this.price = { ...this.selectedPrice }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          this.price.action = this.action
          this.$emit('onSubmit', this.price)
          this.onCancel()
        }
      })
    },
    onCancel() {
      this.$emit('onToggleForm')
      this.$refs.productPriceForm.reset()
      this.$validator.reset()
    }
  }
}
</script>
