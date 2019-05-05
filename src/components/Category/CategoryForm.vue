<template lang="pug">
  v-flex(xs12)
    v-btn(
      depressed,
      small,
      :class="dialogSettings.buttonClass",
      @click.stop="onShowDialog"
    ) {{ dialogSettings.buttonText }}
    v-dialog(max-width="600px", v-model="dialog", persistent)
      v-form(ref="categoryForm", @submit.prevent="onSubmit", enctype="multipart/form-data")
        v-card
          v-card-title.headline.grey.lighten-2 {{ dialogSettings.title }}
          v-card-text
            v-container(grid-list-md)
              v-layout(row, wrap)
                v-flex(v-if="category.category_image_name", xs12)
                  v-card(flat, tile, class="d-flex")
                    v-img(
                      height="auto",
                      width="100%",
                      max-height="200px",
                      :src="category.category_image_medium",
                      lazy-src="https://via.placeholder.com/300x200.png",
                      aspect-ratio="1"
                    )
                v-flex(xs12)
                  v-text-field(
                    label="Nombre *",
                    prepend-icon="fas fa-pen",
                    v-model="category.category_name",
                    v-validate="'required|max:64'",
                    :counter="64",
                    :error-messages="errors.collect('nombre')",
                    data-vv-name="nombre",
                    required
                  )
                v-flex(xs12)
                  v-text-field(
                    label="Imagen",
                    prepend-icon="fas fa-image",
                    v-model="category.category_image",
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
                    ref="categoryImage",
                    v-validate="'image|ext:jpeg,jpg,png|max_dimensions:1280,960|size:1000'",
                    data-vv-name="imagen",
                    @change="onFileChange"
                  )
          v-divider
          v-card-actions
            v-spacer
            v-btn(flat, color="grey", @click="onClose") Cerrar
            v-btn(flat, color="success", type="submit" :loading="loading") Guardar
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    selectedCategory: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false,
      dialogSettings: {
        buttonText: 'Crear',
        buttonClass: 'primary ml-0 mb-0',
        title: 'Crear categoría'
      },
      category: {
        category_name: '',
        category_image: ''
      },
      image: ''
    }
  },
  created() {
    if (this.selectedCategory.category_id) {
      this.dialogSettings.buttonText = 'Editar'
      this.dialogSettings.buttonClass = 'info'
      this.dialogSettings.title = 'Editar categoría'
    }
  },
  methods: {
    onShowDialog() {
      this.dialog = true
      if (this.selectedCategory.category_id) {
        this.category = JSON.parse(JSON.stringify(this.selectedCategory))
      }
    },
    onPickFile() {
      this.$refs.categoryImage.click()
    },
    onFileChange($event) {
      if ($event.target.files[0]) {
        this.image = $event.target.files[0]
        this.category.category_image = this.image.name
      } else {
        this.category.category_image = ''
      }
    },
    onSubmit() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          const payload = new FormData()
          payload.append('category_id', this.category.category_id)
          payload.append('category_name', this.category.category_name)
          payload.append('category_image', this.image)
          await this.$emit('onSubmit', payload)
          await this.onClose()
        }
      })
    },
    onClose() {
      this.dialog = false
      this.image = ''
      this.$refs.categoryImage.value = ''
      if (!this.category.category_id) {
        this.$refs.categoryForm.reset()
        this.$validator.reset()
      } else {
        this.category.category_image = ''
      }
    }
  }
}
</script>
