import '@/style/normalize.less';
import '@/style/module.less';
import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import filter from '@/filter';
import installPlugins from './plugin';
import App from './App.vue';
import { initData } from './init';

initData().then(() => {
  const app = createApp(App);
  app.use(filter);
  installPlugins(app);
  app.use(store);
  app.use(router);
  app.mount('#root');
});
