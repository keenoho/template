import { createApp } from 'vue';
import Loading, { defaultOptions } from '@/components/Loading/index.vue';

export default {
  install: (app) => {
    const plugin = createApp(Loading);
    const instance = plugin.mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    function instanceFunc(options) {
      if (typeof options === 'string') {
        options = {
          title: options
        }
      }
      instance.handleSetValue({ ...defaultOptions, ...options, show: true });
    }
    instanceFunc.show = (options) => {
      if (typeof options === 'string') {
        options = {
          title: options
        }
      }
      instance.handleSetValue({ ...defaultOptions, ...options, show: true });
    };
    instanceFunc.close = (options) => {
      instance.handleSetValue({ ...defaultOptions, ...options, show: false });
    };
    app.config.globalProperties.$loading = instanceFunc;
  },
};
