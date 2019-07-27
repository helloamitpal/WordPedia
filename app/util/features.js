class Features {
  static detect() {
    Object.assign(Features.prototype, {
      shareable: ('share' in navigator),
      isAppInstalled: ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone),
      online: true,
      isMobile: (window.innerWidth < 500)
    });
  }

  static set(key, val) {
    Features.prototype[key] = val;
  }
}

export default Features;
