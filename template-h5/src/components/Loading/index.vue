<template>
  <div :class="['plugin-loading', customClass]" v-if="show">
    <div :class="['mask', !mask ? 'nomask' : '']">
      <div class="container">
        <div class="icon">
          <template v-if="icon">
            <img :src="icon" />
          </template>
          <template v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="margin: auto; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto"
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                r="32"
                stroke-width="8"
                stroke="#fff"
                stroke-dasharray="50.26548245743669 50.26548245743669"
                fill="none"
                stroke-linecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="0 50 50;360 50 50"
                ></animateTransform>
              </circle>
            </svg>
          </template>
        </div>
        <div class="title" v-html="title"></div>
      </div>
    </div>
  </div>
</template>
<script>
export const defaultOptions = {
  title: '加载中...',
  show: false,
  duration: 0,
  fullscreen: true,
  customClass: '',
  icon: '',
  zIndex: 1000,
};

export default {
  name: 'plugin-loading',
  data() {
    return {
      ...defaultOptions,
      timer: null,
    };
  },
  methods: {
    handleSetValue(options) {
      const _options = Object.assign({}, defaultOptions, options || {});
      const {
        show = true,
        title = '加载中...',
        duration = 3000,
        fullscreen = true,
        customClass = '',
        icon = '',
        zIndex = 1000,
      } = _options;
      this.show = show;
      this.title = title;
      this.duration = duration;
      this.fullscreen = fullscreen;
      this.customClass = customClass;
      this.icon = icon;
      this.zIndex = zIndex;

      clearTimeout(this.timer);
      this.timer = null;

      this.$nextTick(() => {
        if (this.show && this.duration) {
          this.timer = setTimeout(() => {
            this.show = false;
            clearTimeout(this.timer);
            this.timer = null;
          }, this.duration);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.plugin-loading {
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.nomask {
      pointer-events: none;

      .container {
        pointer-events: visible;
      }
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 24px;
      border-radius: 8px;
      width: 200px;
      box-sizing: border-box;

      .icon {
        svg,img {
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
        }
      }

      .title {
        width: 100%;
        color: #fff;
        font-size: 28px;
        word-break: break-all;
        text-align: center;
        margin-top: 20px;
        line-height: 1.5;
      }
    }
  }
}
</style>
