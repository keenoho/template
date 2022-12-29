<template>
  <div class="layout">
    <div class="head-bar">
      <router-link to="/" class="logo">
        <img :src="appLogo" v-if="appLogo" />
        <span>{{ appName }}</span>
      </router-link>
      <div class="user-wrapper">
        <div class="user" v-if="userInfo">
          <el-dropdown @command="handleCommand" placement="bottom-end">
            <span class="el-dropdown-link">
              <span class="username">{{ userInfo.name || '未命名用户' }}</span>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="user" v-else>
          <router-link :to="loginPath">未登录</router-link>
        </div>
      </div>
    </div>
    <div class="side-bar">
      <el-menu router>
        <template v-for="menu in menus" :key="menu.id">
          <el-sub-menu :index="menu.path" v-if="menu.children">
            <template #title>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item-group>
              <template v-for="subMenu in menu.children" :key="subMenu.id">
                <el-menu-item :index="menu.path + subMenu.path">
                  <span>{{ subMenu.name }}</span>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item :index="menu.path" v-else>
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { immobilizationMenus, routesMenus } from '@/config/menu';
import { ArrowDown } from '@element-plus/icons-vue';

export default {
  name: 'layout',
  components: {
    ArrowDown,
  },
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
  .head-bar {
    width: 100%;
    height: 60px;
    background: linear-gradient(120deg, #3150ed, #3150ed 30%, #682cdc 50%, #db38df 90%, #db38df);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    color: #fff;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    box-shadow: 0 -4px 14px 0 rgba(0, 0, 0, 0.2);

    .logo {
      font-weight: 500;
      display: flex;
      align-items: center;

      img {
        display: block;
        height: 40px;
        width: 40px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 10px;
        background-color: #fff;
      }

      span {
        color: #fff;
        font-size: 20px;
        font-weight: bold;
      }
    }

    .user-wrapper {
      display: flex;
      align-items: center;
    }

    .help {
      font-size: 14px;
      color: #fff;
      &:hover {
        text-decoration: underline;
      }
    }

    .user {
      margin-left: 20px;
      & > a {
        color: #fff;
      }
      .username {
        color: #fff;
        cursor: pointer;
      }
      i svg {
        color: #fff;
      }
    }
  }

  .side-bar {
    width: 200px;
    height: 100vh;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 5px 20px 0 rgb(13 5 9 / 5%);
    box-sizing: border-box;
    padding-top: 60px;
    z-index: 1;

    .el-menu {
      border: none;
    }
  }

  .main-content {
    background: #f2f7fb;
    min-height: calc(100vh - 60px);
    box-sizing: border-box;
    margin: 60px 0 0 200px;
    padding: 20px;
    position: relative;
  }
}
</style>
