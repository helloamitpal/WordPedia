<h1>LearnNewWords</h1>

<br />

<div align="center">This is a learning app to improve the vocabulary.</div>

<br />

<div align="center">
  <sub>Created by <a href="https://www.linkedin.com/in/amit-pal-0241423a/">Amit Pal</a></sub>
</div>

## Features

It includes all the latest tools and practices in the industry.

- _React.js_ - **React 16**✨, React Router 5
- _Redux.js_ - Redux saga, Redux immutable and Reselect
- _Babel_ - ES6, ESNext, Airbnb and React/Recommended config
- _Webpack_ - **Webpack 4**✨, Hot Reloading, Code Splitting, Optimized Prod Build and more
- _Lint_ - ESlint
- _Styles_ - SCSS Styling

Here are a few highlights to look out for in this boilerplate

## Quick start

1. Clone this repo using `git clone https://github.com/amit040386/LearnNewWords`
2. Move to the appropriate directory: `cd LearnNewWords`.<br />
3. Run `yarn` or `npm install` to install dependencies.<br />
4. Run `npm start` to see the example app at `http://localhost:7009`.

## License

MIT license, Copyright (c) 2018 Amit Pal.

## Installing Cordova

You can make this as hybrid application. Cordova is the tool by which the same can be performed.

1. sudo npm install -g cordova
2. cordova create WordPedia com.wordpedia WordPedia (WordPedia = folder name, com.wordpedia = url kind of, optional, WordPedia = name of the application, optional)
3. cd WordPedia
4. cordova platform add android
5. cordova prepare
6. cordova build android --debug

If any error occurres regarding android and gradle installation then follow these steps:
- brew tap caskroom/cask
- brew cask install android-sdk
- export ANDROID_HOME=/Users/amitpal/Library/Android/sdk
- export ANDROID_SDK_ROOT=/Users/amitpal/Library/Android/sdk
- brew install gradle

Once done, please continue executing previous commands
7. cordova build android --debug
8. cordova run android --list (It will display you the list of available emulators e.g. Pixel_2)

If emulators are not installed then

9. cordova run android --target="Pixel_2"

<a href="https://www.fiznool.com/blog/2017/05/29/a-guide-to-installing-cordova-on-your-mac/">How to install Cordova guideline</a>
