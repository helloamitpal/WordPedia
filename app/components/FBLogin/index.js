// export { default } from './FBLogin';

import FBLogin from './FBLogin';

const FBinit = () => {
  const FBScript = document.createElement('script');
  const FBRoot = document.createElement('div');
  FBScript.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v4.0&appId=627352254438819&autoLogAppEvents=1';
  FBScript.async = true;
  FBScript.defer = true;
  FBScript.crossorigin = 'anonymous';
  FBRoot.id = 'fb-root';

  document.body.appendChild(FBScript);
  document.body.appendChild(FBRoot);
};

export {
  FBLogin,
  FBinit
};
