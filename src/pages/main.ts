import { createApp } from 'vue';
import '../styles/style.css';
import ContextMenu from '@imengyu/vue3-context-menu';
import App from './App.vue';
import store from '../store/index';
import '../styles/main.css';

// 引入组件库 右键菜单
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';

import 'virtual:uno.css';
// svg 组件
import 'virtual:svg-icons-register'; // 引入注册脚本
import SvgIcon from '@/components/svgIcon/index.vue';

import clickOutside from '../directive/clickOutside';

const app = createApp(App); // 引入组件
app.component('SvgIcon', SvgIcon);
app.directive('click-outside', clickOutside);
app.use(ContextMenu);
app.use(store);
app.mount('#app');
