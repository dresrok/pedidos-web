<template lang="pug">
  v-flex(xs12)
    v-dialog(max-width="600px", :value="dialog", persistent)
      v-form(ref="categoryForm", @submit.prevent="onSubmit", enctype="multipart/form-data")
        v-card
          v-card-title.headline.grey.lighten-2 Crear categoría
          v-card-text
            v-container(grid-list-md)
              v-layout(row, wrap)
                v-flex(xs12)
                  v-text-field(
                    label="Nombre *",
                    prepend-icon="fas fa-pen",
                    v-model="category.category_name"
                    v-validate="'required|max:64'",
                    :counter="64"
                    :error-messages="errors.collect('nombre')"
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
    dialog: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    selectedCategory: {
      type: Object,
      required: false,
      default() {
        return {
          category_name: '',
          category_image: ''
        }
      }
    }
  },
  data() {
    return {
      category: { ...this.selectedCategory },
      image: ''
    }
  },
  methods: {
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
          payload.append('category_name', this.category.category_name)
          payload.append('category_image', this.image)
          await this.$emit('onSubmit', payload)
          await this.onClose()
        }
      })
    },
    onClose() {
      this.$emit('onClose')
      this.image = ''
      this.$refs.categoryForm.reset()
      this.$refs.categoryImage.value = ''
      this.$validator.reset()
    }
  }
}
</script>
