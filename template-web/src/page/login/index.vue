<template>
  <div class="page-login">
    <div class="wrapper">
      <div class="left">
        <img src="/image/login-left-head.png" />
      </div>
      <div class="right">
        <h1>登录</h1>
        <el-form>
          <el-form-item>
            <el-input placeholder="用户名" v-model="account" clearable size="large">
              <template #prefix>
                <Avatar style="width: 1em; height: 1em; margin-right: 8px" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码" type="password" v-model="password" clearable size="large">
              <template #prefix>
                <Lock style="width: 1em; height: 1em; margin-right: 8px" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleLogin" class="submit-button" type="primary" round size="large">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from 'md5';
import { Avatar, Lock } from '@element-plus/icons-vue';
import { mapGetters, mapActions } from 'vuex';
import { initData } from '@/init';
import Keenoho from '@keenoho/sdk';

export default {
  name: 'page-login',
  components: {
    Avatar,
    Lock,
  },
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
  .wrapper {
    width: 80%;
    max-width: 1000px;
    display: flex;

    .left,
    .right {
      width: 50%;
      flex-grow: 0;
    }

    .left {
      display: flex;
      align-items: center;
      flex-shrink: 0;

      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    .right {
      margin-left: 50px;
      h1 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .submit-button {
        width: 100%;
      }
    }
  }
}
</style>
