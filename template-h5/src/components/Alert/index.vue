<template>
  <div :class="['plugin-alert']" v-if="list.length > 0">
    <div class="alert-list">
      <template v-for="item in list" :key="item.id">
        <div :class="['item', item.customClass]">
          <div class="container"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export const defaultOptions = {
  alert: '',
  show: false,
  duration: 2500,
  customClass: '',
  icon: '',
};

export default {
  name: 'plugin-alert',
  data() {
    return {
      list: [],
    };
  },
  methods: {
    handleAddAlert(options) {
      const _options = Object.assign({}, defaultOptions, options || {});
      this.list.push(_options);
    },
    handleRemoveAlert(id) {
      const index = this.list.findIndex((v) => v.id === id);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.plugin-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 999;
}
</style>
