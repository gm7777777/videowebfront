import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index.js'
import store from './store/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import './assets/css/style.css'

import axios from 'axios'
import VueAxios from "vue-axios";


// import { Editor, Toolbar } from '/wangeditor/editor-for-vue';
// import Vue from 'vue';
// import "swiper/swiper.min.css"
// import pdf from 'vue-pdf'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.use(Editor,Toolbar)
// app.use(pdf)
app.use(VueAxios, axios)

app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(vue3videoPlay)
// app.use(axios)
app.mount('#app')

