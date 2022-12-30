import { createApp } from 'vue';
import Message, { defaultOptions } from '@/components/Message/index.vue';

export default {
  install: (app) => {
    const plugin = createApp(Message);
    const instance = plugin.mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    function instanceFunc(options) {
      const id = `${Date.now()}_${~~Math.random() * 9999}`;
      const obj = {
        close() {
          instance.handleRemoveMessage(id);
        },
      };
      if (typeof options === 'string') {
        options = {
          message: options
        }
      }
      instance.handleAddMessage({ ...defaultOptions, ...options, id });
      return obj;
    }
    app.config.globalProperties.$message = instanceFunc;
  },
};
