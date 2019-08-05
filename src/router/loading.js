import loadingError from './loadingError.vue'
const loading = (path, sync) => {
  if (!sync) {
    return () => {
      return import(`@/${path}`)
        .then(component => {
          return component
        })
        .catch((e) => {
          console.error('获取页面失败', e)
          return loadingError
          // window.location.reload()
        })
        .finally(() => {
          // ...
        })
    }
  } else {
    return require(`@/${path}`)
  }
}
export default loading
