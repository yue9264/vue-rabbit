//引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives'

import {componentPlugin} from '@/components'

const app = createApp(App)
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(componentPlugin)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')


