class Features {
  static detect() {
    Object.assign(Features.prototype, {
      sharable: ('share' in navigator),
      isAppInstalled: ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone),
      online: true
    });
  }

  static set(key, val) {
    Features.prototype[key] = val;
  }
}

export default Features;
