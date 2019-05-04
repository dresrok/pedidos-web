import store from '@/store'

const routeGuard = {}

routeGuard.beforeEnter = async (to, from, next) => {
  await store.dispatch('user/retrieveData')
  await store.dispatch('company/retrieveData', {
    userId: store.getters['user/getUserId']
  })
  next()
}

export default routeGuard
