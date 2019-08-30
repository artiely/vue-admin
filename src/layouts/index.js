import App from './App.vue'
import loading from '../router/loading'
import { layout, mediaQuery, setFontSize } from './observable/layout'
import { anthNavTabs } from './observable/navTabs'
let Home = loading('layouts/layout/default.vue')
export { Home, App, layout, mediaQuery, setFontSize, anthNavTabs }
