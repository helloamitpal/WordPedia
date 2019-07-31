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

export { copyToClipboard };
