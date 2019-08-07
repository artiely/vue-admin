import loadingError from '@/views/exception/routeError.vue'
// const isProduction = process.env.NODE_ENV === "production";
const loading = (path) => {
  return () => {
    return import(`@/${path}`)
      .then(component => {
        return component
      })
      .catch(e => {
        console.error('获取页面失败', e)
        return loadingError
        // window.location.reload()
      })
      .finally(() => {
        // ...
      })
  }
}
export default loading
