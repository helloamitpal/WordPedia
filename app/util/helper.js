const copyToClipboard = (element) => {
  if (document.selection) {
    const range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select().createTextRange();
  } else if (window.getSelection) {
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection().addRange(range);
  }

  document.execCommand('copy');
};

export { copyToClipboard };
