import dayjs from 'dayjs';
import store from '@/store';
import router from '@/router';

// 格式化日期
export function formateDate(val, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!val) {
    return '';
  }
  return dayjs(val).format(fmt);
}

// route转menu
export function routesToMenus(routes) {
  const menus = [];
  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    if (r?.meta?.notInMenu) {
      continue;
    }
    const m = {
      id: r.name,
      name: r?.meta?.title || r.name,
      path: r.path.indexOf('/') < 0 ? `/${r.path}` : r.path,
    };
    if (r.children && r.children.length) {
      m.children = routesToMenus(r.children);
    }
    menus.push(m);
  }
  return menus;
}

// html body fontSize
export function addFontSize() {
  const screenWidth = Math.min(window.innerWidth, document.body.clientWidth, window.screen.availWidth);
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  if (screenWidth > 1000) {
    html.style.fontSize = '100px';
    body.style.fontSize = '14px';
  } else {
    const fontSize = (screenWidth / 750) * 100;
    html.style.fontSize = fontSize + 'px';
    body.style.fontSize = 0.28 + 'rem';
  }
}

// 获取签名
export function getSignatureFunc() {
  return store.state.system.signature;
}
// 设置签名
export function setSignatureFunc(val) {
  store.dispatch('system/setSignature', val?.data || val);
}
// 前往登录
export function goToLoginFunc() {
  store.dispatch('system/setSignature', null);
  router.replace({
    path: store.state.system.config.CONFIG_LOGIN_PATH,
  });
}
// 获取app
export function getAppFunc() {
  return store.state.system.app;
}
// 展示请求错误
export function showErrorFunc(msg) {
  window.alert(msg);
}
// 设置用户信息
export function setUserInfo(val) {
  store.dispatch('user/setInfo', val?.data || val);
}
