export default {
  namespaced: true,
  state: () => ({
    info: null,
  }),
  mutations: {
    setInfo(state, payload) {
      state.info = payload
    },
  },
  actions: {
    setInfo(context, payload) {
      context.commit('setInfo', payload);
    },
  },
  getters: {
    info: (state) => {
      return state.info;
    },
  },
};
