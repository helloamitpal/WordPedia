import React from 'react';
import { toast } from 'react-toastify';
import Confirm from './Confirm';

const askConfirmation = (config) => {
  const { autoClose, draggable, closeOnClick, closeButton, className } = config || {};
  const baseConfig = {
    autoClose: autoClose || false,
    draggable: draggable || false,
    hideProgressBar: true,
    closeOnClick: closeOnClick || false,
    position: 'bottom-center',
    closeButton: closeButton || false,
    className: `confirm-toast-container ${className}`,
    toastId: 'confirm'
  };

  const onCloseConfirm = (promiseCallback, val) => {
    toast.dismiss('confirm');
    promiseCallback(val);
  };

  return new Promise((resolve, reject) => {
    if (!toast.isActive('confirm')) {
      toast(<Confirm onAccept={() => onCloseConfirm(resolve, true)} onDecline={() => onCloseConfirm(reject, false)} />, baseConfig);
    }
  });
};

export {
  askConfirmation
};
