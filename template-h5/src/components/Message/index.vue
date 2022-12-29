<template>
  <div :class="['plugin-message']" v-if="list.length > 0">
    <div class="message-list">
      <template v-for="item in list" :key="item.id">
        <div :class="['item', item.customClass]">
          <div class="container">
            <img :src="item.icon" v-if="item.icon" class="icon" />
            <span class="message">{{ item.message }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export const defaultOptions = {
  message: '',
  show: false,
  duration: 2500,
  customClass: '',
  icon: '',
};

export default {
  name: 'plugin-message',
  data() {
    return {
      list: [],
    };
  },
  methods: {
    handleAddMessage(options) {
      const _options = Object.assign({}, defaultOptions, options || {});
      this.list.push(_options);
      if (_options.duration > 0) {
        let timer = setTimeout(() => {
          clearTimeout(timer);
          this.handleRemoveMessage(_options.id);
        }, _options.duration);
      }
    },
    handleRemoveMessage(id) {
      const index = this.list.findIndex((v) => v.id === id);
      if (index > -1) {
        this.list.splice(index, 1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.plugin-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 999;

  .message-list {
    position: relative;
    padding-top: 24px;
    .item {
      display: flex;
      justify-content: center;
      align-content: center;

      & + .item {
        margin-top: 24px;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 12px;
        border-radius: 8px;
        width: 200px;
        box-sizing: border-box;
        max-width: 80%;

        .icon {
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
        }

        .message {
          color: #fff;
          font-size: 28px;
          word-break: break-all;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
