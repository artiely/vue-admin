import baseRoutes from '../router/baseRoutes'
let routes = []
export function abc (path) {
  const routerContext = require.context('@/router/modules', true, /\.js$/)
  routerContext.keys().forEach(route => {
    const routerModle = routerContext(route)
    routes = [
      ...routes,
      ...(routerModle.default || routerModle),
      ...baseRoutes
    ]
  })
  return routes
}
