import App from './App'
// #ifdef VUE3
import { createSSRApp } from 'vue'
//引用公用样式
import './Common-style/style.css' 
import './Common-style/popup.css' 

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
