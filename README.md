# Vue Chat client using websockets

> Written with [Vue.js](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/en/) and [Buefy](https://buefy.github.io)
 
> Use it with the server here: https://github.com/tobiasbeuving/node-websocket-chatserver 
 
## Features

* Connect supplying a username without a roundtrip, other connected users get notified
* Connection indicator
* User list
* Move avatar across the chatroom
* Send and receive messages
* Whisper mode (say something only one other user can hear)
* Change avatar by dropping an image < 200kb on your avatar
* Server side ping pong
* (custom) Client side ping pong
* Disconnect and notify other users

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
