<h1>WordPedia</h1>

<div align="center">
  <img src="app/images/logos/WordPedia-512x512.png" />
</div>

<br />

<div align="center">This is a learning app to improve the vocabulary.</div>

<br />

<div align="center">
  <sub>Created by <a href="https://www.linkedin.com/in/amit-pal-0241423a/">Amit Pal</a></sub>
</div>

## Features

- Facebook login for registration
- Word definition can be searched and bookmarked once after user register him/herself
- Bookmarked word can be removed. Though an accidental delete operation can be reverted within 3 seconds
- Enabling quiz mode, the user will be prompted with a notification containing word from the bookmarked word list at every 3rd hour from 8AM through 6PM on every day
- Supporting multiple languages (**TODO**)
- Taking user input in the form of text along with image, voice (**TODO**)
- Understanding the text from voice and image input and translating them to the target language (**TODO**)
- Keeping the website as a mobile app in the device as it has been powered by PWA
- Interesting words can be copied, shared in the social networking

## Tech-stack

It includes all the latest tools and practices in the industry.

- _React.js_ - **React 16**✨, React Router 5
- _Redux.js_ - Redux thunk, Redux persist and Redux pack
- _Babel_ - ES6, ESNext, React/Recommended config
- _Webpack_ - **Webpack 4**✨, Hot Reloading, Code Splitting, Optimized Prod Build and more
- _Lint_ - ESlint
- _Styles_ - SCSS Styling
- _DB_ - MongoDB Atlas (https://cloud.mongodb.com/user#/atlas/login)
- _Word definition and translation_  - WordsAPI (https://rapidapi.com/wordsapi/api/wordsapi)
- _Cloud_ - AWS (Amazon web service : https://aws.amazon.com/)
- _Analytics_ - Google analytics (https://analytics.google.com/analytics/web/)
- _Push notification_ - Web push (https://www.npmjs.com/package/web-push)

Nodemon and Webpack hot reloading are added to serve the quick development

## Contact ##
hellowordpedia@gmail.com

## Quick start

1. Clone this repo using `git clone https://github.com/amit040386/WordPedia.git`
2. Move to the appropriate directory: `cd WordPedia`.<br />
3. Run `npm install` to install dependencies.<br />
4. Run `./node_modules/.bin/web-push generate-vapid-keys)` and keep public (WEB_PUSH_PUBLIC_VAPID_KEY) and private key (WEB_PUSH_PRIVATE_VAPID_KEY) in the below .env file
4. Create a .env file to the root folder and add these mapping to it. E.g.
    - DB_USERNAME=xyz
    - DB_PASSWORD=abc
    - DB_NAME=blabla
    - CLUSTER_NAME=pqr.mongodb.net
    - WEB_PUSH_PUBLIC_VAPID_KEY=abcdefg
    - WEB_PUSH_PRIVATE_VAPID_KEY=wert
5. Run `sudo npm install workbox-cli -g`
6. Run `npm start` to see the example app at `http://localhost:7009` in DEV mode.
7. Run `npm start:production` to see the example app at `http://localhost:7009` in PROD mode.

## Disabling service worker for localhost development ##

1. Go to developer's toolbar
2. Application tab, select Service worker
3. Uncheck "Update on reload" and check "Bypass for network"
4. Clear cache and refresh browser

## License

MIT license, Copyright (c) 2018 Amit Pal.
