/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */

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

const getCleanedWords = (text) => {
  // Ignoring certain characters
  let str = text.replace(/[↵\n\r\t!?#;*]/g, '');
  // considering few characters as space and eventually replaced by the same
  str = str.replace(/[+-.,{(\[\])}]/g, ' ');
  return str.toLowerCase().split(' ').filter((word) => (word && word.length > 1 && word[0] !== word[1] && word.search(/^[a-z]+$/g) === 0));
};

export {
  copyToClipboard,
  urlBase64ToUint8Array,
  getCleanedWords
};
