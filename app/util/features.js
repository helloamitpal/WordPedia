class Features {
  static detect() {
    Object.assign(Features.prototype, {
      sharable: ('share' in navigator),
      serviceWorker: ('serviceWorker' in navigator)
    });
  }
}

export default Features;
