import '@/style/normalize.less';
import '@/style/module.less';
import ElementPlus from 'element-plus';
import ElementPlusLocaleZhCn from 'element-plus/dist/locale/zh-cn';
import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import filter from '@/filter';
import App from './App.vue';
import { initData } from './init';

initData().then(() => {
  const app = createApp(App);
  app.use(filter);
  app.use(store);
  app.use(router);
  app.use(ElementPlus, {
    locale: ElementPlusLocaleZhCn,
  });
  app.mount('#root');
});
