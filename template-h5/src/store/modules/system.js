import config from '@/config';

export default {
  namespaced: true,
  state: () => ({
    config,
    signature: localStorage.getItem('signature') || '',
    app: config.CONFIG_APP_ID || '',
  }),
  mutations: {
    setConfig(state, payload) {
      state.config = Object.assign(state.config, payload);
    },
    setSignature(state, payload) {
      state.signature = payload;
      if (!payload) {
        localStorage.removeItem('signature')
      } else {
        localStorage.setItem('signature', payload);
      }
    },
    setApp(state, payload) {
      state.app = payload;
    },
  },
  actions: {
    setConfig(context, payload) {
      context.commit('setConfig', payload);
    },
    setSignature(context, payload) {
      context.commit('setSignature', payload);
    },
    setApp(context, payload) {
      context.commit('setApp', payload);
    },
  },
  getters: {
    config: (state) => {
      return state.config;
    },
    signature: (state) => {
      return state.signature;
    },
    app: (state) => {
      return state.app;
    },
  },
};
