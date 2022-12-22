import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import Maska from 'maska'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import VueExcelXlsx from "vue-excel-xlsx";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const app = createApp(App)
// .use(Maska)
.use(ElementPlus)
// .use(VueExcelXlsx)
// .use(VueCookies, { expire: '6h'})
.use(store)
.use(router)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('QuillEditor', QuillEditor)

app.mount('#app')

