const screenHeight = window.screen.availHeight;
window.signature = '';

$(() => {
  resizeHtmlFontSize();
  window.addEventListener('resize', resizeHtmlFontSize);
  initSignature();
});

function resizeHtmlFontSize() {
  let screenWidth = Math.min(window.innerWidth, 1000);
  let html = document.querySelector('html');
  let body = document.querySelector('body');
  if (screenWidth >= 1000) {
    html.style.fontSize = '100px';
    body.style.fontSize = '16px';
    globalIsMobile = false;
    body.setAttribute('class', '');
  } else {
    let fontSize = (screenWidth / 375 / 2) * 100;
    html.style.fontSize = fontSize + 'px';
    body.style.fontSize = 0.28 + 'rem';
    globalIsMobile = true;
    body.setAttribute('class', 'mobile');
  }
}

const getSignatureFunc = () => {
  return sessionStorage.getItem('signature') || window.signature;
};
const setSignatureFunc = ({ data }) => {
  window.signature = data;
  sessionStorage.setItem('signature', data);
};
const getAppFunc = () => window.app;
const goToLoginFunc = () => {};
const showErrorFunc = (msg) => {};

function initSignature() {
  Keenoho.request.createRequestInstance({
    baseURL: window.systemceHost,
    getSignatureFunc,
    setSignatureFunc,
    goToLoginFunc,
    getAppFunc,
    showErrorFunc,
  });
  Keenoho.signature.initSignature({ app: window.app, secretkey: window.secretkey, getSignatureFunc, setSignatureFunc });
}
