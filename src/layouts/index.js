import App from './App.vue'
import loader from '@core/loader'
import { layout, mediaQuery, setFontSize } from './observable/layout'
import { anthNavTabs } from './observable/navTabs'
let Home = loader('layouts/layout/default.vue')
export { Home, App, layout, mediaQuery, setFontSize, anthNavTabs }
