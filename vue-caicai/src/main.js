import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
//Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia();

import router from "./router";

createApp(App).use(ElementPlus).use(router).use(pinia).mount("#app");
