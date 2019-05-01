<template lang="pug">
  v-navigation-drawer.orange.lighten-2(app, :value="drawer", @input="onToggleDrawer")
    v-layout.white--text(column, align-center)
      v-flex.mt-4.text-lg-center
        //- v-avatar(size="64")
        //-   img(src="/avatar-1.png")
        .subheading.mt-1 {{ userFullName }}
        .caption.mt-1 {{ userProfileName }}
    v-list(dark)
      v-list-tile(
        v-for="menu in menus",
        :key="menu.menu_id",
        v-if="!menu.sub_menus.length",
        router ,
        :to="menu.menu_uri",
        active-class="v-list__tile--highlighted",
        :class="menu.menu_uri === $route.name ? 'v-list__tile--highlighted' : ''"
      )
        v-list-tile-action
          v-icon(size="20") {{ menu.menu_icon }}
        v-list-tile-content
          v-list-tile-title {{ menu.menu_name }}
      v-list-group(
        v-else
      )
        template(v-slot:activator)
          v-list-tile
            v-list-tile-action
              v-icon(size="20") {{ menu.menu_icon }}
            v-list-tile-content
              v-list-tile-title {{ menu.menu_name }}
        v-list-tile(
          v-for="subMenu in menu.sub_menus",
          :key="subMenu.menu_id",
          router ,
          :to="subMenu.menu_uri",
          active-class="v-list__tile--highlighted",
          :class="subMenu.menu_uri === $route.name ? 'v-list__tile--highlighted' : ''"
        )
          v-list-tile-action
            v-icon(size="20") {{ subMenu.menu_icon }}
          v-list-tile-content
            v-list-tile-title {{ subMenu.menu_name }}
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      required: true
    },
    userFullName: {
      type: String,
      required: true
    },
    userProfileName: {
      type: String,
      required: true
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onToggleDrawer(value) {
      this.$emit('onToggleDrawer', value)
    }
  }
}
</script>

<style lang="stylus">
.v-list__group
  .v-list__group__header__append-icon
    i
      font-size: 20px
</style>
