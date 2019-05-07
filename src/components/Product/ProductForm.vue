<template lang="pug">
  v-dialog(max-width="600px", v-model="dialog", scrollable, persistent)
    v-tooltip(top, slot="activator")
      v-btn(
        depressed,
        slot="activator",
        color="info",
        :class="dialogSettings.buttonClass",
        @click.stop="onShowDialog"
      ) 
        v-icon(size="16", :class="dialogSettings.buttonIconClass") {{ dialogSettings.buttonIcon }}
        | {{ dialogSettings.buttonText }}
      span {{ dialogSettings.title }}
    v-form(ref="productForm", @submit.prevent="onSubmit", enctype="multipart/form-data")
      v-card
        v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text {{ dialogSettings.title }}
        v-card-text
          v-container(grid-list-md)
            v-layout(row, wrap)
              v-flex(v-if="product.product_image_name", xs12)
                v-card(flat, tile, class="d-flex")
                  v-img(
                    height="auto",
                    width="100%",
                    max-height="200px",
                    :src="product.product_image_medium",
                    lazy-src="https://via.placeholder.com/300x200.png",
                    aspect-ratio="1"
                  )
              v-flex(xs12)
                v-select(
                  label="Categoría *",
                  prepend-icon="fas fa-stream",
                  menu-props="offsetY",
                  :items="categoryList",
                  item-text="category_name",
                  item-value="category_id",
                  v-model="product.category.category_id",
                  v-validate="'required'",
                  :error-messages="errors.collect('categoría')",
                  data-vv-name="categoría",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Nombre *",
                  prepend-icon="fas fa-pen",
                  v-model="product.product_name",
                  v-validate="'required|max:64'",
                  :counter="64",
                  :error-messages="errors.collect('nombre')",
                  data-vv-name="nombre",
                  required
                )
              v-flex(xs12)
                v-textarea(
                  label="Descripción",
                  prepend-icon="fas fa-pen",
                  :rows="3",
                  v-model="product.product_description",
                  v-validate="'max:128'",
                  :counter="128",
                  :error-messages="errors.collect('descripción')",
                  data-vv-name="descripción",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Precio *",
                  prepend-icon="fas fa-dollar-sign",
                  type="number",
                  :readonly="readonly",
                  v-model.number="product.prices[0].product_price_amount",
                  v-validate="'required'",
                  :error-messages="errors.collect('precio')",
                  data-vv-name="precio",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Imagen",
                  prepend-icon="fas fa-image",
                  v-model="product.product_image",
                  persistent-hint,
                  hint="Archivos .jpeg, .jpg o .png",
                  :error-messages="errors.collect('imagen')",
                  @click="onPickFile"
                )
                input(
                  type="file",
                  accept="image/*",
                  :multiple="false",
                  style="display: none",
                  ref="productImage",
                  v-validate="'image|ext:jpeg,jpg,png|max_dimensions:1280,960|size:1000'",
                  data-vv-name="imagen",
                  @change="onFileChange"
                )
        v-divider
        v-card-actions
          v-spacer
          v-btn(flat, color="grey", @click="onClose") Cerrar
          v-btn(flat, color="info", type="submit" :loading="loading") Guardar
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    selectedProduct: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false,
      dialogSettings: {
        buttonIcon: 'fas fa-plus-circle',
        buttonIconClass: 'v-icon--left',
        buttonText: 'Crear',
        buttonClass: 'ml-1 mb-0',
        title: 'Crear producto'
      },
      product: {
        product_name: '',
        product_image: '',
        product_description: '',
        category: {
          category_id: null
        },
        prices: [{ product_price_amount: null }]
      },
      image: ''
    }
  },
  computed: {
    readonly() {
      if (this.product.product_id) {
        return true
      }
      return false
    },
    ...mapGetters({
      categoryList: 'category/getCategoryList'
    })
  },
  created() {
    if (this.selectedProduct.product_id) {
      this.dialogSettings.buttonIcon = 'fas fa-pen'
      this.dialogSettings.buttonIconClass = ''
      this.dialogSettings.buttonText = ''
      this.dialogSettings.buttonClass = 'v-btn--floating v-btn--small'
      this.dialogSettings.title = 'Editar producto'
    }
  },
  methods: {
    onShowDialog() {
      this.dialog = true
      if (this.selectedProduct.product_id) {
        this.product = JSON.parse(JSON.stringify(this.selectedProduct))
      }
    },
    onPickFile() {
      this.$refs.productImage.click()
    },
    onFileChange($event) {
      if ($event.target.files[0]) {
        this.image = $event.target.files[0]
        this.product.product_image = this.image.name
      } else {
        this.product.product_image = ''
      }
    },
    onSubmit() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          const payload = new FormData()
          payload.append('product_id', this.product.product_id)
          payload.append('product_name', this.product.product_name)
          payload.append(
            'product_description',
            this.product.product_description
          )
          payload.append(
            'product_price',
            this.product.prices[0].product_price_amount
          )
          payload.append('product_image', this.image)
          payload.append('category_id', this.product.category.category_id)
          await this.$emit('onSubmit', payload)
          await this.onClose()
        }
      })
    },
    onClose() {
      this.dialog = false
      this.image = ''
      this.$refs.productImage.value = ''
      if (!this.product.product_id) {
        this.$refs.productForm.reset()
        this.$validator.reset()
      } else {
        this.product.product_image = ''
      }
    }
  }
}
</script>
