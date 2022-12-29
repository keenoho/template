import Keenoho from '@keenoho/sdk';
import config from '@/config';
import { getSignatureFunc, setSignatureFunc, goToLoginFunc, getAppFunc, showErrorFunc } from '@/util';

let Request;

export function initRequest() {
  Request = Keenoho.request.createRequestInstance({
    baseURL: config.CONFIG_SYSTEMCE_HOST,
    getSignatureFunc,
    setSignatureFunc,
    goToLoginFunc,
    getAppFunc,
    showErrorFunc,
  });
}

export const Get = (options) => {
  if (!Request) {
    initRequest();
  }
  return Request.get({ ...options, method: 'GET', takeInnerData: true, showError: true });
};

export const Post = (options) => {
  if (!Request) {
    initRequest();
  }
  return Request.post({ ...options, method: 'POST', takeInnerData: true, showError: true });
};
