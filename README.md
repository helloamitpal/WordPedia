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

## Demo

- **UI**: https://wordpedia.herokuapp.com/
- **API Swagger documentation**: https://wordpedia.herokuapp.com/api-doc/

## Features

- **Social login**: It has Facebook login for the user registration
- **Online word search**: Word definition can be searched and bookmarked once after user register him/herself
- **Bookmarking words for future use**: Bookmarked word can be removed. Though an accidental delete operation can be reverted within 3 seconds
- **Learn and memorize word by playing Quiz**: Enabling quiz mode, the user will be prompted with a notification containing word from the bookmarked word list at every 3rd hour from 8AM through 6PM on every day
- **Rich user input**: It can take rich user input. E.g. image (By uploading image, providing image URL or taking photo from mobile camera), voice (Speech to text)
- **PWA**: It's a PWA (Progressive web-app which can allow user to create a icon in the mobile device for offline use)
- **Mobile Data friendly**: Service-worker has been used for efficient use of mobile data.
- **Social sharing**: Words can be copied, shared in the social medias
- **API documentation**: Swagger is available for API documentation
- **Multi lingual support**: It will support multiple languages (**TODO**)
- **Translation**: It will support multiple language translation (**TODO**)

## Tech-stack

It is a **MERN** (MongoDB-Express-React-NodeJS) stack development.

The primary tech-stack is as follows.

- _React.js_ - **React 16**✨, React Router 5
- _NODE.js_ - **Node 10.13.0**✨
- _Express.js_ - **Express 4.16.3**✨
- _MongoDB_ - **MongoDB Atlast**✨ (https://cloud.mongodb.com/user#/atlas/login)

The secondary tech-stack is as follows:

- _Redux_ - **Redux thunk** (Function based middleware https://www.npmjs.com/package/redux-thunk), **Redux persist** (Persistent redux store. https://www.npmjs.com/package/redux-persist) and **Redux pack** (Sensible promise handling. https://www.npmjs.com/package/redux-pack)
- _Babel_ - ES6, ESNext, React/Recommended config
- _Webpack_ - Webpack 4, UI Hot Reloading, Code Splitting, Optimized Prod Build and more
- _NodeMon_ - NodeJS hot reloading (https://www.npmjs.com/package/nodemon)
- _ESlint_ - Code linting tool
- _SCSS_ - CSS pre-processor (https://www.dailysmarty.com/posts/what-is-scss)
- _Axios_ - API calls (https://www.npmjs.com/package/axios)
- _Node-Schedule_ - Scheduler implementation for sending timely notification (https://www.npmjs.com/package/node-schedule)
- _Mongoose_ - MongoDB Object modelling tool (https://www.npmjs.com/package/mongoose)
- _Datamuse Word API_ - Fetching Word definition (http://www.datamuse.com/api/)
- _Heroku_ - Creating Cloud platform to deploy the app (PAAS - Platform as a service : https://www.heroku.com)
- _Google analytics_ - Tracking the user actions (https://analytics.google.com/analytics/web/)
- _Web push_ - Implementing push notification (https://www.npmjs.com/package/web-push)
- _Tesseract_ - Fetching texts from Image (https://github.com/naptha/tesseract.js#tesseractjs)
- _SpeechSynthesis_ - Working with voice input (https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis)
- _Swagger_ - Adding API documentation (https://www.npmjs.com/package/swagger-ui-express)

## Contact
Feel free to contact me.
Developer: <a href="mailto:hellowordpedia@gmail.com">Amit Pal</a>

## Code base setup

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
5. Run `sudo npm install workbox-cli -g` if it is not present
6. Run `npm start` to see the example app at `http://localhost:7009` in DEV mode.
7. Run `npm start:production` to see the example app at `http://localhost:7009` in PROD mode.

## Disabling service worker for localhost development

1. Go to developer's toolbar
2. Application tab, select Service worker
3. Uncheck "Update on reload" and check "Bypass for network"
4. Clear cache and refresh browser

## Known bugs

A KanBan board has been maintained throughout this development. I'm still working on few open bugs which can be found here: https://github.com/amit040386/WordPedia/projects/1

## Future development plans

1. Multi lingual support as it currently supports only English.
2. Instant translation Feature
3. Searching word definition for multiple languages as it currently supports only English
4. Contextual word suggestion

## License

MIT license, Copyright (c) 2018 Amit Pal.
