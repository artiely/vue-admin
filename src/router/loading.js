const loading = (path, sync) => {
  if (!sync) {
    return () => {
      return import(`@/${path}`)
        .then(component => {
          return component
        })
        .catch(() => {
          console.error('获取页面失败')
          window.location.reload()
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
