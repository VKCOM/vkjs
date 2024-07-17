function copyWithNavigator(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(() => true);
}

function copyWithFakeElement(text: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const textareaEl = document.createElement('textarea');
    const range = document.createRange();

    textareaEl.value = text;
    textareaEl.style.position = 'fixed'; // Avoid scrolling to bottom
    textareaEl.contentEditable = 'true';

    document.body.appendChild(textareaEl);

    textareaEl.focus();
    textareaEl.select();

    range.selectNodeContents(textareaEl);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    textareaEl.setSelectionRange(0, 999999);

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        resolve(true);
      } else {
        reject(new Error('copy failed'));
      }
    } catch (error) {
      reject(error);
    }

    if (selection) {
      selection.removeAllRanges();
    }

    document.body.removeChild(textareaEl);
  });
}

export function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    return copyWithNavigator(text).catch(() => copyWithFakeElement(text));
  } else {
    return copyWithFakeElement(text);
  }
}
