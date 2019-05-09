export function init(router, store) {
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some(record => record.meta.requiresAuth) &&
      !store.getters['auth/getIsAuthenticated']
    ) {
      next({
        name: 'home'
      })
    } else if (
      to.matched.some(record => record.meta.requiresVisitor) &&
      store.getters['auth/getIsAuthenticated']
    ) {
      next({
        name: 'mi-restaurante'
      })
    } else {
      next()
    }
  })
}
