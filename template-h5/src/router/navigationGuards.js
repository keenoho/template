import store from '@/store';

export async function beforeEach(to, from, next) {
  const session = store.state.system.signature;
  const user = store.state.user.info;

  if (to.meta.needAuth === false) {
    return next();
  }

  if (!session || !user) {
    return next({ path: store.state.system.config.CONFIG_LOGIN_PATH });
  }

  next();
}

export async function afterEach(to) {
  if (to?.meta?.title) {
    document.title = to.meta.title;
  }
}
