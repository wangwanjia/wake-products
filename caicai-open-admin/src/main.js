import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
//Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 全局变量
import { sxArr,codeArr } from './utils/result'

const pinia = createPinia();

import router from "./router";


// 设置全局变量
const app = createApp(App)
app.use(ElementPlus,{
  locale: zhCn
}).use(router).use(pinia).mount("#app");
