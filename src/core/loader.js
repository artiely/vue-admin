import loadingError from '@/packages/exception/routeError.vue'
const loader = path => {
  return () => {
    return import(`@/${path}`)
      .then(component => {
        return component
      })
      .catch(e => {
        console.error('获取页面失败', e)
        return loadingError
      })
      .finally(() => {
        // ...
      })
  }
}
export default loader
