class Features {
  static detect() {
    Object.assign(Features.prototype, {
      sharable: ('share' in navigator),
      serviceWorker: ('serviceWorker' in navigator),
      isAppInstalled: (window.matchMedia('(display-mode: standalone)').matches),
      online: true
    });
  }

  static set(key, val) {
    Features.prototype[key] = val;
  }
}

export default Features;
