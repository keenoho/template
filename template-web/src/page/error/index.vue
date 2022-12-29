<template>
  <div class="page-notfound">
    <el-empty :description="description"></el-empty>
    <router-link :to="config.CONFIG_HOME_PATH">
      <el-button round type="primary" size="large">返回首页</el-button>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'page-notfound',
  computed: {
    ...mapGetters('system', ['config']),
    description() {
      switch (this.$route.name) {
        case 'noPermission': {
          return '无权限访问';
        }
        case 'notFound': {
          return '页面不存在';
        }
        default: {
          return '页面不存在';
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.page-notfound {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
