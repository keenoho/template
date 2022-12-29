<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script>
import ElementPlusLocaleZhCn from 'element-plus/dist/locale/zh-cn';
export default {
  name: 'app',
  data() {
    return {
      locale: ElementPlusLocaleZhCn,
    };
  },
};
</script>
