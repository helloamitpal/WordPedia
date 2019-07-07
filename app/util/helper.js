/* eslint-disable prefer-rest-params */
const debounce = (callback, delay) => {
  let timer;
  return function annoym() {
    const funcCall = () => callback.apply(this, arguments);
    clearTimeout(timer);
    timer = setTimeout(funcCall, delay);
  };
};

export { debounce };
