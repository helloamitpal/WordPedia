import React from 'react';
import { toast } from 'react-toastify';
import Confirm from './Confirm';

const askConfirmation = (config) => {
  const { autoClose, toastId, draggable, closeOnClick, closeButton, className, content } = config || {};
  const customToastId = toastId || 'confirm';
  const baseConfig = {
    autoClose: autoClose || false,
    draggable: draggable || false,
    hideProgressBar: true,
    closeOnClick: closeOnClick || false,
    position: 'bottom-center',
    closeButton: closeButton || false,
    className: `confirm-toast-container ${className}`,
    toastId: customToastId
  };

  const onCloseConfirm = (promiseCallback, val) => {
    toast.dismiss(customToastId);
    promiseCallback(val);
  };

  if (!autoClose) {
    return new Promise((resolve, reject) => {
      if (!toast.isActive(customToastId)) {
        toast(<Confirm content={content} onAccept={() => onCloseConfirm(resolve, true)} onDecline={() => onCloseConfirm(reject, false)} />, baseConfig);
      }
    });
  }

  if (autoClose) {
    return !toast.isActive(customToastId) && toast(<Confirm content={content} />, baseConfig);
  }
};

export {
  askConfirmation
};
