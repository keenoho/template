<template>
  <div class="page-home">
    <h1>欢迎来到 {{ appName }} 管理后台</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'page-home',
  computed: {
    ...mapGetters('system', ['config']),
    appName() {
      return this.config.CONFIG_APP_NAME || '';
    },
  },
};
</script>
<style lang="less" scoped>
.page-home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 500;
  }

  p {
    text-align: center;
    font-size: 14px;
    margin-top: 14px;
    color: #666;
  }
}
</style>
