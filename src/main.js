//引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { getCategory } from './apis/testAPI'
getCategory().then(res => {
    console.log(res)
})

const app = createApp(App)

let foo

app.use(createPinia())
app.use(router)

app.mount('#app')
