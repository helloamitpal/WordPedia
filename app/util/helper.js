/* eslint-disable no-plusplus */

const copyToClipboard = (element) => {
  if ('select' in element) {
    element.select();
  } else {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand('copy');
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = String('=').repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export {
  copyToClipboard,
  urlBase64ToUint8Array
};
