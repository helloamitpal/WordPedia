import React from 'react';
import { toast } from 'react-toastify';
import Confirm from './Confirm';

const askConfirmation = (config) => {
  let timer;
  const { autoClose, toastId, draggable, closeOnClick, closeButton, className, confirmText, buttonLabel } = config || {};
  const customToastId = toastId || 'confirm';
  const baseConfig = {
    autoClose: autoClose || false,
    draggable: draggable || false,
    hideProgressBar: true,
    closeOnClick: closeOnClick || false,
    position: 'bottom-center',
    closeButton: closeButton || false,
    className: `confirm-toast-container ${className || ''}`,
    toastId: customToastId
  };

  const onCloseConfirm = (promiseCallback, val) => {
    toast.dismiss(customToastId);
    if (timer) {
      clearTimeout(timer);
    }
    promiseCallback(val);
  };

  return new Promise((resolve, reject) => {
    if (!toast.isActive(customToastId)) {
      if (!autoClose) {
        toast(<Confirm confirmText={confirmText} onAccept={() => onCloseConfirm(resolve, true)} onDecline={() => onCloseConfirm(reject, false)} />, baseConfig);
      } else {
        toast(<Confirm confirmText={confirmText} buttonLabel={buttonLabel} onAccept={() => onCloseConfirm(resolve, true)} />, baseConfig);
        timer = setTimeout(() => {
          onCloseConfirm(reject, false);
        }, autoClose);
      }
    }
  });
};

export {
  askConfirmation
};
