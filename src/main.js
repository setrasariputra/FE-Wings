import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/display.css";
import "./assets/bootstrap-5.3.0-alpha1-dist/css/bootstrap.min.css";
import axios from "axios";
import router from './router';
import './style.css'
import App from './App.vue'

axios.defaults.baseURL = "http://localhost:8000";

axios.defaults.baseFrontURL = "http://localhost:5173";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
app.use(router)
app.use(ElementPlus)
app.mount('#app')