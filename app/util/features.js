class Features {
  static detect() {
    Object.assign(Features, {
      shareable: ('share' in navigator),
      isAppInstalled: ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone),
      online: true,
      isMobile: (window.innerWidth < 500),
      user: {
        language: {
          key: 'en',
          label: 'English'
        }
      }
    });
  }

  static set(key, val) {
    Features[key] = val;
  }
}

export default Features;
