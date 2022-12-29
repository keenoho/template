import { createApp } from 'vue';
import Loading, { defaultOptions } from '@/components/Loading/index.vue';

export default {
  install: (app) => {
    const plugin = createApp(Loading);
    const instance = plugin.mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    function instanceFunc(options) {
      instance.handleSetValue({ ...defaultOptions, ...options, show: true });
    }
    instanceFunc.show = () => {};
    instanceFunc.close = () => {};
    app.config.globalProperties.$loading = instanceFunc;
  },
};
