<template lang="pug">
  .not-found.my-4
    v-container(grid-list-md)
      v-layout.mb-3(row, wrap, justify-start)
        v-flex(xs12)
          h1.mb-2.display-2.grey--text.text--lighten-1 Ohoh!
        v-flex(xs12)
          h2.mb-2.headline Lo sentimos, pero no encontramos lo que buscabas.
          v-btn.ml-0(depressed, color="info", router, :to="{ name: 'mi-restaurante' }") Ir al inicio
</template>
