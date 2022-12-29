<template>
  <div class="page-login">
    <input placeholder="用户名" v-model="account" />
    <input placeholder="密码" type="password" v-model="password" />
    <button @click="handleLogin">登陆</button>
  </div>
</template>
<script>
import md5 from 'md5';
import { mapGetters, mapActions } from 'vuex';
import { initData } from '@/init';
import Keenoho from '@keenoho/sdk';

export default {
  name: 'page-login',
  components: {},
  computed: {
    ...mapGetters('system', ['config']),
    loginPath() {
      return this.config?.CONFIG_LOGIN_PATH;
    },
  },
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    ...mapActions({
      setSignature: 'system/setSignature',
      setInfo: 'user/setInfo',
    }),
    async handleLogin() {
      if (!this.account || !this.password) {
        return this.$message.error('请输入账号密码');
      }
      if (!this.config.signature) {
        await initData();
      }
      const res = await Keenoho.user
        .login({
          type: 'login.account',
          account: this.account,
          password: md5(this.password),
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
      if (!res) {
        return;
      }
      this.$message.success('登陆成功');
      this.setSignature(res.data.signature);
      this.setInfo(res.data.user);
      this.$router.push({ path: '/' });
    },
  },
};
</script>
<style lang="less" scoped>
.page-login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f7fb;
}
</style>
