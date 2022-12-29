<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {};
  },
};
</script>
