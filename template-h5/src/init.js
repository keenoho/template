import Keenoho from '@keenoho/sdk';
import config from '@/config';
import { initRequest } from '@/util/request';
import { addFontSize, getSignatureFunc, setSignatureFunc, setUserInfo } from '@/util';

async function initSignature() {
  const { data } = await Keenoho.signature
    .initSignature({
      app: config.CONFIG_APP_ID,
      secretkey: config.CONFIG_APP_SECRET_KEY,
      getSignatureFunc,
      setSignatureFunc,
    })
    .catch(() => {});
  if (data && typeof data.data === 'string') {
    let userData;
    try {
      userData = JSON.parse(data.data);
    } catch (err) {}
    if (userData && userData.id) {
      await Keenoho.user
        .getUserInfo({
          id: userData.id,
        })
        .then((res) => {
          setUserInfo(res);
        })
        .catch();
    }
  }
}

export async function initData() {
  addFontSize();
  window.addEventListener('resize', addFontSize);
  initRequest();
  await initSignature().catch();
}
