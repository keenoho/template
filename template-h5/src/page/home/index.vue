<template>
  <div class="page-home">
    <h1>this is {{ appName }} homepage</h1>
    <router-link to="/demo/demo1">go to demo1</router-link>
    <router-link to="/404">go to 404</router-link>
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
