<template>
  <div class="layout">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { immobilizationMenus, routesMenus } from '@/config/menu';

export default {
  name: 'layout',
  components: {},
  computed: {
    ...mapGetters('system', ['config']),
    ...mapGetters('user', ['info']),
    menus() {
      return [...routesMenus, ...immobilizationMenus];
    },
    appLogo() {
      return this.config?.CONFIG_APP_LOGO || '';
    },
    appName() {
      return this.config?.CONFIG_APP_NAME || '';
    },
    loginPath() {
      return this.config?.CONFIG_LOGIN_PATH || '';
    },
    userInfo() {
      return this.info || null;
    },
  },
  methods: {
    ...mapActions({
      setSession: 'user/setSession',
      setInfo: 'user/setInfo',
    }),
    handleCommand() {
      this.setSession(null);
      this.setInfo(null);
      this.$router.replace({
        path: this.loginPath,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.layout {
}
</style>
