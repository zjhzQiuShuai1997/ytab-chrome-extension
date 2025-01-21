import { createApp } from 'vue';
import '../style.css';
import App from './App.vue';
import store from '../store/index';

const app = createApp(App);
// svg 组件
import 'virtual:svg-icons-register' // 引入注册脚本
import SvgIcon from '@/components/svgIcon/index.vue' // 引入组件
app.component('SvgIcon', SvgIcon);

app.use(store).mount('#app');
